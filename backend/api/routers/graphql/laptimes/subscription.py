import strawberry
from typing import AsyncGenerator
import asyncio

from database.database import get_db
from database.modeltypes import LapTimeType
from api.utils import get_session_best_lap


@strawberry.type(
    description="Subscription to new lap times",
    name="LaptimeSubscription",
)
class LaptimeSubscription:
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
