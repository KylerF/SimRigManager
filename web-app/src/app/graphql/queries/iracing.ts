/**
 * Static queries used throughout the application. These are used when we know
 * what data is needed ahead of time. For the customizable telemetry dashboard,
 * queries must be created dynamically.
 */
import { gql } from 'apollo-angular'

export const SUBSCRIBE_TO_WEEKEND_INFO = gql`
  subscription weekendInfo {
    iracing {
      WeekendInfo {
        EventType
        TrackDisplayName
      }
      SessionTime
    }
  }
`
