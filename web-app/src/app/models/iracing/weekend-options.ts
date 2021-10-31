/**
 * Model interface for iRacing weekend options data
 */
export interface WeekendOptions {
    NumStarters: number;
    StartingGrid: string;
    QualifyScoring: string;
    CourseCautions: boolean;
    StandingStart: number;
    ShortParadeLap: number;
    Restarts: string;
    WeatherType: string;
    Skies: string;
    WindDirection: string;
    WindSpeed: string;
    WeatherTemp: string;
    RelativeHumidity: string;
    FogLevel: string;
    TimeOfDay: string;
    Date: string;
    EarthRotationSpeedupFactor: number;
    Unofficial: number;
    CommercialMode: string;
    NightMode: string;
    IsFixedSetup: number;
    StrictLapsChecking: string;
    HasOpenRegistration: number;
    HardcoreLevel: number;
    NumJokerLaps: number;
    IncidentLimit: string;
    FastRepairsLimit: string;
    GreenWhiteCheckeredLimit: number;
}
