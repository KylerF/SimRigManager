"""
Pydantic schemas for iRacing data
#TODO: Can these be generated dynamically? Fields are different depending on
car, and new fields are added often with iRacing updates.
"""
from typing import List, Optional
from pydantic import BaseModel


class WeekendOptions(BaseModel):
    NumStarters: Optional[int]
    StartingGrid: Optional[str]
    QualifyScoring: Optional[str]
    CourseCautions: Optional[bool]
    StandingStart: Optional[int]
    ShortParadeLap: Optional[int]
    Restarts: Optional[str]
    WeatherType: Optional[str]
    Skies: Optional[str]
    WindDirection: Optional[str]
    WindSpeed: Optional[str]
    WeatherTemp: Optional[str]
    RelativeHumidity: Optional[str]
    FogLevel: Optional[str]
    TimeOfDay: Optional[str]
    Date: Optional[str]
    EarthRotationSpeedupFactor: Optional[int]
    Unofficial: Optional[int]
    CommercialMode: Optional[str]
    NightMode: Optional[str]
    IsFixedSetup: Optional[int]
    StrictLapsChecking: Optional[str]
    HasOpenRegistration: Optional[int]
    HardcoreLevel: Optional[int]
    NumJokerLaps: Optional[int]
    IncidentLimit: Optional[str]
    FastRepairsLimit: Optional[str]
    GreenWhiteCheckeredLimit: Optional[int]


class TelemetryOptions(BaseModel):
    TelemetryDiskFile: Optional[str]


class WeekendInfo(BaseModel):
    TrackName: Optional[str]
    TrackID: Optional[int]
    TrackLength: Optional[str]
    TrackLengthOfficial: Optional[str]
    TrackDisplayName: Optional[str]
    TrackDisplayShortName: Optional[str]
    TrackConfigName: Optional[str]
    TrackCity: Optional[str]
    TrackCountry: Optional[str]
    TrackAltitude: Optional[str]
    TrackLatitude: Optional[str]
    TrackLongitude: Optional[str]
    TrackNorthOffset: Optional[str]
    TrackNumTurns: Optional[int]
    TrackPitSpeedLimit: Optional[str]
    TrackType: Optional[str]
    TrackDirection: Optional[str]
    TrackWeatherType: Optional[str]
    TrackSkies: Optional[str]
    TrackSurfaceTemp: Optional[str]
    TrackAirTemp: Optional[str]
    TrackAirPressure: Optional[str]
    TrackWindVel: Optional[str]
    TrackWindDir: Optional[str]
    TrackRelativeHumidity: Optional[str]
    TrackFogLevel: Optional[str]
    TrackCleanup: Optional[int]
    TrackDynamicTrack: Optional[int]
    TrackVersion: Optional[str]
    SeriesID: Optional[int]
    SeasonID: Optional[int]
    SessionID: Optional[int]
    SubSessionID: Optional[int]
    LeagueID: Optional[int]
    Official: Optional[int]
    RaceWeek: Optional[int]
    EventType: Optional[str]
    Category: Optional[str]
    SimMode: Optional[str]
    TeamRacing: Optional[int]
    MinDrivers: Optional[int]
    MaxDrivers: Optional[int]
    DCRuleSet: Optional[str]
    QualifierMustStartRace: Optional[int]
    NumCarClasses: Optional[int]
    NumCarTypes: Optional[int]
    HeatRacing: Optional[int]
    BuildType: Optional[str]
    BuildTarget: Optional[str]
    BuildVersion: Optional[str]
    WeekendOptions: WeekendOptions
    TelemetryOptions: TelemetryOptions


class Driver(BaseModel):
    CarIdx: Optional[int]
    UserName: Optional[str]
    AbbrevName: Optional[str]
    Initials: Optional[str]
    UserID: Optional[int]
    TeamID: Optional[int]
    TeamName: Optional[str]
    CarNumber: Optional[str]
    CarNumberRaw: Optional[int]
    CarPath: Optional[str]
    CarClassID: Optional[int]
    CarID: Optional[int]
    CarIsElectric: Optional[int]
    CarIsPaceCar: Optional[int]
    CarIsAI: Optional[int]
    CarScreenName: Optional[str]
    CarScreenNameShort: Optional[str]
    CarClassShortName: Optional[str]
    CarClassRelSpeed: Optional[int]
    CarClassLicenseLevel: Optional[int]
    CarClassMaxFuelPct: Optional[str]
    CarClassWeightPenalty: Optional[str]
    CarClassPowerAdjust: Optional[str]
    CarClassDryTireSetLimit: Optional[str]
    CarClassColor: Optional[int]
    CarClassEstLapTime: Optional[float]
    IRating: Optional[int]
    LicLevel: Optional[int]
    LicSubLevel: Optional[int]
    LicString: Optional[str]
    LicColor: Optional[str]
    IsSpectator: Optional[int]
    CarDesignStr: Optional[str]
    HelmetDesignStr: Optional[str]
    SuitDesignStr: Optional[str]
    CarNumberDesignStr: Optional[str]
    CarSponsor_1: Optional[int]
    CarSponsor_2: Optional[int]
    ClubName: Optional[str]
    ClubID: Optional[int]
    DivisionName: Optional[str]
    DivisionID: Optional[int]
    CurDriverIncidentCount: Optional[int]
    TeamIncidentCount: Optional[int]


