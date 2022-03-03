import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IracingDataService } from 'services/iracing-data.service';
import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';

@Component({
  selector: 'app-rpm-display',
  templateUrl: './rpm-display.component.html',
  styleUrls: ['./rpm-display.component.scss']
})
export class RpmDisplayComponent extends BaseTelemetryDisplayComponent {
  rpm: number;
  shiftRpm: number = 0;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            this.rpm = data.RPM;

            let newShiftRpm = data.DriverInfo.DriverCarSLShiftRPM;

            if (newShiftRpm > this.shiftRpm) {
              this.shiftRpm = newShiftRpm;
            }
          }
        }
      );
  }
}
