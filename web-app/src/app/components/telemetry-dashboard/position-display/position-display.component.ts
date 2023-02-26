import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'src/app/services/iracing-data.service';

@Component({
  selector: 'app-position-display',
  templateUrl: './position-display.component.html',
  styleUrls: ['./position-display.component.scss'],
})
/**
 * Component to show the driver's position
 */
export class PositionDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  position: number;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        this.position = data.PlayerCarPosition;
      }
    });
  }
}
