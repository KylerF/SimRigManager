from typing import List
import strawberry

from database.database import get_db
from database.modeltypes import LapTimeType
from database.crud import get_laptimes


@strawberry.type(
    description="Used to query for lap times",
    name="LaptimeQuery",
)
class LaptimeQuery:
    @strawberry.field(
        description="Get all lap times"
    )
    def all_laptimes(self, skip: int = 0, limit: int = -1) -> List[LapTimeType]:
        db = next(get_db())
        all_laptimes = get_laptimes(db, skip, limit)

        return [
            LapTimeType.from_pydantic(laptime)
            for laptime in all_laptimes
        ]
