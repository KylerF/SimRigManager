import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
    selector: 'app-fuel-level-display',
    templateUrl: './fuel-level-display.component.html',
    styleUrls: ['./fuel-level-display.component.scss'],
    standalone: false
})

/**
 * Component to display the current fuel level
 */
export class FuelLevelDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  fuelLevel: number;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the fuel level.
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        this.fuelLevel = data.FuelLevel;
      }
    });
  }
}
