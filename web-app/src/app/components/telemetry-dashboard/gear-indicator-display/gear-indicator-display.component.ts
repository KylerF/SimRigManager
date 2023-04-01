import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-gear-indicator-display',
  templateUrl: './gear-indicator-display.component.html',
  styleUrls: ['./gear-indicator-display.component.scss'],
})

/**
 * Component to display the current gear
 */
export class GearIndicatorDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  gear: number | string;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        let newGear: number = data.Gear;

        switch (newGear) {
          case 0:
            this.gear = 'N';
            break;
          case -1:
            this.gear = 'R';
            break;
          default:
            this.gear = newGear;
        }
      }
    });
  }
}
