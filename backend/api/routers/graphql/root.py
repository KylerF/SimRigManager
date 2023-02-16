from strawberry.fastapi import GraphQLRouter
from typing import AsyncGenerator
import strawberry
import asyncio

from api.routers.graphql.healthcheck.query import HealthcheckQuery
from api.routers.graphql.drivers.query import DriverQuery
from api.routers.graphql.iracing.query import IracingQuery
from api.routers.graphql.laptimes.query import LaptimeQuery

from api.routers.graphql.drivers.mutation import DriverMutation

from api.utils import get_iracing_data, get_session_best_lap
from database.database import get_db
from database.modeltypes import (
    DriverType,
    LapTimeType,
    QuoteType,
    IracingFrameType,
)
from database.crud import (
    get_active_driver,
    get_random_quote,
 )


@strawberry.type(
    description="Used to query the API",
    name="Query",
)
class Query(
    HealthcheckQuery,
    DriverQuery,
    LaptimeQuery,
    IracingQuery,
):
    """
    Root query type
    Register all other query types here
    """
    pass


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
            active_driver = get_active_driver(db)

            if active_driver:
                if not last_driver or active_driver.driver.id != last_driver.id:
                    yield DriverType.from_pydantic(active_driver.driver)

                    last_driver = active_driver.driver

            await asyncio.sleep(1)

    @strawberry.subscription(
        description="Subscribe to random inspirational racing quotes at a given frequency"
    )
    async def random_quote(self, update_sec: int = 10) -> AsyncGenerator[QuoteType, None]:
        db = next(get_db())

        while True:
            quote = get_random_quote(db)

            yield QuoteType.from_pydantic(quote)

            await asyncio.sleep(update_sec)

    @strawberry.subscription(
        description="Subscribe to real-time iRacing data"
    )
    async def iracing(self, fps: int = 30) -> AsyncGenerator[IracingFrameType, None]:
        if fps <= 0 or fps > 30:
            raise ValueError("fps must be between 1 and 30")

        while True:
            frame = get_iracing_data()

            if frame:
                yield IracingFrameType.from_pydantic(frame)
                await asyncio.sleep(1 / fps)
            else:
                await asyncio.sleep(1)

    @strawberry.subscription(
        description="Subscribe to lap times"
    )
    async def laptime(self, update_sec: int = 5) -> AsyncGenerator[LapTimeType, None]:
        last_time = get_session_best_lap()

        while True:
            if await self.request.is_disconnected():
                break

            lap_time = get_session_best_lap()

            if lap_time:
                if not last_time or lap_time["id"] != last_time["id"]:
                    yield LapTimeType.from_pydantic(lap_time)
                    last_time = lap_time

            await asyncio.sleep(update_sec)


@strawberry.type(
    description="Mutation to make changes in the API",
    name="Mutation",
)
class Mutation(DriverMutation):
    """
    Root mutation type
    Register all other mutation types here
    """
    pass


schema = strawberry.Schema(
    query=Query,
    subscription=Subscription,
    mutation=Mutation
)
graphql_app = GraphQLRouter(schema=schema)
