"""
Functions to perform CRUD operations on the database
"""

from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from database.ordering.drivers import DriverOrder

from database.ordering.laptimes import LaptimeOrder, OrderDirection
from database.filters.laptimes import LaptimeFilter
from database.filters.drivers import DriverFilter
from database import models, schemas


#   #   #   #   #   #   #   #   Drivers  #   #   #   #   #   #   #   #


def get_driver_by_name(db: Session, name: str):
    """
    Get a driver by name
    Names are unique, so this will always return 1
    """
    return db.query(
        models.Driver
    ).filter(
        models.Driver.name == name
    ).first()


def get_driver_by_id(db: Session, id: int):
    """
    Get a driver by ID
    """
    return db.query(
        models.Driver
    ).filter(
        models.Driver.id == id
    ).first()


def get_drivers(
    db: Session,
    skip: int = 0,
    limit: int = -1,
    where: DriverFilter = None,
    order: DriverOrder = None,
) -> List[models.Driver]:
    """
    Get all drivers
    """
    query = db.query(models.Driver)

    # Add where clauses to the query
    if where:
        filters = where.to_sqlalchemy()
        for filter in filters:
            query = query.filter(filter)

    # Add order clauses to the query
    order = order or DriverOrder(id=OrderDirection.ASC)
    orders = order.to_sqlalchemy()
    for order in orders:
        query = query.order_by(order)

    # Return with requested limit and offset
    return query.offset(
        skip
    ).limit(
        limit
    ).all()


def create_driver(db: Session, driver: schemas.DriverCreate):
    """
    Create a new driver
    """
    db_driver = models.Driver(**driver.dict(), trackTime=0)
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)

    return db_driver


def update_driver(db: Session, driver: schemas.DriverUpdate):
    """
    Update a driver
    All fields except ID are optional
    """
    stored_driver = db.query(
        models.Driver
    ).filter(
        models.Driver.id == driver.id
    ).one_or_none()

    if stored_driver is None:
        return None

    # Update model from provided fields
    for var, value in vars(driver).items():
        setattr(stored_driver, var, value) if value else None

    db.add(stored_driver)
    db.commit()
    db.refresh(stored_driver)

    return stored_driver


def delete_driver(db: Session, driver: schemas.DriverDelete):
    """
    Delete a driver
    All fields except ID are optional
    """
    stored_driver = db.query(
        models.Driver
    ).filter(
        models.Driver.id == driver.id
    ).one_or_none()

    db.delete(stored_driver)
    db.commit()

    return stored_driver


def delete_driver_by_id(db: Session, driver_id: int):
    """
    Delete a driver by their ID
    """
    stored_driver = db.query(
        models.Driver
    ).filter(
        models.Driver.id == driver_id
    ).one_or_none()

    db.delete(stored_driver)
    db.commit()

    return stored_driver


def get_active_driver(db: Session) -> models.ActiveDriver:
    """
    Get the active driver
    """
    return db.query(models.ActiveDriver).first()


def set_active_driver(db: Session, driver: schemas.ActiveDriverCreate):
    """
    Set the active driver
    """
    db_driver = models.ActiveDriver(**driver.dict())
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)

    return db_driver


def delete_active_driver(db: Session):
    """
    Deactivate the currently active driver
    """
    stored_driver = db.query(models.ActiveDriver).one_or_none()
    db.query(models.ActiveDriver).delete()
    db.commit()

    return stored_driver


#   #   #   #   #   #   #   #   Lap Times  #   #   #   #   #   #   #   #


def get_laptimes(
    db: Session,
    skip: int = 0,
    limit: int = -1,
    where: LaptimeFilter = None,
    order: LaptimeOrder = None
) -> List[models.LapTime]:
    """
    Get all lap times - optionally with a limit, offset, filtered by given
    parameters and ordered (default: descending by set_at)
    """
    query = db.query(models.LapTime)

    # Add where clauses to the query
    if where:
        filters = where.to_sqlalchemy()
        for filter in filters:
            query = query.filter(filter)

    # Add order clauses to the query
    order = order or LaptimeOrder(set_at=OrderDirection.DESC)
    orders = order.to_sqlalchemy()
    for order in orders:
        query = query.order_by(order)

    # Return with requested limit and offset
    return query.offset(
        skip
    ).limit(
        limit
    ).all()


def create_laptime(db: Session, laptime: schemas.LapTimeCreate):
    """
    Set a new lap time
    This only commits if it is a new record for the given driver
    """
    db_laptime = models.LapTime(**laptime.dict())

    # Check for times with same driver, car, track and config
    better_time = db.query(
        models.LapTime
    ).filter(
        models.LapTime.driverId == laptime.driverId,
        models.LapTime.car == laptime.car,
        models.LapTime.trackName == laptime.trackName,
        models.LapTime.trackConfig == laptime.trackConfig,
        models.LapTime.time <= laptime.time
    ).one_or_none()

    worse_time = db.query(models.LapTime).filter(
        models.LapTime.driverId == laptime.driverId,
        models.LapTime.car == laptime.car,
        models.LapTime.trackName == laptime.trackName,
        models.LapTime.trackConfig == laptime.trackConfig,
        models.LapTime.time > laptime.time
    ).one_or_none()

    if not better_time:
        # Replace the old with the new
        if worse_time:
            db.delete(worse_time)
            db.expire(worse_time)

        db.add(db_laptime)
        db.commit()
        db.refresh(db_laptime)

        return db_laptime

    return better_time


#   #   #   #   #   #   #   #   Light Controllers  #   #   #   #   #   #   #   #


