from sqlalchemy.orm import Session

from . import models, schemas


#   #   #   #   #   #   #   #   Drivers  #   #   #   #   #   #   #   # 

def get_driver_by_name(db: Session, name: str):
    return db.query(models.Driver).filter(models.Driver.name == name).first()


def get_driver_by_id(db: Session, id: int):
    return db.query(models.Driver).filter(models.Driver.id == id).first()


def get_drivers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Driver).offset(skip).limit(limit).all()


def create_driver(db: Session, driver: schemas.DriverCreate):
    db_driver = models.Driver(**driver.dict(), trackTime=0)
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)

    return db_driver


def update_driver(db: Session, driver: schemas.DriverUpdate):
    stored_driver = db.query(models.Driver).filter(models.Driver.id == driver.id).one_or_none()
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
    stored_driver = db.query(models.Driver).filter(models.Driver.id == driver.id).one_or_none()
    db.delete(stored_driver)
    db.commit()

    return stored_driver


def get_active_driver(db: Session):
    return db.query(models.ActiveDriver).first()


def set_active_driver(db: Session, driver: schemas.ActiveDriverCreate):
    db_driver = models.ActiveDriver(**driver.dict())
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)

    return db_driver

def delete_active_driver(db: Session):
    stored_driver = db.query(models.ActiveDriver).one_or_none()
    db.query(models.ActiveDriver).delete()
    db.commit()

    return stored_driver

#   #   #   #   #   #   #   #   Lap Times  #   #   #   #   #   #   #   # 

def get_laptimes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.LapTime).offset(skip).limit(limit).all()


def create_laptime(db: Session, laptime: schemas.LapTimeCreate):
    db_laptime = models.LapTime(**laptime.dict())

    # Check for times with same car, track and config
    better_time = db.query(models.LapTime).filter(
        models.LapTime.car == laptime.car, 
        models.LapTime.trackName == laptime.trackName, 
        models.LapTime.trackConfig == laptime.trackConfig, 
        models.LapTime.time <= laptime.time
    ).one_or_none()

    worse_time = db.query(models.LapTime).filter(
        models.LapTime.car == laptime.car, 
        models.LapTime.trackName == laptime.trackName, 
        models.LapTime.trackConfig == laptime.trackConfig, 
        models.LapTime.time > laptime.time
    ).one_or_none()

    if not better_time:
        # Replace the old with the new
        if worse_time:
            db.delete(worse_time)
        
        db.add(db_laptime)
        db.commit()
        db.refresh(db_laptime)

        return db_laptime

    return better_time

#   #   #   #   #   #   #   #   Light Controllers  #   #   #   #   #   #   #   # 

def get_light_controllers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.LightController).offset(skip).limit(limit).all()


def create_light_controller(db: Session, controller: schemas.LightControllerCreate):
    db_controller = models.LightController(**controller.dict())
    db.add(db_controller)
    db.commit()
    db.refresh(db_controller)

    return db_controller


def update_light_controller(db: Session, controller: schemas.LightControllerUpdate):
    stored_controller = db.query(models.LightController).filter(models.LightController.id == controller.id).one_or_none()
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
    stored_controller = db.query(models.LightController).filter(models.LightController.id == controller.id).one_or_none()
    db.delete(stored_controller)
    db.commit()

    return stored_controller
