"""
Pydantic schema mappings for the GraphQL server. This uses an expiremental
method of tanslating pydantic schemas directly to GraphQL types.
"""

import strawberry

from database import schemas, iracingschemas


@strawberry.experimental.pydantic.type(
    description="A driver profile object", model=schemas.Driver, all_fields=True
)
class DriverType:
    pass


@strawberry.experimental.pydantic.type(
    description="A lap time set by a driver", model=schemas.LapTime, all_fields=True
)
class LapTimeType:
    pass


@strawberry.experimental.pydantic.type(
    description="An inspirational racing quote", model=schemas.Quote, all_fields=True
)
class QuoteType:
    pass


@strawberry.experimental.pydantic.type(
    description="A WLED controller", model=schemas.LightController, all_fields=True
)
class LightControllerType:
    pass


@strawberry.experimental.pydantic.type(
    description="iRacing driver schema", model=iracingschemas.Driver
)
class IracingDriverType:
    # Override scalar union types
    LicColor: str

    # Auto the rest
    CarIdx: strawberry.auto
    UserName: strawberry.auto
    AbbrevName: strawberry.auto
    Initials: strawberry.auto
    UserID: strawberry.auto
    TeamID: strawberry.auto
    TeamName: strawberry.auto
    CarNumber: strawberry.auto
    CarNumberRaw: strawberry.auto
    CarPath: strawberry.auto
    CarClassID: strawberry.auto
    CarID: strawberry.auto
    CarIsElectric: strawberry.auto
    CarIsPaceCar: strawberry.auto
    CarIsAI: strawberry.auto
    CarScreenName: strawberry.auto
    CarScreenNameShort: strawberry.auto
    CarClassShortName: strawberry.auto
    CarClassRelSpeed: strawberry.auto
    CarClassLicenseLevel: strawberry.auto
    CarClassMaxFuelPct: strawberry.auto
    CarClassWeightPenalty: strawberry.auto
    CarClassPowerAdjust: strawberry.auto
    CarClassDryTireSetLimit: strawberry.auto
    CarClassColor: strawberry.auto
    CarClassEstLapTime: strawberry.auto
    IRating: strawberry.auto
    LicLevel: strawberry.auto
    LicSubLevel: strawberry.auto
    LicString: strawberry.auto
    IsSpectator: strawberry.auto
    CarDesignStr: strawberry.auto
    HelmetDesignStr: strawberry.auto
    SuitDesignStr: strawberry.auto
    CarNumberDesignStr: strawberry.auto
    CarSponsor_1: strawberry.auto
    CarSponsor_2: strawberry.auto
    ClubName: strawberry.auto
    ClubID: strawberry.auto
    DivisionName: strawberry.auto
    DivisionID: strawberry.auto
    CurDriverIncidentCount: strawberry.auto
    TeamIncidentCount: strawberry.auto


@strawberry.experimental.pydantic.type(
    description="iRacing telemetry options",
    model=iracingschemas.TelemetryOptions,
    all_fields=True,
)
class TelemetryOptionsType:
    pass


@strawberry.experimental.pydantic.type(
    description="iRacing weekend options",
    model=iracingschemas.WeekendOptions,
)
class WeekendOptionsType:
    # Override scalar union types
    IncidentLimit: str
    FastRepairsLimit: str
    GreenWhiteCheckeredLimit: str
    CourseCautions: str

    # Auto the rest
    NumStarters: strawberry.auto
    StartingGrid: strawberry.auto
    QualifyScoring: strawberry.auto
    StandingStart: strawberry.auto
    ShortParadeLap: strawberry.auto
    Restarts: strawberry.auto
    WeatherType: strawberry.auto
    Skies: strawberry.auto
    WindDirection: strawberry.auto
    WindSpeed: strawberry.auto
    WeatherTemp: strawberry.auto
    RelativeHumidity: strawberry.auto
    FogLevel: strawberry.auto
    TimeOfDay: strawberry.auto
    Date: strawberry.auto
    EarthRotationSpeedupFactor: strawberry.auto
    Unofficial: strawberry.auto
    CommercialMode: strawberry.auto
    NightMode: strawberry.auto
    IsFixedSetup: strawberry.auto
    StrictLapsChecking: strawberry.auto
    HasOpenRegistration: strawberry.auto
    HardcoreLevel: strawberry.auto
    NumJokerLaps: strawberry.auto


@strawberry.experimental.pydantic.type(
    description="iRacing weekend info",
    model=iracingschemas.WeekendInfo,
    all_fields=True,
)
class WeekendInfoType:
    pass


@strawberry.experimental.pydantic.type(
    description="iRacing driver info", model=iracingschemas.DriverInfo, all_fields=True
)
class DriverInfoType:
    pass


@strawberry.experimental.pydantic.type(
    description="A frame of iRacing data (https://sajax.github.io/irsdkdocs/telemetry/)",
    model=iracingschemas.IracingFrame,
    all_fields=True,
)
class IracingFrameType:
    pass