def get_light_controllers(db: Session, skip: int = 0, limit: int = -1):
    """
    Get all WLED light controllers
    """
    return db.query(
        models.LightController
    ).offset(skip).limit(limit).all()


def get_light_controller_by_name(db: Session, name: str):
    """
    Get a WLED light controller by name
    Names are unique, so this will always return 1 or 0
    """
    return db.query(
        models.LightController
    ).filter(
        models.LightController.name == name
    ).one_or_none()


def get_light_controller_by_ip(db: Session, ip: str):
    """
    Get a WLED light controller by IP
    IPs are unique, so this will always return 1 or 0
    """
    return db.query(
        models.LightController
    ).filter(
        models.LightController.ipAddress == ip
    ).one_or_none()


def create_light_controller(db: Session, controller: schemas.LightControllerCreate):
    """
    Create a new WLED light controller
    """
    db_controller = models.LightController(**controller.dict())
    db.add(db_controller)
    db.commit()
    db.refresh(db_controller)

    return db_controller


def update_light_controller(db: Session, controller: schemas.LightControllerUpdate):
    """
    Update a WLED light controller
    All fields except ID are optional
    """
    stored_controller = db.query(
        models.LightController
    ).filter(
        models.LightController.id == controller.id
    ).one_or_none()

    if stored_controller is None:
        return None

    # Update model from provided fields
    for var, value in vars(controller).items():
        setattr(stored_controller, var, value) if value else None

    db.add(stored_controller)
    db.commit()
    db.refresh(stored_controller)

    return stored_controller


def delete_light_controller(db: Session, controller: schemas.LightControllerDelete):
    """
    Delete a light controller
    All fields except ID are optional
    """
    stored_controller = db.query(
        models.LightController
    ).filter(
        models.LightController.id == controller.id
    ).one_or_none()

    db.delete(stored_controller)
    db.commit()

    return stored_controller


def get_controller_settings(db: Session, controller_id: int, driver_id: int):
    """
    Get a driver's settings for a light controller
    """
    return db.query(
        models.LightControllerSettings
    ).filter(
        models.LightControllerSettings.controllerId == controller_id,
        models.LightControllerSettings.driverId == driver_id
    ).one_or_none()


def create_controller_settings(
    db: Session,
    controller_settings: schemas.LightControllerSettingsCreate
):
    """
    Save a driver's settings for a light controller
    """
    db_controller_settings = models.LightControllerSettings(
        **controller_settings.dict()
    )

    db.add(db_controller_settings)
    db.commit()
    db.refresh(db_controller_settings)

    return db_controller_settings


def update_controller_settings(
    db: Session,
    controller_settings: schemas.LightControllerSettingsUpdate
):
    """
    Update a driver's settings for a light controller
    """
    stored_settings = db.query(
        models.LightControllerSettings
    ).filter(
        models.LightControllerSettings.id == controller_settings.id
    ).one_or_none()

    if stored_settings is None:
        return None

    # Update model from provided fields
    for var, value in vars(controller_settings).items():
        setattr(stored_settings, var, value) if value else None

    db.add(stored_settings)
    db.commit()
    db.refresh(stored_settings)

    return stored_settings


def delete_controller_settings(db: Session, settings: schemas.LightControllerSettingsDelete):
    """
    Delete a settings for a light controller, effectively resetting to default
    All fields except ID are optional
    """
    stored_settings = db.query(
        models.LightControllerSettings
    ).filter(
        models.LightControllerSettings.id == settings.id
        and models.LightControllerSettings.driverId == settings.driverId
    ).one_or_none()

    db.delete(stored_settings)
    db.commit()

    return stored_settings


#   #   #   #   #   #   #   #   Quotes  #   #   #   #   #   #   #   #


def get_quotes(db: Session, skip: int = 0, limit: int = -1):
    """
    Get all inspirational racing quotes
    """
    return db.query(models.Quote).offset(skip).limit(limit).all()


def get_random_quote(db: Session) -> models.Quote:
    """
    Get a random inspirational racing quote
    """
    return db.query(
        models.Quote
    ).order_by(
        func.random()
    ).limit(1).one()


def create_quote(db: Session, quote: schemas.QuoteCreate):
    """
    Create a new inspirational racing quote
    """
    db_quote = models.Quote(**quote.dict())
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)

    return db_quote


def batch_create_quote(db: Session, quotes):
    """
    Create new inspirational racing quotes from a list
    This is used upon first run to create the default quotes
    """
    for quote in quotes:
        db_quote = models.Quote(
            text=quote["text"],
            by=quote["by"]
        )
        db.add(db_quote)

    db.commit()

    return quotes


def update_quote(db: Session, quote: schemas.QuoteUpdate):
    """
    Update an inspirational racing quote
    All fields except ID are optional
    """
    stored_quote = db.query(
        models.Quote
    ).filter(
        models.Quote.id == quote.id
    ).one_or_none()

    if stored_quote is None:
        return None

    # Update model from provided fields
    for var, value in vars(quote).items():
        setattr(stored_quote, var, value) if value else None

    db.add(stored_quote)
    db.commit()
    db.refresh(stored_quote)

    return stored_quote


def delete_quote(db: Session, quote: schemas.QuoteDelete):
    """
    Delete an inspirational racing quote
    """
    stored_quote = db.query(
        models.Quote
    ).filter(
        models.Quote.id == quote.id
    ).one_or_none()

    if stored_quote:
        db.delete(stored_quote)
        db.commit()

    return stored_quote


def get_count(query):
    """
    Helper function to count the rows returned by a given query
    """
    count_query = query.statement.with_only_columns(
        [func.count()]
    ).order_by(None)

    count = query.session.execute(count_query).scalar()

    return count
