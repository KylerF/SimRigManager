from typing import Optional
import strawberry

from database.ordering.generics import OrderDirection
from database.models import Driver


@strawberry.input(
    description="""
    Order by driver fields. Set fields to
    ASC or DESC to specify order.
    Default is DESC.
    """,
    name="DriverOrder"
)
class DriverOrder:
    """
    Wrapper for orderable driver fields. All fields are optional, and if
    multiple are provided, the result will be ordered by the first field, then
    the second, etc.
    """
    id: Optional[OrderDirection] = strawberry.field(
        description="The driver ID (e.g. 1)",
    )
    name: Optional[OrderDirection] = strawberry.field(
        description="The driver name (e.g. 'John Doe')",
    )
    nickname: Optional[OrderDirection] = strawberry.field(
        description="The driver nickname (e.g. 'JD')",
    )
    profile_pic: Optional[OrderDirection] = strawberry.field(
        description="The driver profile picture URL",
    )
    track_time: Optional[OrderDirection] = strawberry.field(
        description="The driver's total track time in seconds",
    )

    def __init__(
        self,
        id: Optional[str] = None,
        name: Optional[str] = None,
        nickname: Optional[str] = None,
        profile_pic: Optional[str] = None,
        track_time: Optional[str] = None,
    ):
        self.id = id
        self.name = name
        self.nickname = nickname
        self.profile_pic = profile_pic
        self.track_time = track_time

    def to_sqlalchemy(self):
        """
        Combine all orders into a list of SQLAlchemy orders
        """
        orders = []

        if self.id is not None:
            orders.append(
                Driver.id.asc()
                if self.id.value == OrderDirection.ASC.value
                else Driver.id.desc()
            )
        if self.name is not None:
            orders.append(
                Driver.name.asc()
                if self.name.value == OrderDirection.ASC.value
                else Driver.name.desc()
            )
        if self.nickname is not None:
            orders.append(
                Driver.nickname.asc()
                if self.nickname.value == OrderDirection.ASC.value
                else Driver.nickname.desc()
            )
        if self.profile_pic is not None:
            orders.append(
                Driver.profilePic.asc()
                if self.profile_pic.value == OrderDirection.ASC.value
                else Driver.profilePic.desc()
            )
        if self.track_time is not None:
            orders.append(
                Driver.trackTime.asc()
                if self.track_time.value == OrderDirection.ASC.value
                else Driver.trackTime.desc()
            )

        return orders
