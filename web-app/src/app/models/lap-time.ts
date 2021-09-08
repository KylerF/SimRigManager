import { Driver } from "./driver";

/**
 * Model interface for a single lap time record
 */
export interface LapTime {
    driver: Driver;
    car: string;
    trackName: string;
    trackConfig: string;
    time: number;
    setAt: Date;
}
