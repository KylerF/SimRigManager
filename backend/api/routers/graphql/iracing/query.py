import strawberry

from database.modeltypes import IracingFrameType
from api.utils import get_iracing_data


@strawberry.type(
    description="Used to query for iracing data",
    name="IracingQuery",
)
class IracingQuery:
    @strawberry.field(description="Get the latest frame of iRacing data")
    def iracing(self) -> IracingFrameType:
        frame = get_iracing_data()
        return IracingFrameType.from_pydantic(frame)
