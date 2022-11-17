"""
Pydantic schemas for iRacing data
"""
from typing import List, Optional
from pydantic import BaseModel


class WeekendOptions(BaseModel):
    NumStarters: int
    StartingGrid: str
    QualifyScoring: str
    CourseCautions: bool
    StandingStart: int
    ShortParadeLap: int
    Restarts: str
    WeatherType: str
    Skies: str
    WindDirection: str
    WindSpeed: str
    WeatherTemp: str
    RelativeHumidity: str
    FogLevel: str
    TimeOfDay: str
    Date: str
    EarthRotationSpeedupFactor: int
    Unofficial: int
    CommercialMode: str
    NightMode: str
    IsFixedSetup: int
    StrictLapsChecking: str
    HasOpenRegistration: int
    HardcoreLevel: int
    NumJokerLaps: int
    IncidentLimit: str
    FastRepairsLimit: int
    GreenWhiteCheckeredLimit: int


class TelemetryOptions(BaseModel):
    TelemetryDiskFile: str


class WeekendInfo(BaseModel):
    TrackName: str
    TrackID: int
    TrackLength: str
    TrackDisplayName: str
    TrackDisplayShortName: str
    TrackConfigName: str
    TrackCity: str
    TrackCountry: str
    TrackAltitude: str
    TrackLatitude: str
    TrackLongitude: str
    TrackNorthOffset: str
    TrackNumTurns: int
    TrackPitSpeedLimit: str
    TrackType: str
    TrackDirection: str
    TrackWeatherType: str
    TrackSkies: str
    TrackSurfaceTemp: str
    TrackAirTemp: str
    TrackAirPressure: str
    TrackWindVel: str
    TrackWindDir: str
    TrackRelativeHumidity: str
    TrackFogLevel: str
    TrackCleanup: int
    TrackDynamicTrack: int
    TrackVersion: str
    SeriesID: int
    SeasonID: int
    SessionID: int
    SubSessionID: int
    LeagueID: int
    Official: int
    RaceWeek: int
    EventType: str
    Category: str
    SimMode: str
    TeamRacing: int
    MinDrivers: int
    MaxDrivers: int
    DCRuleSet: str
    QualifierMustStartRace: int
    NumCarClasses: int
    NumCarTypes: int
    HeatRacing: int
    BuildType: str
    BuildTarget: str
    BuildVersion: str
    WeekendOptions: WeekendOptions
    TelemetryOptions: TelemetryOptions


class Driver(BaseModel):
    CarIdx: int
    UserName: str
    AbbrevName: str
    Initials: str
    UserID: int
    TeamID: int
    TeamName: str
    CarNumber: str
    CarNumberRaw: int
    CarPath: str
    CarClassID: int
    CarID: int
    CarIsPaceCar: int
    CarIsAI: int
    CarScreenName: str
    CarScreenNameShort: str
    CarClassShortName: str
    CarClassRelSpeed: int
    CarClassLicenseLevel: int
    CarClassMaxFuelPct: str
    CarClassWeightPenalty: str
    CarClassPowerAdjust: str
    CarClassDryTireSetLimit: str
    CarClassColor: int
    CarClassEstLapTime: float
    IRating: int
    LicLevel: int
    LicSubLevel: int
    LicString: str
    LicColor: int
    IsSpectator: int
    CarDesignStr: str
    HelmetDesignStr: str
    SuitDesignStr: str
    CarNumberDesignStr: str
    CarSponsor_1: int
    CarSponsor_2: int
    ClubName: str
    DivisionName: str
    CurDriverIncidentCount: int
    TeamIncidentCount: int


