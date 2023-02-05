import asyncio
from typing import AsyncGenerator, List
import strawberry

from strawberry.fastapi import GraphQLRouter

from database import crud
from database.models import (
    Driver,
    LapTime,
    Quote
)
from database.database import get_db
from api.routers.graphql.modeltypes import (
    DriverType,
    LapTimeType,
    QuoteType,
    IracingFrameType
)
from api.helpers.modelhelpers import get_iracing_type
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
    def all_drivers(self) -> List[DriverType]:
        db = next(get_db())
        all_drivers = crud.get_drivers(db)

        return [
            DriverType.from_pydantic(driver)
            for driver in all_drivers
        ]

    @strawberry.field(
        description="Get the active driver"
    )
    def active_driver(self) -> DriverType:
        db = next(get_db())
        active_driver = crud.get_active_driver(db).driver

        return DriverType.from_pydantic(active_driver)

    @strawberry.field(
        description="Get all lap times"
    )
    def all_laptimes(self) -> List[LapTimeType]:
        db = next(get_db())
        all_laptimes = crud.get_laptimes(db)

        return [
            LapTimeType.from_pydantic(laptime)
            for laptime in all_laptimes
        ]

    @strawberry.field(
        description="Get a random inspirational racing quote"
    )
    def random_quote(self) -> QuoteType:
        db = next(get_db())
        quote = crud.get_random_quote(db)

        return QuoteType.from_pydantic(quote)

    @strawberry.field(
        description="Get the latest frame of iRacing data"
    )
    def iracing(self) -> IracingFrameType:
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
    async def active_driver(self) -> AsyncGenerator[DriverType, None]:
        db = next(get_db())
        last_driver = None

        while True:
            active_driver = crud.get_active_driver(db).driver

            if not last_driver or active_driver.id != last_driver.id:
                yield DriverType.from_pydantic(active_driver)

                last_driver = active_driver

            await asyncio.sleep(1)

    @strawberry.subscription(
        description="Subscribe to random inspirational racing quotes at a given frequency"
    )
    async def random_quote(self, update_sec: int = 10) -> AsyncGenerator[QuoteType, None]:
        db = next(get_db())

        while True:
            quote = crud.get_random_quote(db)

            yield QuoteType.from_pydantic(quote)

            await asyncio.sleep(update_sec)

    @strawberry.subscription(
        description="Subscribe to real-time iRacing data"
    )
    async def iracing(self, fps: int = 30) -> AsyncGenerator[IracingFrameType, None]:
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
