import asyncio
from typing import AsyncGenerator, List
import strawberry

from strawberry.fastapi import GraphQLRouter

from database import crud, models
from database.database import get_db
from . import modeltypes
from api.helpers.modelhelpers import get_valid_data, get_iracing_type
from api.utils import get_iracing_data

@strawberry.type(
    description="Used to query the API",
    name="Query",
)
class Query:
    @strawberry.field(
        description="True if the API is active and running"
    )
    def api_active(self) -> bool:
        return True

    @strawberry.field(
        description="Get all drivers"
    )
    def all_drivers(self) -> List[modeltypes.DriverType]:
        db = next(get_db())
        all_drivers = crud.get_drivers(db)

        return [
            modeltypes.DriverType(
                **get_valid_data(driver, models.Driver)
            ) for driver in all_drivers
        ]

    @strawberry.field(
        description="Get the active driver"
    )
    def active_driver(self) -> modeltypes.DriverType:
        db = next(get_db())
        active_driver = crud.get_active_driver(db).driver

        return modeltypes.DriverType(
            **get_valid_data(active_driver, models.Driver)
        )

    @strawberry.field(
        description="Get all lap times"
    )
    def all_laptimes(self) -> List[modeltypes.LapTimeType]:
        db = next(get_db())
        all_laptimes = crud.get_laptimes(db)

        return [
            modeltypes.LapTimeType(
                **get_valid_data(laptime, models.LapTime)
            ) for laptime in all_laptimes
        ]

    @strawberry.field(
        description="Get a random inspirational racing quote"
    )
    def random_quote(self) -> modeltypes.QuoteType:
        db = next(get_db())
        quote = crud.get_random_quote(db)

        return modeltypes.QuoteType(
            **get_valid_data(quote, models.Quote)
        )

    @strawberry.field(
        description="Get the latest frame of iRacing data"
    )
    def iracing(self) -> modeltypes.IracingFrameType:
        frame = get_iracing_data(raw=True)
        return get_iracing_type(frame)


@strawberry.type(
    description="Subscription to changes in the API",
    name="Subscription",
)
class Subscription:
    @strawberry.subscription(
        description="Subscribe to active driver changes"
    )
    async def active_driver(self) -> AsyncGenerator[modeltypes.DriverType, None]:
        db = next(get_db())
        last_driver = None

        while True:
            active_driver = crud.get_active_driver(db).driver

            if not last_driver or active_driver.id != last_driver.id:
                yield modeltypes.DriverType(
                    **get_valid_data(active_driver, models.Driver)
                )

                last_driver = active_driver

            await asyncio.sleep(1)

    @strawberry.subscription(
        description="Subscribe to random inspirational racing quotes at a given frequency"
    )
    async def random_quote(self, update_sec: int = 10) -> AsyncGenerator[modeltypes.QuoteType, None]:
        db = next(get_db())

        while True:
            quote = crud.get_random_quote(db)

            yield modeltypes.QuoteType(
                **get_valid_data(quote, models.Quote)
            )

            await asyncio.sleep(update_sec)

    @strawberry.subscription(
        description="Subscribe to real-time iRacing data"
    )
    async def iracing(self, fps: int = 30) -> AsyncGenerator[modeltypes.IracingFrameType, None]:
        if fps <= 0 or fps > 30:
            raise ValueError("fps must be between 1 and 30")

        while True:
            frame = get_iracing_data(raw=True)
            
            if frame:
                yield get_iracing_type(frame)
                await asyncio.sleep(1 / fps)
            else:
                await asyncio.sleep(1)


schema = strawberry.Schema(query=Query, subscription=Subscription)
graphql_app = GraphQLRouter(schema=schema)
