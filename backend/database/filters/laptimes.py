from typing import Optional
import strawberry

from database.filters.generics import (
    NumberFilter,
    StringFilter,
    DateFilter
)
from database.models import LapTime


@strawberry.input(
    description="Filter lap times",
    name="LaptimeFilter"
)
class LaptimeFilter:
    """
    Wrapper for filterable lap time fields. All fields are optional, and if
    multiple are provided, the result will be lap times matching all conditions.
    """
    driver_name: Optional[StringFilter] = None
    driver_id: Optional[NumberFilter] = None
    car: Optional[StringFilter] = None
    track_name: Optional[StringFilter] = None
    track_config: Optional[StringFilter] = None
    time: Optional[NumberFilter] = None
    set_at: Optional[DateFilter] = None

    def __init__(
        self,
        driver_name: Optional[StringFilter] = None,
        driver_id: Optional[NumberFilter] = None,
        car: Optional[StringFilter] = None,
        track_name: Optional[StringFilter] = None,
        track_config: Optional[StringFilter] = None,
        time: Optional[NumberFilter] = None,
        set_at: Optional[DateFilter] = None,
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
        Combine all filters ANDed together into a list of SQLAlchemy filters.
        The resulting list can be passed to a query.filter() call.
        """
        filters = []

        if self.driver_name is not None:
            filters.append(self.driver_name.to_sqlalchemy(LapTime.driverName))
        if self.driver_id is not None:
            filters.append(self.driver_id.to_sqlalchemy(LapTime.driverId))
        if self.car is not None:
            filters.append(self.car.to_sqlalchemy(LapTime.car))
        if self.track_name is not None:
            filters.append(self.track_name.to_sqlalchemy(LapTime.trackName))
        if self.track_config is not None:
            filters.append(self.track_config.to_sqlalchemy(LapTime.trackConfig))
        if self.time is not None:
            filters.append(self.time.to_sqlalchemy(LapTime.time))
        if self.set_at is not None:
            filters.append(self.set_at.to_sqlalchemy(LapTime.setAt))

        return filters
