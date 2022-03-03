import { Component } from '@angular/core';
import * as _ from 'lodash';

import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-current-lap-time-display',
  templateUrl: './current-lap-time-display.component.html',
  styleUrls: ['./current-lap-time-display.component.scss']
})

/**
 * Component to show the current lap time
 */
export class CurrentLapTimeDisplayComponent extends BaseTelemetryDisplayComponent {
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
          if (!_.isEmpty(data)) {
            this.currentLapTime = data.LapCurrentLapTime;
          }
        }
      );
  }
}
