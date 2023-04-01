from typing import AsyncGenerator
import strawberry
import asyncio

from database.crud import get_random_quote
from database.modeltypes import QuoteType
from database.database import get_db


@strawberry.type(
    description="Subscription to inspirational driving quotes",
    name="QuoteSubscription",
)
class QuoteSubscription:
    @strawberry.subscription(
        description="Subscribe to random inspirational racing quotes at a given frequency"
    )
    async def random_quote(self, update_sec: int = 10) -> AsyncGenerator[QuoteType, None]:
        db = next(get_db())

        while True:
            quote = get_random_quote(db)
            yield QuoteType.from_pydantic(quote)
            await asyncio.sleep(update_sec)
