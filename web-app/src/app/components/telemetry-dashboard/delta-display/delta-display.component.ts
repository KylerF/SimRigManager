import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-delta-display',
  templateUrl: './delta-display.component.html',
  styleUrls: ['./delta-display.component.scss']
})
export class DeltaDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  delta: number;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            this.delta = data.LapDeltaToSessionBestLap;
          }
        }
      );
  }
}
