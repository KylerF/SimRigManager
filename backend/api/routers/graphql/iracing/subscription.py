from typing import AsyncGenerator
import strawberry
import asyncio

from database.iracingschemas import IracingFrame
from api.utils import get_iracing_data


@strawberry.type(
    description="Subscription to iracing data",
    name="Subscription",
)
class IracingSubscription:
    @strawberry.subscription(description="Subscribe to real-time iRacing data")
    async def iracing(self, fps: int = 30) -> AsyncGenerator[IracingFrame, None]:
        if fps <= 0 or fps > 30:
            raise ValueError("fps must be between 1 and 30")

        while True:
            frame = get_iracing_data()

            if frame:
                yield IracingFrame(frame)
                await asyncio.sleep(1 / fps)
            else:
                await asyncio.sleep(1)
