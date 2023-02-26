from enum import Enum
import strawberry


@strawberry.enum(
    description="Ordering direction",
    name="OrderDirection"
)
class OrderDirection(Enum):
    ASC = "ASC"
    DESC = "DESC"
