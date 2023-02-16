from typing import List
import strawberry

from database.database import get_db
from database.modeltypes import DriverType
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
        description="Get all drivers"
    )
    def all_drivers(self) -> List[DriverType]:
        db = next(get_db())
        all_drivers = get_drivers(db)

        return [
            DriverType.from_pydantic(driver)
            for driver in all_drivers
        ]

    @strawberry.field(
        description="Get the active driver"
    )
    def active_driver(self) -> DriverType:
        db = next(get_db())
        active_driver = get_active_driver(db).driver

        return DriverType.from_pydantic(active_driver)
