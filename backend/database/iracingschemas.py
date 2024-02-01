"""
Pydantic schemas for iRacing data
TODO: Can these be generated dynamically? Fields are different depending on
car, and new fields are added often with iRacing updates.
UPDATE: Yes: https://github.com/koxudaxi/datamodel-code-generator
"""
from typing import List, Optional
from pydantic import BaseModel


class WeekendOptions(BaseModel):
    NumStarters: Optional[int] = None
    StartingGrid: Optional[str] = None
    QualifyScoring: Optional[str] = None
    CourseCautions: Optional[bool] = None
    StandingStart: Optional[int] = None
    ShortParadeLap: Optional[int] = None
    Restarts: Optional[str] = None
    WeatherType: Optional[str] = None
    Skies: Optional[str] = None
    WindDirection: Optional[str] = None
    WindSpeed: Optional[str] = None
    WeatherTemp: Optional[str] = None
    RelativeHumidity: Optional[str] = None
    FogLevel: Optional[str] = None
    TimeOfDay: Optional[str] = None
    Date: Optional[str] = None
    EarthRotationSpeedupFactor: Optional[int] = None
    Unofficial: Optional[int] = None
    CommercialMode: Optional[str] = None
    NightMode: Optional[str] = None
    IsFixedSetup: Optional[int] = None
    StrictLapsChecking: Optional[str] = None
    HasOpenRegistration: Optional[int] = None
    HardcoreLevel: Optional[int] = None
    NumJokerLaps: Optional[int] = None
    IncidentLimit: Optional[str] = None
    FastRepairsLimit: Optional[int] = None
    GreenWhiteCheckeredLimit: Optional[int] = None


class TelemetryOptions(BaseModel):
    TelemetryDiskFile: Optional[str] = None


class WeekendInfo(BaseModel):
    TrackName: Optional[str] = None
    TrackID: Optional[int] = None
    TrackLength: Optional[str] = None
    TrackLengthOfficial: Optional[str] = None
    TrackDisplayName: Optional[str] = None
    TrackDisplayShortName: Optional[str] = None
    TrackConfigName: Optional[str] = None
    TrackCity: Optional[str] = None
    TrackCountry: Optional[str] = None
    TrackAltitude: Optional[str] = None
    TrackLatitude: Optional[str] = None
    TrackLongitude: Optional[str] = None
    TrackNorthOffset: Optional[str] = None
    TrackNumTurns: Optional[int] = None
    TrackPitSpeedLimit: Optional[str] = None
    TrackType: Optional[str] = None
    TrackDirection: Optional[str] = None
    TrackWeatherType: Optional[str] = None
    TrackSkies: Optional[str] = None
    TrackSurfaceTemp: Optional[str] = None
    TrackAirTemp: Optional[str] = None
    TrackAirPressure: Optional[str] = None
    TrackWindVel: Optional[str] = None
    TrackWindDir: Optional[str] = None
    TrackRelativeHumidity: Optional[str] = None
    TrackFogLevel: Optional[str] = None
    TrackCleanup: Optional[int] = None
    TrackDynamicTrack: Optional[int] = None
    TrackVersion: Optional[str] = None
    SeriesID: Optional[int] = None
    SeasonID: Optional[int] = None
    SessionID: Optional[int] = None
    SubSessionID: Optional[int] = None
    LeagueID: Optional[int] = None
    Official: Optional[int] = None
    RaceWeek: Optional[int] = None
    EventType: Optional[str] = None
    Category: Optional[str] = None
    SimMode: Optional[str] = None
    TeamRacing: Optional[int] = None
    MinDrivers: Optional[int] = None
    MaxDrivers: Optional[int] = None
    DCRuleSet: Optional[str] = None
    QualifierMustStartRace: Optional[int] = None
    NumCarClasses: Optional[int] = None
    NumCarTypes: Optional[int] = None
    HeatRacing: Optional[int] = None
    BuildType: Optional[str] = None
    BuildTarget: Optional[str] = None
    BuildVersion: Optional[str] = None
    WeekendOptions: WeekendOptions
    TelemetryOptions: TelemetryOptions


