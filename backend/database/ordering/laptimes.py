from typing import Optional
import strawberry

from database.ordering.generics import OrderDirection
from database.models import LapTime


@strawberry.input(
    description="Order by lap time fields. Set fields to ASC or DESC to specify order. \
    Default is DESC.",
    name="LaptimeOrder"
)
class LaptimeOrder:
    """
    Wrapper for orderable lap time fields. All fields are optional, and if
    multiple are provided, the result will be ordered by the first field, then
    the second, etc.
    """
    driver_name: Optional[OrderDirection] = strawberry.field(
        description="The driver's name",
    )
    driver_id: Optional[OrderDirection] = strawberry.field(
        description="The driver's ID",
    )
    car: Optional[OrderDirection] = strawberry.field(
        description="The car used for the lap",
    )
    track_name: Optional[OrderDirection] = strawberry.field(
        description="The track name",
    )
    track_config: Optional[OrderDirection] = strawberry.field(
        description="The track configuration",
    )
    time: Optional[OrderDirection] = strawberry.field(
        description="The lap time in seconds",
    )
    set_at: Optional[OrderDirection] = strawberry.field(
        description="The time the lap time was set at",
    )

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
        orders = []

        if self.driver_name is not None:
            orders.append(
                LapTime.driverName.asc()
                if self.driver_name.value == OrderDirection.ASC.value
                else LapTime.driverName.desc()
            )
        if self.driver_id is not None:
            orders.append(
                LapTime.driverId.asc()
                if self.driver_id.value == OrderDirection.ASC.value
                else LapTime.driverId.desc()
            )
        if self.car is not None:
            orders.append(
                LapTime.car.asc()
                if self.car.value == OrderDirection.ASC.value
                else LapTime.car.desc()
            )
        if self.track_name is not None:
            orders.append(
                LapTime.trackName.asc()
                if self.track_name.value == OrderDirection.ASC.value
                else LapTime.trackName.desc()
            )
        if self.track_config is not None:
            orders.append(
                LapTime.trackConfig.asc()
                if self.track_config.value == OrderDirection.ASC.value
                else LapTime.trackConfig.desc()
            )
        if self.time is not None:
            orders.append(
                LapTime.time.asc()
                if self.time.value == OrderDirection.ASC.value
                else LapTime.time.desc()
            )
        if self.set_at is not None:
            orders.append(
                LapTime.setAt.asc()
                if self.set_at.value == OrderDirection.ASC.value
                else LapTime.setAt.desc()
            )

        return orders
