from typing import List
import strawberry

from database.modeltypes import LapTimeType
from database.filters import LaptimeFilter
from database.crud import get_laptimes
from database.database import get_db


@strawberry.type(
    description="Used to query for lap times",
    name="LaptimeQuery",
)
class LaptimeQuery:
    @strawberry.field(
        description="Get all lap times"
    )
    def laptimes(
        self,
        skip: int = 0,
        limit: int = -1,
        where: LaptimeFilter = None
    ) -> List[LapTimeType]:
        db = next(get_db())

        laptimes = get_laptimes(db, skip, limit, where)

        return [
            LapTimeType.from_pydantic(laptime)
            for laptime in laptimes
        ]
