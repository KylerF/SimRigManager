import { LapTimeQueryParams } from './lap-time-filter-params';
import { Driver } from './driver';

/**
 * Model interface for a single lap time record
 */
export interface LapTime {
  id: number;
  driver: Driver;
  car: string;
  trackName: string;
  trackConfig: string;
  time: number;
  setAt: Date;
}

/**
 * State containing a list of lap times and the requested filter parameters
 */
export interface LapTimeState {
  laptimes: LapTime[];
  filterParams: LapTimeQueryParams;
}