class DriverInfo(BaseModel):
    DriverCarIdx: Optional[int]
    DriverUserID: Optional[int]
    PaceCarIdx: Optional[int]
    DriverHeadPosX: Optional[float]
    DriverHeadPosY: Optional[int]
    DriverHeadPosZ: Optional[float]
    DriverCarIsElectric: Optional[int]
    DriverCarIdleRPM: Optional[int]
    DriverCarRedLine: Optional[int]
    DriverCarEngCylinderCount: Optional[int]
    DriverCarFuelKgPerLtr: Optional[float]
    DriverCarFuelMaxLtr: Optional[int]
    DriverCarMaxFuelPct: Optional[int]
    DriverCarGearNumForward: Optional[int]
    DriverCarGearNeutral: Optional[int]
    DriverCarGearReverse: Optional[int]
    DriverCarSLFirstRPM: Optional[int]
    DriverCarSLShiftRPM: Optional[int]
    DriverCarSLLastRPM: Optional[int]
    DriverCarSLBlinkRPM: Optional[int]
    DriverCarVersion: Optional[str]
    DriverPitTrkPct: Optional[float]
    DriverCarEstLapTime: Optional[float]
    DriverSetupName: Optional[str]
    DriverSetupIsModified: Optional[int]
    DriverSetupLoadTypeName: Optional[str]
    DriverSetupPassedTech: Optional[int]
    DriverIncidentCount: Optional[int]
    Drivers: Optional[List[Driver]]


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
    SessionOnJokerLap: Optional[int] = None
    SessionJokerLapsRemain: Optional[int] = None
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
    ChanAvgLatency: Optional[float] = None
    ChanLatency: Optional[float] = None
    ChanQuality: Optional[float] = None
    ChanPartnerQuality: Optional[int] = None
    CpuUsageBG: Optional[float] = None
    ChanClockSkew: Optional[int] = None
    MemPageFaultSec: Optional[int] = None
    MemSoftPageFaultSec: Optional[float] = None
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
    CarIdxSessionFlags: Optional[List[int]] = None
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
    SolarAltitude: Optional[float] = None
    SolarAzimuth: Optional[float] = None
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
    SteeringWheelMaxForceNm: Optional[float] = None
    SteeringWheelUseLinear: Optional[bool] = None
    BrakeABSactive: Optional[bool] = None
    EngineWarnings: Optional[int] = None
    Engine0_RPM: Optional[float] = None
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
    ReplaySessionTime: Optional[float] = None
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
    dcDRSToggle: Optional[bool] = None
    DRS_Status: Optional[int] = None
    dcPitSpeedLimiterToggle: Optional[bool] = None
    dpWingFront: Optional[float] = None
    dcBrakeBias: Optional[float] = None
    dcBrakeBiasFine: Optional[float] = None
    dcPeakBrakeBias: Optional[float] = None
    dcEngineBraking: Optional[float] = None
    dcBrakeMisc: Optional[float] = None
    dcTearOffVisor: Optional[bool] = None
    dcToggleWindshieldWipers: Optional[bool] = None
    dcTriggerWindshieldWipers: Optional[bool] = None
    dcDashPage: Optional[int] = None
    dcMGUKDeployMode: Optional[float] = None
    dcDiffEntry: Optional[float] = None
    dcDiffMiddle: Optional[float] = None
    dcDiffExit: Optional[float] = None
    dpTireChange: Optional[bool] = None
    dpRFTireChange: Optional[int] = None
    dpLFTireChange: Optional[int] = None
    dpRRTireChange: Optional[int] = None
    dpLRTireChange: Optional[int] = None
    dpFuelFill: Optional[int] = None
    dpWindshieldTearoff: Optional[int] = None
    dpFuelAddKg: Optional[int] = None
    dpFastRepair: Optional[int] = None
    dcAntiRollFront: Optional[int] = None
    dcAntiRollRear: Optional[int] = None
    dcBrakeBias: Optional[float] = None
    dcThrottleShape: Optional[int] = None
    dcLaunchRPM: Optional[int] = None
    dpLFTireColdPress: Optional[float] = None
    dpRFTireColdPress: Optional[float] = None
    dpLRTireColdPress: Optional[float] = None
    dpRRTireColdPress: Optional[float] = None
    WaterTemp: Optional[float] = None
    WaterLevel: Optional[float] = None
    FuelPress: Optional[float] = None
    FuelUsePerHour: Optional[float] = None
    OilTemp: Optional[float] = None
    OilPress: Optional[float] = None
    OilLevel: Optional[int] = None
    Voltage: Optional[float] = None
    ManifoldPress: Optional[float] = None
    PowerMGU_K: Optional[float] = None
    TorqueMGU_K: Optional[float] = None
    PowerMGU_H: Optional[float] = None
    EnergyERSBattery: Optional[float] = None
    EnergyERSBatteryPct: Optional[float] = None
    EnergyBatteryToMGU_KLap: Optional[float] = None
    EnergyMGU_KLapDeployPct: Optional[float] = None
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
    ROLLFshockDefl: Optional[float] = None
    ROLLFshockDefl_ST: Optional[List[float]] = None
    ROLLRshockDefl: Optional[float] = None
    ROLLRshockDefl_ST: Optional[List[float]] = None
    ROLLFshockVel: Optional[float] = None
    ROLLFshockVel_ST: Optional[List[float]] = None
    ROLLRshockVel: Optional[float] = None
    ROLLRshockVel_ST: Optional[List[float]] = None
    CFshockDefl: Optional[float] = None
    CFshockDefl_ST: Optional[List[float]] = None
    CFshockVel: Optional[float] = None
    CFshockVel_ST: Optional[List[float]] = None
    CRshockDefl: Optional[float] = None
    CRshockDefl_ST: Optional[List[float]] = None
    CRshockVel: Optional[float] = None
    CRshockVel_ST: Optional[List[float]] = None
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
    WeekendInfo: Optional[WeekendInfo]
    DriverInfo: Optional[DriverInfo]
