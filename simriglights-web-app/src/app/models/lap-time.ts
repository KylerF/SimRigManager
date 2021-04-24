import { Driver } from "./driver";

export interface LapTime {
    driver: Driver;
    car: String;
    trackName: String;
    trackConfig: String;
    time: Number;
    setAt: Date;
}
