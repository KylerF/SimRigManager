from typing import List, Optional
import strawberry

from database.filters.drivers import DriverFilter
from database.ordering.drivers import DriverOrder
from database.modeltypes import DriverType
from database.database import get_db
from database.crud import (
    get_active_driver,
    get_drivers,
 )


@strawberry.type(
    description="Used to query for driver data",
    name="DriverQuery",
)
class DriverQuery:
    @strawberry.field(
        description="Get all drivers",
    )
    def drivers(
        self,
        skip: Optional[int] = 0,
        limit: Optional[int] = -1,
        where: Optional[DriverFilter] = None,
        order: Optional[DriverOrder] = None,
    ) -> List[DriverType]:
        db = next(get_db())
        drivers = get_drivers(db, skip, limit, where, order)

        return [
            DriverType.from_pydantic(driver)
            for driver in drivers
        ]

    @strawberry.field(
        description="Get the active driver"
    )
    def active_driver(self) -> DriverType:
        db = next(get_db())
        active_driver = get_active_driver(db).driver

        return DriverType.from_pydantic(active_driver)