class DriverInfo(BaseModel):
    DriverCarIdx: int
    DriverUserID: int
    PaceCarIdx: int
    DriverHeadPosX: float
    DriverHeadPosY: float
    DriverHeadPosZ: float
    DriverCarIdleRPM: int
    DriverCarRedLine: int
    DriverCarEngCylinderCount: int
    DriverCarFuelKgPerLtr: float
    DriverCarFuelMaxLtr: float
    DriverCarMaxFuelPct: int
    DriverCarGearNumForward: int
    DriverCarGearNeutral: int
    DriverCarGearReverse: int
    DriverCarSLFirstRPM: int
    DriverCarSLShiftRPM: int
    DriverCarSLLastRPM: int
    DriverCarSLBlinkRPM: int
    DriverCarVersion: str
    DriverPitTrkPct: float
    DriverCarEstLapTime: float
    DriverSetupName: str
    DriverSetupIsModified: int
    DriverSetupLoadTypeName: str
    DriverSetupPassedTech: int
    DriverIncidentCount: int
    Drivers: List[Driver]


class IracingFrame(BaseModel):
    SessionTime: Optional[float] = None
    SessionTick: Optional[int] = None
    SessionNum: Optional[int] = None
    SessionState: Optional[int] = None
    SessionUniqueID: Optional[int] = None
    SessionFlags: Optional[int] = None
    SessionTimeRemain: Optional[float] = None
    SessionLapsRemain: Optional[int] = None
    SessionLapsRemainEx: Optional[int] = None
    SessionTimeTotal: Optional[int] = None
    SessionLapsTotal: Optional[int] = None
    SessionTimeOfDay: Optional[int] = None
    RadioTransmitCarIdx: Optional[int] = None
    RadioTransmitRadioIdx: Optional[int] = None
    RadioTransmitFrequencyIdx: Optional[int] = None
    DisplayUnits: Optional[int] = None
    DriverMarker: Optional[bool] = None
    PushToPass: Optional[bool] = None
    ManualBoost: Optional[bool] = None
    ManualNoBoost: Optional[bool] = None
    IsOnTrack: Optional[bool] = None
    IsReplayPlaying: Optional[bool] = None
    ReplayFrameNum: Optional[int] = None
    ReplayFrameNumEnd: Optional[int] = None
    IsDiskLoggingEnabled: Optional[bool] = None
    IsDiskLoggingActive: Optional[bool] = None
    FrameRate: Optional[float] = None
    CpuUsageFG: Optional[float] = None
    GpuUsage: Optional[float] = None
    ChanAvgLatency: Optional[int] = None
    ChanLatency: Optional[int] = None
    ChanQuality: Optional[int] = None
    ChanPartnerQuality: Optional[int] = None
    CpuUsageBG: Optional[float] = None
    ChanClockSkew: Optional[int] = None
    MemPageFaultSec: Optional[int] = None
    PlayerCarPosition: Optional[int] = None
    PlayerCarClassPosition: Optional[int] = None
    PlayerCarClass: Optional[int] = None
    PlayerTrackSurface: Optional[int] = None
    PlayerTrackSurfaceMaterial: Optional[int] = None
    PlayerCarIdx: Optional[int] = None
    PlayerCarTeamIncidentCount: Optional[int] = None
    PlayerCarMyIncidentCount: Optional[int] = None
    PlayerCarDriverIncidentCount: Optional[int] = None
    PlayerCarWeightPenalty: Optional[int] = None
    PlayerCarPowerAdjust: Optional[int] = None
    PlayerCarDryTireSetLimit: Optional[int] = None
    PlayerCarTowTime: Optional[int] = None
    PlayerCarInPitStall: Optional[bool] = None
    PlayerCarPitSvStatus: Optional[int] = None
    PlayerTireCompound: Optional[int] = None
    PlayerFastRepairsUsed: Optional[int] = None
    CarIdxLap: Optional[List[int]] = None
    CarIdxLapCompleted: Optional[List[int]] = None
    CarIdxLapDistPct: Optional[List[float]] = None
    CarIdxTrackSurface: Optional[List[int]] = None
    CarIdxTrackSurfaceMaterial: Optional[List[int]] = None
    CarIdxOnPitRoad: Optional[List[bool]] = None
    CarIdxPosition: Optional[List[int]] = None
    CarIdxClassPosition: Optional[List[int]] = None
    CarIdxClass: Optional[List[int]] = None
    CarIdxF2Time: Optional[List[float]] = None
    CarIdxEstTime: Optional[List[float]] = None
    CarIdxLastLapTime: Optional[List[float]] = None
    CarIdxBestLapTime: Optional[List[float]] = None
    CarIdxBestLapNum: Optional[List[int]] = None
    CarIdxTireCompound: Optional[List[int]] = None
    CarIdxQualTireCompound: Optional[List[int]] = None
    CarIdxQualTireCompoundLocked: Optional[List[bool]] = None
    CarIdxFastRepairsUsed: Optional[List[int]] = None
    PaceMode: Optional[int] = None
    CarIdxPaceLine: Optional[List[int]] = None
    CarIdxPaceRow: Optional[List[int]] = None
    CarIdxPaceFlags: Optional[List[int]] = None
    OnPitRoad: Optional[bool] = None
    CarIdxSteer: Optional[List[float]] = None
    CarIdxRPM: Optional[List[float]] = None
    CarIdxGear: Optional[List[int]] = None
    SteeringWheelAngle: Optional[float] = None
    Throttle: Optional[int] = None
    Brake: Optional[float] = None
    Clutch: Optional[int] = None
    Gear: Optional[int] = None
    RPM: Optional[float] = None
    Lap: Optional[int] = None
    LapCompleted: Optional[int] = None
    LapDist: Optional[float] = None
    LapDistPct: Optional[float] = None
    RaceLaps: Optional[int] = None
    LapBestLap: Optional[int] = None
    LapBestLapTime: Optional[float] = None
    LapLastLapTime: Optional[int] = None
    LapCurrentLapTime: Optional[float] = None
    LapLasNLapSeq: Optional[int] = None
    LapLastNLapTime: Optional[int] = None
    LapBestNLapLap: Optional[int] = None
    LapBestNLapTime: Optional[int] = None
    LapDeltaToBestLap: Optional[float] = None
    LapDeltaToBestLap_DD: Optional[float] = None
    LapDeltaToBestLap_OK: Optional[bool] = None
    LapDeltaToOptimalLap: Optional[float] = None
    LapDeltaToOptimalLap_DD: Optional[float] = None
    LapDeltaToOptimalLap_OK: Optional[bool] = None
    LapDeltaToSessionBestLap: Optional[float] = None
    LapDeltaToSessionBestLap_DD: Optional[float] = None
    LapDeltaToSessionBestLap_OK: Optional[bool] = None
    LapDeltaToSessionOptimalLap: Optional[float] = None
    LapDeltaToSessionOptimalLap_DD: Optional[float] = None
    LapDeltaToSessionOptimalLap_OK: Optional[bool] = None
    LapDeltaToSessionLastlLap: Optional[float] = None
    LapDeltaToSessionLastlLap_DD: Optional[float] = None
    LapDeltaToSessionLastlLap_OK: Optional[bool] = None
    Speed: Optional[float] = None
    Yaw: Optional[float] = None
    YawNorth: Optional[float] = None
    Pitch: Optional[float] = None
    Roll: Optional[float] = None
    EnterExitReset: Optional[int] = None
    TrackTemp: Optional[float] = None
    TrackTempCrew: Optional[float] = None
    AirTemp: Optional[float] = None
    WeatherType: Optional[int] = None
    Skies: Optional[int] = None
    AirDensity: Optional[float] = None
    AirPressure: Optional[float] = None
    WindVel: Optional[float] = None
    WindDir: Optional[float] = None
    RelativeHumidity: Optional[float] = None
    FogLevel: Optional[int] = None
    DCLapStatus: Optional[int] = None
    DCDriversSoFar: Optional[int] = None
    OkToReloadTextures: Optional[bool] = None
    LoadNumTextures: Optional[bool] = None
    CarLeftRight: Optional[int] = None
    PitsOpen: Optional[bool] = None
    VidCapEnabled: Optional[bool] = None
    VidCapActive: Optional[bool] = None
    PitRepairLeft: Optional[int] = None
    PitOptRepairLeft: Optional[int] = None
    PitstopActive: Optional[bool] = None
    FastRepairUsed: Optional[int] = None
    FastRepairAvailable: Optional[int] = None
    LFTiresUsed: Optional[int] = None
    RFTiresUsed: Optional[int] = None
    LRTiresUsed: Optional[int] = None
    RRTiresUsed: Optional[int] = None
    LeftTireSetsUsed: Optional[int] = None
    RightTireSetsUsed: Optional[int] = None
    FrontTireSetsUsed: Optional[int] = None
    RearTireSetsUsed: Optional[int] = None
    TireSetsUsed: Optional[int] = None
    LFTiresAvailable: Optional[int] = None
    RFTiresAvailable: Optional[int] = None
    LRTiresAvailable: Optional[int] = None
    RRTiresAvailable: Optional[int] = None
    LeftTireSetsAvailable: Optional[int] = None
    RightTireSetsAvailable: Optional[int] = None
    FrontTireSetsAvailable: Optional[int] = None
    RearTireSetsAvailable: Optional[int] = None
    TireSetsAvailable: Optional[int] = None
    CamCarIdx: Optional[int] = None
    CamCameraNumber: Optional[int] = None
    CamGroupNumber: Optional[int] = None
    CamCameraState: Optional[int] = None
    IsOnTrackCar: Optional[bool] = None
    IsInGarage: Optional[bool] = None
    SteeringWheelPctTorque: Optional[float] = None
    SteeringWheelPctTorqueSign: Optional[float] = None
    SteeringWheelPctTorqueSignStops: Optional[float] = None
    SteeringWheelPctDamper: Optional[float] = None
    SteeringWheelAngleMax: Optional[float] = None
    SteeringWheelLimiter: Optional[int] = None
    ShiftIndicatorPct: Optional[float] = None
    ShiftPowerPct: Optional[int] = None
    ShiftGrindRPM: Optional[int] = None
    ThrottleRaw: Optional[int] = None
    BrakeRaw: Optional[float] = None
    HandbrakeRaw: Optional[int] = None
    SteeringWheelPeakForceNm: Optional[int] = None
    SteeringWheelMaxForceNm: Optional[int] = None
    SteeringWheelUseLinear: Optional[bool] = None
    BrakeABSactive: Optional[bool] = None
    EngineWarnings: Optional[int] = None
    FuelLevel: Optional[float] = None
    FuelLevelPct: Optional[float] = None
    PitSvFlags: Optional[int] = None
    PitSvLFP: Optional[float] = None
    PitSvRFP: Optional[float] = None
    PitSvLRP: Optional[float] = None
    PitSvRRP: Optional[float] = None
    PitSvFuel: Optional[int] = None
    PitSvTireCompound: Optional[int] = None
    CarIdxP2P_Status: Optional[List[bool]] = None
    CarIdxP2P_Count: Optional[List[int]] = None
    ReplayPlaySpeed: Optional[int] = None
    ReplayPlaySlowMotion: Optional[bool] = None
    ReplaySessionTime: Optional[int] = None
    ReplaySessionNum: Optional[int] = None
    TireLF_RumblePitch: Optional[int] = None
    TireRF_RumblePitch: Optional[int] = None
    TireLR_RumblePitch: Optional[int] = None
    TireRR_RumblePitch: Optional[int] = None
    SteeringWheelTorque_ST: Optional[List[float]] = None
    SteeringWheelTorque: Optional[float] = None
    VelocityZ_ST: Optional[List[float]] = None
    VelocityY_ST: Optional[List[float]] = None
    VelocityX_ST: Optional[List[float]] = None
    VelocityZ: Optional[float] = None
    VelocityY: Optional[float] = None
    VelocityX: Optional[float] = None
    YawRate_ST: Optional[List[float]] = None
    PitchRate_ST: Optional[List[float]] = None
    RollRate_ST: Optional[List[float]] = None
    YawRate: Optional[float] = None
    PitchRate: Optional[float] = None
    RollRate: Optional[float] = None
    VertAccel_ST: Optional[List[float]] = None
    LatAccel_ST: Optional[List[float]] = None
    LongAccel_ST: Optional[List[float]] = None
    VertAccel: Optional[float] = None
    LatAccel: Optional[float] = None
    LongAccel: Optional[float] = None
    dcStarter: Optional[bool] = None
    dcToggleWindshieldWipers: Optional[bool] = None
    dcTriggerWindshieldWipers: Optional[bool] = None
    dpRFTireChange: Optional[int] = None
    dpLFTireChange: Optional[int] = None
    dpRRTireChange: Optional[int] = None
    dpLRTireChange: Optional[int] = None
    dpFuelFill: Optional[int] = None
    dpWindshieldTearoff: Optional[int] = None
    dpFuelAddKg: Optional[int] = None
    dpFastRepair: Optional[int] = None
    dcBrakeBias: Optional[float] = None
    dcLaunchRPM: Optional[int] = None
    dpLFTireColdPress: Optional[float] = None
    dpRFTireColdPress: Optional[float] = None
    dpLRTireColdPress: Optional[float] = None
    dpRRTireColdPress: Optional[float] = None
    WaterTemp: Optional[float] = None
    WaterLevel: Optional[int] = None
    FuelPress: Optional[float] = None
    FuelUsePerHour: Optional[float] = None
    OilTemp: Optional[float] = None
    OilPress: Optional[float] = None
    OilLevel: Optional[int] = None
    Voltage: Optional[float] = None
    ManifoldPress: Optional[float] = None
    RFbrakeLinePress: Optional[float] = None
    RFcoldPressure: Optional[float] = None
    RFtempCL: Optional[float] = None
    RFtempCM: Optional[float] = None
    RFtempCR: Optional[float] = None
    RFwearL: Optional[float] = None
    RFwearM: Optional[float] = None
    RFwearR: Optional[float] = None
    LFbrakeLinePress: Optional[float] = None
    LFcoldPressure: Optional[float] = None
    LFtempCL: Optional[float] = None
    LFtempCM: Optional[float] = None
    LFtempCR: Optional[float] = None
    LFwearL: Optional[float] = None
    LFwearM: Optional[float] = None
    LFwearR: Optional[float] = None
    RRbrakeLinePress: Optional[float] = None
    RRcoldPressure: Optional[float] = None
    RRtempCL: Optional[float] = None
    RRtempCM: Optional[float] = None
    RRtempCR: Optional[float] = None
    RRwearL: Optional[float] = None
    RRwearM: Optional[float] = None
    RRwearR: Optional[float] = None
    LRbrakeLinePress: Optional[float] = None
    LRcoldPressure: Optional[float] = None
    LRtempCL: Optional[float] = None
    LRtempCM: Optional[float] = None
    LRtempCR: Optional[float] = None
    LRwearL: Optional[float] = None
    LRwearM: Optional[float] = None
    LRwearR: Optional[float] = None
    RRshockDefl: Optional[float] = None
    RRshockDefl_ST: Optional[List[float]] = None
    RRshockVel: Optional[float] = None
    RRshockVel_ST: Optional[List[float]] = None
    LRshockDefl: Optional[float] = None
    LRshockDefl_ST: Optional[List[float]] = None
    LRshockVel: Optional[float] = None
    LRshockVel_ST: Optional[List[float]] = None
    RFshockDefl: Optional[float] = None
    RFshockDefl_ST: Optional[List[float]] = None
    RFshockVel: Optional[float] = None
    RFshockVel_ST: Optional[List[float]] = None
    LFshockDefl: Optional[float] = None
    LFshockDefl_ST: Optional[List[float]] = None
    LFshockVel: Optional[float] = None
    LFshockVel_ST: Optional[List[float]] = None
    WeekendInfo: Optional[WeekendInfo] = None
    DriverInfo: Optional[DriverInfo] = None
