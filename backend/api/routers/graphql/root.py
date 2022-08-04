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
        description="True if the API is active and running",
        name="active",
    )
    def apiActive(self) -> bool:
        return True

    @strawberry.field(
        description="Get the active driver",
        name="activeDriver",
    )
    def getActiveDriver(self) -> DriverType:
        active_driver = get_active_driver_from_cache()

        return DriverType(
            id=active_driver['id'],
            name=active_driver['name'],
            nickname=active_driver['nickname'],
            profilePic=active_driver['profilePic'],
            trackTime=active_driver['trackTime'],
        )

@strawberry.type(
    description="Subscription to changes in the API",
    name="Subscription",
)
class Subscription:
    @strawberry.subscription(
        description="Subscribe to active driver changes",
        name="activeDriver",
    )
    async def activeDriver(self) -> AsyncGenerator[DriverType, None]:
        last_driver = get_active_driver_from_cache()

        while True:
            active_driver = get_active_driver_from_cache()

            if active_driver['id'] != last_driver['id']:
                yield DriverType(
                    id=active_driver['id'],
                    name=active_driver['name'],
                    nickname=active_driver['nickname'],
                    profilePic=active_driver['profilePic'],
                    trackTime=active_driver['trackTime'],
                )

                last_driver = active_driver

            await asyncio.sleep(2)

schema = strawberry.Schema(query=Query, subscription=Subscription)
graphql_app = GraphQLRouter(schema=schema)
