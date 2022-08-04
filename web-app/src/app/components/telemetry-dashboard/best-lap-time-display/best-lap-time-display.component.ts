import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-best-lap-time-display',
  templateUrl: './best-lap-time-display.component.html',
  styleUrls: ['./best-lap-time-display.component.scss']
})

/**
 * Component to display the session best lap time
 */
export class BestLapTimeDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  bestLapTime: number;

  constructor(
    iracingDataService: IracingDataService
  ) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the best lap time.
   */
   ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!isEmpty(data)) {
            this.bestLapTime = data.LapBestLapTime;
          }
        }
      );
  }
}
