import { Driver } from "./driver";

/**
 * Model interface for a single lap time record
 */
export interface LapTime {
    driver: Driver;
    car: String;
    trackName: String;
    trackConfig: String;
    time: Number;
    setAt: Date;
}
