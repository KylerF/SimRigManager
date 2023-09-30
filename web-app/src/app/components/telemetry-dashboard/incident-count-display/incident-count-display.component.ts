import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-incident-count-display',
  templateUrl: './incident-count-display.component.html',
  styleUrls: ['./incident-count-display.component.scss'],
})

/**
 * Component to show the current incident count / maximum incident count
 */
export class IncidentCountDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  incidentCount: number;
  incidentLimit: string;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the speed.
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        this.incidentCount = data.PlayerCarMyIncidentCount;
        let incidentLimit = data.WeekendInfo.WeekendOptions.IncidentLimit;

        this.incidentLimit = incidentLimit == 'unlimited' ? '∞' : incidentLimit;
      }
    });
  }
}
