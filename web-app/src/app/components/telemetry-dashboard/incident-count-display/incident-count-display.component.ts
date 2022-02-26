import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { IracingDataService } from '../../../services/iracing-data.service';
import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';

@Component({
  selector: 'app-incident-count-display',
  templateUrl: './incident-count-display.component.html',
  styleUrls: ['./incident-count-display.component.scss']
})
export class IncidentCountDisplayComponent extends BaseTelemetryDisplayComponent {
  iracingDataSubscription: Subscription;

  incidentCount: number;
  incidentLimit: string;

  constructor (iracingDataService: IracingDataService)
  {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the speed.
   */
   ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            this.incidentCount = data.PlayerCarMyIncidentCount;
            let incidentLimit = data.WeekendInfo.WeekendOptions.IncidentLimit;

            this.incidentLimit = (incidentLimit == 'unlimited' ? '∞' : incidentLimit);
          }
        }
      );
  }
}
