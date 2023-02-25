import strawberry
from typing import AsyncGenerator
import asyncio

from database.database import get_db
from database.modeltypes import DriverType
from database.crud import get_active_driver


@strawberry.type(
    description="Subscription to changes to driver data",
    name="DriverSubscription",
)
class DriverSubscription:
    @strawberry.subscription(
        description="Subscribe to active driver changes"
    )
    async def active_driver(self) -> AsyncGenerator[DriverType, None]:
        db = next(get_db())
        last_driver = None

        while True:
            active_driver = get_active_driver(db)

            if active_driver:
                if not last_driver or active_driver.driver.id != last_driver.id:
                    yield DriverType.from_pydantic(active_driver.driver)

                    last_driver = active_driver.driver

            await asyncio.sleep(1)
