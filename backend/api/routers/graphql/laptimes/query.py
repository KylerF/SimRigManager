from typing import List
import strawberry

from api.routers.graphql.filters import LaptimeFilter
from database.modeltypes import LapTimeType
from database.crud import get_laptimes
from database.database import get_db
from database.models import LapTime


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

        if where:
            laptimes = db.query(
                LapTime
            ).filter(
                LapTime.car == where.car.eq,
            ).order_by(
                LapTime.setAt.desc()
            ).offset(
                skip
            ).limit(
                limit
            )
        else:
            laptimes = get_laptimes(db, skip, limit)

        return [
            LapTimeType.from_pydantic(laptime)
            for laptime in laptimes
        ]
