from typing import List, Optional
import strawberry

from database.modeltypes import LapTimeType
from database.filters.laptimes import LaptimeFilter
from database.ordering.laptimes import LaptimeOrder
from database.crud import get_laptimes
from database.database import get_db


@strawberry.type(
    description="Used to query for lap times",
    name="LaptimeQuery",
)
class LaptimeQuery:
    @strawberry.field(
        description="Query for lap times",
    )
    def laptimes(
        self,
        skip: int = 0,
        limit: int = -1,
        where: Optional[LaptimeFilter] = None,
        order: Optional[LaptimeOrder] = None,
    ) -> List[LapTimeType]:
        db = next(get_db())

        laptimes = get_laptimes(db, skip, limit, where, order)

        return [LapTimeType.from_pydantic(laptime) for laptime in laptimes]
