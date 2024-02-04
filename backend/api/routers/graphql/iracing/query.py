import strawberry

from database.iracingschemas import IracingFrame
from api.utils import get_iracing_data


@strawberry.type(
    description="Used to query for iracing data",
    name="IracingQuery",
)
class IracingQuery:
    @strawberry.field(description="Get the latest frame of iRacing data")
    def iracing(self) -> IracingFrame:
        frame = get_iracing_data()
        return IracingFrame(frame)
