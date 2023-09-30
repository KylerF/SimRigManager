import strawberry

from database.database import get_db
from database.modeltypes import QuoteType
from database.crud import get_random_quote


@strawberry.type(
    description="Used to query for inpirational driving quotes",
    name="QuoteQuery",
)
class QuoteQuery:
    @strawberry.field(description="Get a random inspirational racing quote")
    def random_quote(self) -> QuoteType:
        db = next(get_db())
        quote = get_random_quote(db)

        return QuoteType.from_pydantic(quote)
