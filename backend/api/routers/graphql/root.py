import asyncio
from typing import AsyncGenerator
import strawberry

from strawberry.fastapi import GraphQLRouter

from api.utils import get_active_driver_from_cache
from database.schemas import Driver

@strawberry.experimental.pydantic.type(
    description="A driver profile object",
    model=Driver,
    all_fields=True
)
class DriverType:
    pass

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
        description="Get the active driver"
    )
    def active_driver(self) -> DriverType:
        active_driver = get_active_driver_from_cache()

        return DriverType(
            id=active_driver.get('id'),
            name=active_driver.get('name'),
            nickname=active_driver.get('nickname'),
            profilePic=active_driver.get('profilePic'),
            trackTime=active_driver.get('trackTime'),
        )

@strawberry.type(
    description="Subscription to changes in the API",
    name="Subscription",
)
class Subscription:
    @strawberry.subscription(
        description="Subscribe to active driver changes"
    )
    async def active_driver(self) -> AsyncGenerator[DriverType, None]:
        last_driver = get_active_driver_from_cache()

        while True:
            active_driver = get_active_driver_from_cache()

            if active_driver.get('id') != last_driver.get('id'):
                yield DriverType(
                    id=active_driver.get('id'),
                    name=active_driver.get('name'),
                    nickname=active_driver.get('nickname'),
                    profilePic=active_driver.get('profilePic'),
                    trackTime=active_driver.get('trackTime'),
                )

                last_driver = active_driver

            await asyncio.sleep(1)

schema = strawberry.Schema(query=Query, subscription=Subscription)
graphql_app = GraphQLRouter(schema=schema)
