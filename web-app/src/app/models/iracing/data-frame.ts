import { DriverInfo } from "./driver-info";
import { WeekendInfo } from "./weekend-info";

/**
 * Model interface for a single frame of iRacing data streamed from the API
 * https://github.com/kutu/pyirsdk/blob/master/vars.txt
 */
 export interface IracingDataFrame {
    SessionTime: number;
    SessionTick: number;
    SessionNum: number;
    SessionState: number;
    SessionUniqueID: number;
    SessionFlags: number;
    SessionTimeRemain: number;
    SessionLapsRemain: number;
    SessionLapsRemainEx: number;
    SessionTimeTotal: number;
    SessionLapsTotal: number;
    SessionTimeOfDay: number;
    RadioTransmitCarIdx: number;
    RadioTransmitRadioIdx: number;
    RadioTransmitFrequencyIdx: number;
    DisplayUnits: number;
    DriverMarker: boolean;
    PushToPass: boolean;
    ManualBoost: boolean;
    ManualNoBoost: boolean;
    IsOnTrack: boolean;
    IsReplayPlaying: boolean;
    ReplayFrameNum: number;
    ReplayFrameNumEnd: number;
    IsDiskLoggingEnabled: boolean;
    IsDiskLoggingActive: boolean;
    FrameRate: number;
    CpuUsageFG: number;
    GpuUsage: number;
    ChanAvgLatency: number;
    ChanLatency: number;
    ChanQuality: number;
    ChanPartnerQuality: number;
    CpuUsageBG: number;
    ChanClockSkew: number;
    MemPageFaultSec: number;
    PlayerCarPosition: number;
    PlayerCarClassPosition: number;
    PlayerCarClass: number;
    PlayerTrackSurface: number;
    PlayerTrackSurfaceMaterial: number;
    PlayerCarIdx: number;
    PlayerCarTeamIncidentCount: number;
    PlayerCarMyIncidentCount: number;
    PlayerCarDriverIncidentCount: number;
    PlayerCarWeightPenalty: number;
    PlayerCarPowerAdjust: number;
    PlayerCarDryTireSetLimit: number;
    PlayerCarTowTime: number;
    PlayerCarInPitStall: boolean;
    PlayerCarPitSvStatus: number;
    PlayerTireCompound: number;
    PlayerFastRepairsUsed: number;
    CarIdxLap: number[];
    CarIdxLapCompleted: number[];
    CarIdxLapDistPct: number[];
    CarIdxTrackSurface: number[];
    CarIdxTrackSurfaceMaterial: number[];
    CarIdxOnPitRoad: boolean[];
    CarIdxPosition: number[];
    CarIdxClassPosition: number[];
    CarIdxClass: number[];
    CarIdxF2Time: number[];
    CarIdxEstTime: number[];
    CarIdxLastLapTime: number[];
    CarIdxBestLapTime: number[];
    CarIdxBestLapNum: number[];
    CarIdxTireCompound: number[];
    CarIdxQualTireCompound: number[];
    CarIdxQualTireCompoundLocked: boolean[];
    CarIdxFastRepairsUsed: number[];
    PaceMode: number;
    CarIdxPaceLine: number[];
    CarIdxPaceRow: number[];
    CarIdxPaceFlags: number[];
    OnPitRoad: boolean;
    CarIdxSteer: number[];
    CarIdxRPM: number[];
    CarIdxGear: number[];
    SteeringWheelAngle: number;
    Throttle: number;
    Brake: number;
    Clutch: number;
    Gear: number;
    RPM: number;
    Lap: number;
    LapCompleted: number;
    LapDist: number;
    LapDistPct: number;
    RaceLaps: number;
    LapBestLap: number;
    LapBestLapTime: number;
    LapLastLapTime: number;
    LapCurrentLapTime: number;
    LapLasNLapSeq: number;
    LapLastNLapTime: number;
    LapBestNLapLap: number;
    LapBestNLapTime: number;
    LapDeltaToBestLap: number;
    LapDeltaToBestLap_DD: number;
    LapDeltaToBestLap_OK: boolean;
    LapDeltaToOptimalLap: number;
    LapDeltaToOptimalLap_DD: number;
    LapDeltaToOptimalLap_OK: boolean;
    LapDeltaToSessionBestLap: number;
    LapDeltaToSessionBestLap_DD: number;
    LapDeltaToSessionBestLap_OK: boolean;
    LapDeltaToSessionOptimalLap: number;
    LapDeltaToSessionOptimalLap_DD: number;
    LapDeltaToSessionOptimalLap_OK: boolean;
    LapDeltaToSessionLastlLap: number;
    LapDeltaToSessionLastlLap_DD: number;
    LapDeltaToSessionLastlLap_OK: boolean;
    Speed: number;
    Yaw: number;
    YawNorth: number;
    Pitch: number;
    Roll: number;
    EnterExitReset: number;
    TrackTemp: number;
    TrackTempCrew: number;
    AirTemp: number;
    WeatherType: number;
    Skies: number;
    AirDensity: number;
    AirPressure: number;
    WindVel: number;
    WindDir: number;
    RelativeHumidity: number;
    FogLevel: number;
    DCLapStatus: number;
    DCDriversSoFar: number;
    OkToReloadTextures: boolean;
    LoadNumTextures: boolean;
    CarLeftRight: number;
    PitsOpen: boolean;
    VidCapEnabled: boolean;
    VidCapActive: boolean;
    PitRepairLeft: number;
    PitOptRepairLeft: number;
    PitstopActive: boolean;
    FastRepairUsed: number;
    FastRepairAvailable: number;
    LFTiresUsed: number;
    RFTiresUsed: number;
    LRTiresUsed: number;
    RRTiresUsed: number;
    LeftTireSetsUsed: number;
    RightTireSetsUsed: number;
    FrontTireSetsUsed: number;
    RearTireSetsUsed: number;
    TireSetsUsed: number;
    LFTiresAvailable: number;
    RFTiresAvailable: number;
    LRTiresAvailable: number;
    RRTiresAvailable: number;
    LeftTireSetsAvailable: number;
    RightTireSetsAvailable: number;
    FrontTireSetsAvailable: number;
    RearTireSetsAvailable: number;
    TireSetsAvailable: number;
    CamCarIdx: number;
    CamCameraNumber: number;
    CamGroupNumber: number;
    CamCameraState: number;
    IsOnTrackCar: boolean;
    IsInGarage: boolean;
    SteeringWheelPctTorque: number;
    SteeringWheelPctTorqueSign: number;
    SteeringWheelPctTorqueSignStops: number;
    SteeringWheelPctDamper: number;
    SteeringWheelAngleMax: number;
    SteeringWheelLimiter: number;
    ShiftIndicatorPct: number;
    ShiftPowerPct: number;
    ShiftGrindRPM: number;
    ThrottleRaw: number;
    BrakeRaw: number;
    HandbrakeRaw: number;
    SteeringWheelPeakForceNm: number;
    BrakeABSactive: boolean;
    EngineWarnings: number;
    FuelLevel: number;
    FuelLevelPct: number;
    PitSvFlags: number;
    PitSvLFP: number;
    PitSvRFP: number;
    PitSvLRP: number;
    PitSvRRP: number;
    PitSvFuel: number;
    PitSvTireCompound: number;
    CarIdxP2P_Status: boolean[];
    CarIdxP2P_Count: number[];
    ReplayPlaySpeed: number;
    ReplayPlaySlowMotion: boolean;
    ReplaySessionTime: number;
    ReplaySessionNum: number;
    TireLF_RumblePitch: number;
    TireRF_RumblePitch: number;
    TireLR_RumblePitch: number;
    TireRR_RumblePitch: number;
    SteeringWheelTorque_ST: number[];
    SteeringWheelTorque: number;
    VelocityZ_ST: number[];
    VelocityY_ST: number[];
    VelocityX_ST: number[];
    VelocityZ: number;
    VelocityY: number;
    VelocityX: number;
    YawRate_ST: number[];
    PitchRate_ST: number[];
    RollRate_ST: number[];
    YawRate: number;
    PitchRate: number;
    RollRate: number;
    VertAccel_ST: number[];
    LatAccel_ST: number[];
    LongAccel_ST: number[];
    VertAccel: number;
    LatAccel: number;
    LongAccel: number;
    dcStarter: boolean;
    dcToggleWindshieldWipers: boolean;
    dcTriggerWindshieldWipers: boolean;
    dpRFTireChange: number;
    dpLFTireChange: number;
    dpRRTireChange: number;
    dpLRTireChange: number;
    dpFuelFill: number;
    dpWindshieldTearoff: number;
    dpFuelAddKg: number;
    dpFastRepair: number;
    dcBrakeBias: number;
    dcLaunchRPM: number;
    dpLFTireColdPress: number;
    dpRFTireColdPress: number;
    dpLRTireColdPress: number;
    dpRRTireColdPress: number;
    WaterTemp: number;
    WaterLevel: number;
    FuelPress: number;
    FuelUsePerHour: number;
    OilTemp: number;
    OilPress: number;
    OilLevel: number;
    Voltage: number;
    ManifoldPress: number;
    RFbrakeLinePress: number;
    RFcoldPressure: number;
    RFtempCL: number;
    RFtempCM: number;
    RFtempCR: number;
    RFwearL: number;
    RFwearM: number;
    RFwearR: number;
    LFbrakeLinePress: number;
    LFcoldPressure: number;
    LFtempCL: number;
    LFtempCM: number;
    LFtempCR: number;
    LFwearL: number;
    LFwearM: number;
    LFwearR: number;
    RRbrakeLinePress: number;
    RRcoldPressure: number;
    RRtempCL: number;
    RRtempCM: number;
    RRtempCR: number;
    RRwearL: number;
    RRwearM: number;
    RRwearR: number;
    LRbrakeLinePress: number;
    LRcoldPressure: number;
    LRtempCL: number;
    LRtempCM: number;
    LRtempCR: number;
    LRwearL: number;
    LRwearM: number;
    LRwearR: number;
    RRshockDefl: number;
    RRshockDefl_ST: number[];
    RRshockVel: number;
    RRshockVel_ST: number[];
    LRshockDefl: number;
    LRshockDefl_ST: number[];
    LRshockVel: number;
    LRshockVel_ST: number[];
    RFshockDefl: number;
    RFshockDefl_ST: number[];
    RFshockVel: number;
    RFshockVel_ST: number[];
    LFshockDefl: number;
    LFshockDefl_ST: number[];
    LFshockVel: number;
    LFshockVel_ST: number[];
    DriverInfo: DriverInfo;
    WeekendInfo: WeekendInfo;
}
