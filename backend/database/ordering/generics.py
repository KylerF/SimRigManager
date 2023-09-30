from enum import Enum
import strawberry


@strawberry.enum(description="Ordering direction", name="OrderDirection")
class OrderDirection(Enum):
    ASC = strawberry.enum_value(value="ASC", description="Ascending")
    DESC = strawberry.enum_value(value="DESC", description="Descending")
