import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-lap-count-display',
  templateUrl: './lap-count-display.component.html',
  styleUrls: ['./lap-count-display.component.scss'],
})
/**
 * Component to show the current session lap count
 */
export class LapCountDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  lapCount: number;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the lap count.
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        this.lapCount = data.Lap;
      }
    });
  }
}
