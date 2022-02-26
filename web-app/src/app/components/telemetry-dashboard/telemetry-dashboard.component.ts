import { Component, OnInit } from '@angular/core';
import { delay, retryWhen, Subscription, tap } from 'rxjs';
import * as _ from 'lodash';

import { IracingDataService } from '../../services/iracing-data.service';

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
          } else {
            this.connected = false;
            this.error = 'No data available';
          }
        },
        error => {
          this.connected = false;
          this.error = error.message;
        }
      );
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
