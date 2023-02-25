import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-current-lap-time-display',
  templateUrl: './current-lap-time-display.component.html',
  styleUrls: ['./current-lap-time-display.component.scss']
})

/**
 * Component to show the current lap time
 */
export class CurrentLapTimeDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  currentLapTime: number;

  constructor(
    iracingDataService: IracingDataService
  ) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the lap time.
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!isEmpty(data)) {
            this.currentLapTime = data.LapCurrentLapTime;
          }
        }
      );
  }
}
