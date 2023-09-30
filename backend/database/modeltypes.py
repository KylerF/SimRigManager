"""
Pydantic schema mappings for the GraphQL server. This uses an expiremental
method of tanslating pydantic schemas directly to GraphQL types.
"""
import strawberry

from database import schemas, iracingschemas


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


@strawberry.experimental.pydantic.type(
    description="iRacing driver schema",
    model=iracingschemas.Driver,
    all_fields=True
)
class IracingDriverType:
    pass


@strawberry.experimental.pydantic.type(
    description="iRacing telemetry options",
    model=iracingschemas.TelemetryOptions,
    all_fields=True
)
class TelemetryOptionsType:
    pass


@strawberry.experimental.pydantic.type(
    description="iRacing weekend options",
    model=iracingschemas.WeekendOptions,
    all_fields=True
)
class WeekendOptionsType:
    pass


@strawberry.experimental.pydantic.type(
    description="iRacing weekend info",
    model=iracingschemas.WeekendInfo,
    all_fields=True
)
class WeekendInfoType:
    pass


@strawberry.experimental.pydantic.type(
    description="iRacing driver info",
    model=iracingschemas.DriverInfo,
    all_fields=True
)
class DriverInfoType:
    pass


@strawberry.experimental.pydantic.type(
    description="A frame of iRacing data (https://sajax.github.io/irsdkdocs/telemetry/)",
    model=iracingschemas.IracingFrame,
    all_fields=True
)
class IracingFrameType:
    pass
