from typing import Optional
import strawberry

from database.models import LapTime


@strawberry.input(
    description="""
    Order by lap time fields. Set fields to
    asc or desc to specify order.
    Default is desc.
    """,
    name="LaptimeOrder"
)
class LaptimeOrder:
    """
    Wrapper for orderable lap time fields. All fields are optional, and if
    multiple are provided, the result will be ordered by the first field, then
    the second, etc.
    """
    driver_name: Optional[str] = None
    driver_id: Optional[str] = None
    car: Optional[str] = None
    track_name: Optional[str] = None
    track_config: Optional[str] = None
    time: Optional[str] = None
    set_at: Optional[str] = None

    def __init__(
        self,
        driver_name: Optional[str] = None,
        driver_id: Optional[str] = None,
        car: Optional[str] = None,
        track_name: Optional[str] = None,
        track_config: Optional[str] = None,
        time: Optional[str] = None,
        set_at: Optional[str] = None,
    ):
        self.driver_name = driver_name
        self.driver_id = driver_id
        self.car = car
        self.track_name = track_name
        self.track_config = track_config
        self.time = time
        self.set_at = set_at

    def to_sqlalchemy(self):
        """
        Combine all orders into a list of SQLAlchemy orders
        """
        # Enums for ordering directions
        asc = ["ASC", "ASCENDING"]

        orders = []

        if self.driver_name is not None:
            orders.append(
                LapTime.driverName.asc()
                if self.driver_name.upper() in asc
                else LapTime.driverName.desc()
            )
        if self.driver_id is not None:
            orders.append(
                LapTime.driverId.asc()
                if self.driver_id.upper() in asc
                else LapTime.driverId.desc()
            )
        if self.car is not None:
            orders.append(
                LapTime.car.asc()
                if self.car.upper() in asc
                else LapTime.car.desc()
            )
        if self.track_name is not None:
            orders.append(
                LapTime.trackName.asc()
                if self.track_name.upper() in asc
                else LapTime.trackName.desc()
            )
        if self.track_config is not None:
            orders.append(
                LapTime.trackConfig.asc()
                if self.track_config.upper() in asc
                else LapTime.trackConfig.desc()
            )
        if self.time is not None:
            orders.append(
                LapTime.time.asc()
                if self.time.upper() in asc
                else LapTime.time.desc()
            )
        if self.set_at is not None:
            orders.append(
                LapTime.setAt.asc()
                if self.set_at.upper() in asc
                else LapTime.setAt.desc()
            )

        return orders
