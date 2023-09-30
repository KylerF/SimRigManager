from typing import AsyncGenerator
import strawberry
import asyncio

from database.modeltypes import IracingFrameType
from api.utils import get_iracing_data


@strawberry.type(
    description="Subscription to iracing data",
    name="Subscription",
)
class IracingSubscription:
    @strawberry.subscription(description="Subscribe to real-time iRacing data")
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
