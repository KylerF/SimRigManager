import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-rpm-display',
  templateUrl: './rpm-display.component.html',
  styleUrls: ['./rpm-display.component.scss'],
  standalone: false,
})

/**
 * Component to display the current RPM of the car
 */
export class RpmDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
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

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        this.rpm = data.RPM;

        let newShiftRpm = data.DriverInfo.DriverCarSLShiftRPM;

        if (newShiftRpm > this.shiftRpm) {
          this.shiftRpm = newShiftRpm;
        }
      }
    });
  }
}
