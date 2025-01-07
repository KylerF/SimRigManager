import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-base-telemetry-display',
  templateUrl: './base-telemetry-display.component.html',
  styleUrls: ['./base-telemetry-display.component.scss'],
  standalone: true,
})

/**
 * The base telemetry display component, which provides a common
 * interface for all telemetry display components.
 */
export class BaseTelemetryDisplayComponent implements OnInit, OnDestroy {
  /**
   * If true, the component will unsubscribe from the websocket
   * connection when destroyed, but will leave the connection open.
   * This is useful when displaying multiple telemetry components
   * on the same page.
   */
  @Input()
  keepAlive: boolean = false;

  protected iracingDataSubscription: Subscription;

  constructor(public iracingDataService: IracingDataService) {}

  /**
   * The component will attempt to start the stream if it is not
   * already running.
   */
  ngOnInit(): void {
    this.iracingDataService.startStream();
  }

  /**
   * Unsubscribe from iRacing data
   */
  ngOnDestroy(): void {
    this.iracingDataSubscription?.unsubscribe();

    if (!this.keepAlive) {
      this.iracingDataService.stopStream();
    }
  }
}

