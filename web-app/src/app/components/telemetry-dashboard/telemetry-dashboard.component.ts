import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, retryWhen, Subscription, tap } from 'rxjs';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-telemtry-display',
  templateUrl: './telemetry-dashboard.component.html',
  styleUrls: ['./telemetry-dashboard.component.scss']
})

/**
 * Dashboard to show real time iRacing data
 */
export class TelemetryDashboardComponent implements OnInit, OnDestroy {
  iracingDataSubscription: Subscription;
  connected: boolean;

  error: string;

  /**
   * Get the current iRacing data status (true if data available, false otherwise)
   */
  get iracingDataAvailable() {
    return this.connected && !this.error;
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
          this.connected = true;

          if (_.isEmpty(response)) {
            this.error = 'No data available';
          } else {
            this.error = null;
          }
        },
        error => {
          this.connected = false;
          this.error = error.message;
        }
      );
  }

  /**
   * Save the drag position of components in the dashboard
   *
   * @param event drag event
   */
  onDragEnded($event: CdkDragEnd) {
    console.log($event.source.getFreeDragPosition());
  }
}
