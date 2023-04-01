from typing import Optional
import strawberry

from database.filters.generics import (
    NumberFilter,
    StringFilter
)
from database.models import Driver


@strawberry.input(
    description="Filter drivers",
    name="DriverFilter"
)
class DriverFilter:
    """
    Wrapper for filterable driver fields. All fields are optional, and if
    multiple are provided, the result will be drivers matching all conditions.
    """
    id: Optional[NumberFilter] = None
    name: Optional[StringFilter] = None
    nickname: Optional[StringFilter] = None
    profile_pic: Optional[StringFilter] = None
    track_time: Optional[NumberFilter] = None

    def __init__(
        self,
        id: Optional[NumberFilter] = None,
        name: Optional[StringFilter] = None,
        nickname: Optional[StringFilter] = None,
        profile_pic: Optional[StringFilter] = None,
        track_time: Optional[NumberFilter] = None,
    ):
        self.id = id
        self.name = name
        self.nickname = nickname
        self.profile_pic = profile_pic
        self.track_time = track_time

    def to_sqlalchemy(self):
        """
        Combine all filters ANDed together into a list of SQLAlchemy filters.
        The resulting list can be passed to a query.filter() call.
        """
        filters = []

        if self.id is not None:
            filters.extend(self.id.to_sqlalchemy(Driver.id))
        if self.name is not None:
            filters.extend(self.name.to_sqlalchemy(Driver.name))
        if self.nickname is not None:
            filters.extend(self.nickname.to_sqlalchemy(Driver.nickname))
        if self.profile_pic is not None:
            filters.extend(self.profile_pic.to_sqlalchemy(Driver.profilePic))
        if self.track_time is not None:
            filters.extend(self.track_time.to_sqlalchemy(Driver.trackTime))

        return filters
