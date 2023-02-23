from sqlalchemy import Column
from typing import Optional
import strawberry

from database.models import LapTime


@strawberry.input(
    description="Filter by number using equality, greater than, or less than",
    name="NumberFilter"
)
class NumberFilter:
    eq: Optional[float] = None
    ne: Optional[float] = None
    gt: Optional[float] = None
    gte: Optional[float] = None
    lt: Optional[float] = None
    lte: Optional[float] = None

    # Methods to convert to SQLAlchemy filters
    def to_sqlalchemy(self, field: Column):
        if self.eq is not None:
            return field == self.eq
        elif self.ne is not None:
            return field != self.ne
        elif self.gt is not None:
            return field > self.gt
        elif self.gte is not None:
            return field >= self.gte
        elif self.lt is not None:
            return field < self.lt
        elif self.lte is not None:
            return field <= self.lte
        else:
            return None


@strawberry.input(
    description="""
    Filter by date. The date must be in
    ISO 8601 format.
    For example: 2021-01-01T00:00:00.000Z
    """,
    name="DateFilter"
)
class DateFilter:
    eq: Optional[str] = None
    before: Optional[str] = None
    after: Optional[str] = None

    # Methods to convert to SQLAlchemy filters
    def to_sqlalchemy(self, field: Column):
        if self.eq is not None:
            return field == self.eq
        elif self.before is not None:
            return field < self.before
        elif self.after is not None:
            return field > self.after
        else:
            return None


@strawberry.input(
    description="""Filter string using equality, starts with,
    ends with, or contains
    """,
    name="StringFilter"
)
class StringFilter:
    """
    Filtering for strings
    - eq: Equals
    - ne: Not equal
    - ieq: Case insensitive equal
    - ieq: Case insensitive not equal
    - starts_with: Starts with provided string
    - ends_with: Ends with provided string
    - like: Matches provided regular expression
    - contains: Contains provided string
    """
    eq: Optional[str] = None
    ne: Optional[str] = None
    ieq: Optional[str] = None
    ine: Optional[str] = None
    starts_with: Optional[str] = None
    ends_with: Optional[str] = None
    like: Optional[str] = None
    contains: Optional[str] = None

    # Methods to convert to SQLAlchemy filters
    def to_sqlalchemy(self, field: Column):
        if self.eq is not None:
            return field == self.eq
        elif self.ne is not None:
            return field != self.ne
        elif self.ieq is not None:
            return field.ilike(self.ieq)
        elif self.ine is not None:
            return field.notilike(self.ine)
        elif self.starts_with is not None:
            return field.startswith(self.starts_with)
        elif self.ends_with is not None:
            return field.endswith(self.ends_with)
        elif self.like is not None:
            return field.like(self.like)
        elif self.contains is not None:
            return field.contains(self.contains)
        else:
            return None


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

    def to_sqlalchemy(self):
        """
        Combine all filters ANDed together into a list of SQLAlchemy filters
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
