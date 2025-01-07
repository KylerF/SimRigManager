import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { first, Subscription } from 'rxjs';
import { isEmpty } from 'lodash-es';

import { IracingDataService } from 'services/iracing-data.service';

@Component({
    selector: 'app-telemtry-display',
    templateUrl: './telemetry-dashboard.component.html',
    styleUrls: ['./telemetry-dashboard.component.scss'],
    standalone: false
})

/**
 * Dashboard to show real time iRacing data
 */
export class TelemetryDashboardComponent implements OnInit, OnDestroy {
  iracingDataSubscription: Subscription;
  error: string;

  /**
   * Get the current iRacing data status (true if data available, false otherwise)
   */
  get iracingDataAvailable() {
    return this.iracingDataService.getConnectionStatus().pipe(first()) && !this.error;
  }

  /**
   * Inject dependencies and set up a websocket connection
   * to the iRacing stream
   *
   * @param iracingDataService service to stream iRacing data
   * @param renderer render graphics in response to changes
   */
  constructor(private iracingDataService: IracingDataService) {}

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

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe({
      next: (data) => {
        if (isEmpty(data)) {
          this.error = 'No data available';
        } else {
          this.error = null;
        }
      },
    });
  }

  /**
   * Save the drag position of components in the dashboard
   *
   * @param event drag event
   */
  onDragEnded($event: CdkDragEnd) {
    //TODO: save the position of the component
    //console.log($event.source.getFreeDragPosition());
  }
}
