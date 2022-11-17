"""
Pydantic schema mappings for the GraphQL server. This uses an expiremental
method of tanslating pydantic schemas directly to GraphQL types.
"""
import strawberry

from database import schemas


@strawberry.experimental.pydantic.type(
    description="A driver profile object",
    model=schemas.Driver,
    all_fields=True
)
class DriverType:
    pass


@strawberry.experimental.pydantic.type(
    description="A lap time set by a driver",
    model=schemas.LapTime,
    all_fields=True
)
class LapTimeType:
    pass


@strawberry.experimental.pydantic.type(
    description="An inspirational racing quote",
    model=schemas.Quote,
    all_fields=True
)
class QuoteType:
    pass


@strawberry.experimental.pydantic.type(
    description="A WLED controller",
    model=schemas.LightController,
    all_fields=True
)
class LightControllerType:
    pass
