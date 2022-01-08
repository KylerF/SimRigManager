import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { IracingDataService } from '../../services/iracing-data.service';
import { Constants } from '../../_helpers/constants';
import { IracingDataFrame } from '../../models/iracing/data-frame';
import * as d3 from 'd3';
import { CarImageHelper } from 'src/app/_helpers/car-image-helper';

@Component({
  selector: 'app-real-time-input-display',
  templateUrl: './real-time-input-display.component.html',
  styleUrls: ['./real-time-input-display.component.scss']
})

/**
 * Dashboard to show real time iRacing data
 */
export class RealTimeInputDisplayComponent implements OnInit {
  driverIndex: number;

  eventType: string;
  track: string;
  config: string;
  car: string;

  wheelImage: string;

  speed: number;
  speedUnitMultiplier: number;
  rpm: number;

  wheelAngle: number;
  throttle: number;
  brake: number;
  handBrake: number;
  clutch: number;

  vertAccel: number;
  latAccel: number;
  longAccel: number;

  // Rolling data for charts
  windowSize: number = 300; // last 10 seconds
  throttleHistory: number[];
  brakeHistory: number[];
  clutchHistory: number[];
  speedHistory: number[];
  rpmHistory: number[];

  wsSubscription: Subscription;

  error: string;

  /**
   * Get current speed in selected units
   */
  get currentSpeed() {
    return this.speed * this.speedUnitMultiplier;
  }

  /**
   * Inject dependencies and set up a websocket connection
   * to the iRacing streams
   *
   * @param iracingDataService service to stream iRacing data
   * @param renderer render graphics in response to changes
   */
  constructor(
    private iracingDataService: IracingDataService,
    private renderer: Renderer2
  )
  {
    this.wsSubscription =
      this.iracingDataService.getStream()
       .subscribe(
        data => {
          this.update(data);
        },
        err => {
          this.error = err.message;
        }
      );
  }

  /**
   * Set default parameters on initialization
   */
  ngOnInit(): void {
    this.speedUnitMultiplier = Constants.speedMphMultiplier;
  }

  /**
   * Update dashboard with current data
   *
   * @param jsonData latest frame of data
   */
  update(jsonData: IracingDataFrame) {
    this.driverIndex = jsonData.DriverInfo.DriverCarIdx;

    this.eventType = jsonData.WeekendInfo.EventType;
    this.track = jsonData.WeekendInfo.TrackName;
    this.config = jsonData.WeekendInfo.TrackConfigName;

    let lastCar = this.car;
    this.car = jsonData.DriverInfo.Drivers[this.driverIndex].CarScreenName;
    if ( lastCar !== this.car ) {
      this.wheelImage = CarImageHelper.getImageForCar(this.car);
    }

    this.speed = jsonData.Speed;
    this.rpm = jsonData.RPM;

    this.throttle = jsonData.Throttle;
    this.brake = jsonData.Brake;
    this.handBrake = jsonData.HandbrakeRaw;
    this.clutch = 1 - jsonData.Clutch;

    this.vertAccel = jsonData.VertAccel - Constants.g;
    this.latAccel = jsonData.LatAccel;
    this.longAccel = jsonData.LongAccel;

    this.rotateWheel(jsonData.SteeringWheelAngle);

    // Update chart data
    /*
    this.throttleHistory.push(this.throttle);
    this.brakeHistory.push(this.brake);
    this.clutchHistory.push(this.clutch);
    this.speedHistory.push(this.speed);
    this.rpmHistory.push(this.rpm);

    this.resize(this.throttleHistory);
    this.resize(this.brakeHistory);
    this.resize(this.clutchHistory);
    this.resize(this.speedHistory);
    this.resize(this.rpmHistory);
    */
  }

  /**
   * Shift the array to fit the window size
   *
   * @param data data to shift
   */
  resize(data: number[]) {
    if (data.length > this.windowSize) {
      data.splice(0, data.length - this.windowSize);
    }
  }

  /**
   * Rotate the steering wheel graphic by a given number
   * of radians
   *
   * @param radians angle to rotate wheel
   */
  rotateWheel(radians: number) {
    const image = document.getElementById('wheel');

    this.renderer.setStyle(
      image,
      'transform',
      `rotate(${-radians}rad)`
    )
  }
}
