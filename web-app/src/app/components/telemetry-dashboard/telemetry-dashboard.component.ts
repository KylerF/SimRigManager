import { Component, OnInit, Renderer2 } from '@angular/core';
import { delay, retryWhen, Subscription, tap } from 'rxjs';
import { IracingDataService } from '../../services/iracing-data.service';
import { Constants } from '../../_helpers/constants';
import { IracingDataFrame } from '../../models/iracing/data-frame';
import * as _ from 'lodash';

@Component({
  selector: 'app-telemtry-display',
  templateUrl: './telemetry-dashboard.component.html',
  styleUrls: ['./telemetry-dashboard.component.scss']
})

/**
 * Dashboard to show real time iRacing data
 */
export class TelemetryDashboardComponent implements OnInit {
  iracingDataSubscription: Subscription;
  connected: boolean;

  eventType: string;
  track: string;
  config: string;

  rpm: number;

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

  error: string;

  /**
   * Get the current iRacing data status (true if data available, false otherwise)
   */
  get iracingDataAvailable() {
    return this.connected;
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
  )
  { }

  /**
   * Start updating the dashboard with the latest iRacing data
   */
  ngOnInit(): void {
    this.subscribeToIracingData();
  }

  /**
   * Destroy the websocket connection when the component is destroyed
   */
  ngOnDestroy(): void {
    this.iracingDataSubscription.unsubscribe();
    this.iracingDataService.stopStream();
  }

  /**
   * Subscribe to the iRacing data stream
   */
  subscribeToIracingData() {
    this.iracingDataService.startStream();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .pipe(
        retryWhen(error => error.pipe(
          tap(err => {
            this.connected = false;
            this.error = err.message;
          }),
          delay(3000)
        ))
      )
      .subscribe(
        response => {
          if (!_.isEmpty(response)) {
            this.connected = true;
            this.update(response);
          } else {
            this.connected = false;
            this.error = 'No data available';
          }
        }
      );
  }

  /**
   * Update dashboard with current data
   *
   * @param jsonData latest frame of data
   */
  update(jsonData: IracingDataFrame) {
    if (this.iracingDataSubscription.closed) {
      this.connected = false;
      return;
    }

    this.eventType = jsonData.WeekendInfo.EventType;
    this.track = jsonData.WeekendInfo.TrackDisplayName;
    this.config = jsonData.WeekendInfo.TrackConfigName;

    this.rpm = jsonData.RPM;

    this.vertAccel = jsonData.VertAccel - Constants.g;
    this.latAccel = jsonData.LatAccel;
    this.longAccel = jsonData.LongAccel;

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
}
