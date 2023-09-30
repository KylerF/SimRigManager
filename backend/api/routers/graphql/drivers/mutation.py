import strawberry

from database.schemas import ActiveDriverCreate
from database.modeltypes import DriverType
from api.utils import update_driver_cache
from database.database import get_db
from database.crud import (
    delete_active_driver,
    set_active_driver,
    get_driver_by_id,
)


@strawberry.type(
    description="Mutations for driver data",
    name="DriverMutation",
)
class DriverMutation:
    @strawberry.mutation(description="Set the active driver")
    def set_active_driver(self, driverId: int) -> DriverType:
        db = next(get_db())
        driver = ActiveDriverCreate(driverId=driverId)

        # Validate the driver id
        if not get_driver_by_id(db, driverId):
            raise Exception(f"Driver with id {driverId} does not exist")

        delete_active_driver(db)
        new_active_driver = set_active_driver(db, driver)

        # Update cache for worker threads
        update_driver_cache(new_active_driver.driver)

        return DriverType.from_pydantic(new_active_driver.driver)