class Driver(BaseModel):
    CarIdx: Optional[int] = None
    UserName: Optional[str] = None
    AbbrevName: Optional[str] = None
    Initials: Optional[str] = None
    UserID: Optional[int] = None
    TeamID: Optional[int] = None
    TeamName: Optional[str] = None
    CarNumber: Optional[str] = None
    CarNumberRaw: Optional[int] = None
    CarPath: Optional[str] = None
    CarClassID: Optional[int] = None
    CarID: Optional[int] = None
    CarIsElectric: Optional[int] = None
    CarIsPaceCar: Optional[int] = None
    CarIsAI: Optional[int] = None
    CarScreenName: Optional[str] = None
    CarScreenNameShort: Optional[str] = None
    CarClassShortName: Optional[str] = None
    CarClassRelSpeed: Optional[int] = None
    CarClassLicenseLevel: Optional[int] = None
    CarClassMaxFuelPct: Optional[str] = None
    CarClassWeightPenalty: Optional[str] = None
    CarClassPowerAdjust: Optional[str] = None
    CarClassDryTireSetLimit: Optional[str] = None
    CarClassColor: Optional[int] = None
    CarClassEstLapTime: Optional[float] = None
    IRating: Optional[int] = None
    LicLevel: Optional[int] = None
    LicSubLevel: Optional[int] = None
    LicString: Optional[str] = None
    LicColor: Optional[int] = None
    IsSpectator: Optional[int] = None
    CarDesignStr: Optional[str] = None
    HelmetDesignStr: Optional[str] = None
    SuitDesignStr: Optional[str] = None
    CarNumberDesignStr: Optional[str] = None
    CarSponsor_1: Optional[int] = None
    CarSponsor_2: Optional[int] = None
    ClubName: Optional[str] = None
    ClubID: Optional[int] = None
    DivisionName: Optional[str] = None
    DivisionID: Optional[int] = None
    CurDriverIncidentCount: Optional[int] = None
    TeamIncidentCount: Optional[int] = None


class DriverInfo(BaseModel):
    DriverCarIdx: Optional[int] = None
    DriverUserID: Optional[int] = None
    PaceCarIdx: Optional[int] = None
    DriverHeadPosX: Optional[float] = None
    DriverHeadPosY: Optional[float] = None
    DriverHeadPosZ: Optional[float] = None
    DriverCarIsElectric: Optional[int] = None
    DriverCarIdleRPM: Optional[float] = None
    DriverCarRedLine: Optional[int] = None
    DriverCarEngCylinderCount: Optional[int] = None
    DriverCarFuelKgPerLtr: Optional[float] = None
    DriverCarFuelMaxLtr: Optional[float] = None
    DriverCarMaxFuelPct: Optional[float] = None
    DriverCarGearNumForward: Optional[int] = None
    DriverCarGearNeutral: Optional[int] = None
    DriverCarGearReverse: Optional[int] = None
    DriverCarSLFirstRPM: Optional[int] = None
    DriverCarSLShiftRPM: Optional[int] = None
    DriverCarSLLastRPM: Optional[int] = None
    DriverCarSLBlinkRPM: Optional[int] = None
    DriverCarVersion: Optional[str] = None
    DriverPitTrkPct: Optional[float] = None
    DriverCarEstLapTime: Optional[float] = None
    DriverSetupName: Optional[str] = None
    DriverSetupIsModified: Optional[int] = None
    DriverSetupLoadTypeName: Optional[str] = None
    DriverSetupPassedTech: Optional[int] = None
    DriverIncidentCount: Optional[int] = None
    Drivers: Optional[List[Driver]] = None


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
    ChanClockSkew: Optional[float] = None
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
    Throttle: Optional[float] = None
    Brake: Optional[float] = None
    Clutch: Optional[float] = None
    Gear: Optional[int] = None
    RPM: Optional[float] = None
    Lap: Optional[int] = None
    LapCompleted: Optional[int] = None
    LapDist: Optional[float] = None
    LapDistPct: Optional[float] = None
    RaceLaps: Optional[int] = None
    LapBestLap: Optional[int] = None
    LapBestLapTime: Optional[float] = None
    LapLastLapTime: Optional[float] = None
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
    SteeringWheelLimiter: Optional[float] = None
    ShiftIndicatorPct: Optional[float] = None
    ShiftPowerPct: Optional[float] = None
    ShiftGrindRPM: Optional[int] = None
    ThrottleRaw: Optional[float] = None
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
    PitSvFuel: Optional[float] = None
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
    dpFuelAddKg: Optional[float] = None
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
