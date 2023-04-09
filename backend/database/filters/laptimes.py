from sqlalchemy import func, select
from typing import Optional
import strawberry

from database.filters.generics import (
    NumberFilter,
    StringFilter,
    DateFilter
)
from database.models import LapTime


@strawberry.input(
    description="Filter lap times. All fields are optional, and if multiple are provided, \
    the result will be lap times matching all conditions.",
    name="LaptimeFilter",
    directives={
        "filterable": True,
        "orderable": True,
    }
)
class LaptimeFilter:
    """
    Wrapper for filterable lap time fields. All fields are optional, and if
    multiple are provided, the result will be lap times matching all conditions.
    TODO: Add fields for combining filters with OR
    """
    driver_name: Optional[StringFilter] = strawberry.field(
        description="The driver name (e.g. 'John Doe')",
    )
    driver_id: Optional[NumberFilter] = strawberry.field(
        description="The driver ID (e.g. 1)",
    )
    car: Optional[StringFilter] = strawberry.field(
        description="The car name (e.g. 'Ferrari 488 GT3')",
    )
    track_name: Optional[StringFilter] = strawberry.field(
        description="The track name (e.g. 'Watkins Glen')",
    )
    track_config: Optional[StringFilter] = strawberry.field(
        description="The track configuration (e.g. 'Full Circuit')",
    )
    time: Optional[NumberFilter] = strawberry.field(
        description="The lap time in seconds",
    )
    set_at: Optional[DateFilter] = strawberry.field(
        description="The date and time the lap time was set",
    )
    overall_best_only: Optional[bool] = strawberry.field(
        description="Only return the overall best lap time for each car/track/trackConfig \
        combination",
    )

    def __init__(
        self,
        driver_name: Optional[StringFilter] = None,
        driver_id: Optional[NumberFilter] = None,
        car: Optional[StringFilter] = None,
        track_name: Optional[StringFilter] = None,
        track_config: Optional[StringFilter] = None,
        time: Optional[NumberFilter] = None,
        set_at: Optional[DateFilter] = None,
        overall_best_only: Optional[bool] = None
    ):
        self.driver_name = driver_name
        self.driver_id = driver_id
        self.car = car
        self.track_name = track_name
        self.track_config = track_config
        self.time = time
        self.set_at = set_at
        self.overall_best_only = overall_best_only

    def to_sqlalchemy(self):
        """
        Combine all filters ANDed together into a list of SQLAlchemy filters.
        The resulting list can be passed to a query.filter() call.
        """
        filters = []

        if self.driver_name is not None:
            filters.extend(self.driver_name.to_sqlalchemy(LapTime.driverName))
        if self.driver_id is not None:
            filters.extend(self.driver_id.to_sqlalchemy(LapTime.driverId))
        if self.car is not None:
            filters.extend(self.car.to_sqlalchemy(LapTime.car))
        if self.track_name is not None:
            filters.extend(self.track_name.to_sqlalchemy(LapTime.trackName))
        if self.track_config is not None:
            filters.extend(self.track_config.to_sqlalchemy(LapTime.trackConfig))
        if self.time is not None:
            filters.extend(self.time.to_sqlalchemy(LapTime.time))
        if self.set_at is not None:
            filters.extend(self.set_at.to_sqlalchemy(LapTime.setAt))

        if self.overall_best_only:
            # Needs to filter by the minimum time for each car/track/trackConfig
            # combination. There is no field to do this, so we need to use a
            # subquery to get the minimum time for each combination, then join
            # that to the main query.
            subquery = (
                select(
                    LapTime.car,
                    LapTime.trackName,
                    LapTime.trackConfig,
                    func.min(LapTime.time).label("min_time")
                )
                .group_by(
                    LapTime.car,
                    LapTime.trackName,
                    LapTime.trackConfig
                )
                .alias()
            )

            filters.append(
                LapTime.time == subquery.c.min_time
            )

        return filters
