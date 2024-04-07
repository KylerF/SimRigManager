import { TelemetryOptions } from './telemetry-options';
import { WeekendOptions } from './weekend-options';

/**
 * Model interface for iRacing weekend info data
 */
export interface WeekendInfo {
  TrackName?: string;
  TrackID?: number;
  TrackLength?: string;
  TrackDisplayName?: string;
  TrackDisplayShortName?: string;
  TrackConfigName?: string;
  TrackCity?: string;
  TrackCountry?: string;
  TrackAltitude?: string;
  TrackLatitude?: string;
  TrackLongitude?: string;
  TrackNorthOffset?: string;
  TrackNumTurns?: number;
  TrackPitSpeedLimit?: string;
  TrackType?: string;
  TrackDirection?: string;
  TrackWeatherType?: string;
  TrackSkies?: string;
  TrackSurfaceTemp?: string;
  TrackAirTemp?: string;
  TrackAirPressure?: string;
  TrackWindVel?: string;
  TrackWindDir?: string;
  TrackRelativeHumidity?: string;
  TrackFogLevel?: number;
  TrackCleanup?: number;
  TrackDynamicTrack?: number;
  TrackVersion?: string;
  SeriesID?: number;
  SeasonID?: number;
  SessionID?: number;
  SubSessionID?: number;
  LeagueID?: number;
  Official?: number;
  RaceWeek?: number;
  EventType?: string;
  Category?: string;
  SimMode?: string;
  TeamRacing?: number;
  MinDrivers?: number;
  MaxDrivers?: number;
  DCRuleSet?: string;
  QualifierMustStartRace?: number;
  NumCarClasses?: number;
  NumCarTypes?: number;
  HeatRacing?: number;
  BuildType?: string;
  BuildTarget?: string;
  BuildVersion?: string;
  WeekendOptions?: WeekendOptions;
  TelemetryOptions?: TelemetryOptions;
}
