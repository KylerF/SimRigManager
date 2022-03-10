import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IracingDataService } from 'services/iracing-data.service';
import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';

@Component({
  selector: 'app-rpm-display',
  templateUrl: './rpm-display.component.html',
  styleUrls: ['./rpm-display.component.scss']
})

/**
 * Component to display the current RPM of the car
 */
export class RpmDisplayComponent extends BaseTelemetryDisplayComponent {
  rpm: number;
  shiftRpm: number = 0;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the RPM
   */
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
