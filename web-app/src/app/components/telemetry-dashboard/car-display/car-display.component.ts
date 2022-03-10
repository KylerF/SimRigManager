import { Component } from '@angular/core';
import * as _ from 'lodash';
import { IracingDataService } from 'services/iracing-data.service';
import { BaseTelemetryDisplayComponent } from '../base-telemetry-display/base-telemetry-display.component';

@Component({
  selector: 'app-car-display',
  templateUrl: './car-display.component.html',
  styleUrls: ['./car-display.component.scss']
})

/**
 * Component to display the current car name
 */
export class CarDisplayComponent extends BaseTelemetryDisplayComponent {
  carName: string;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the car name
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            let driverIndex = data.DriverInfo.DriverCarIdx;
            this.carName = data.DriverInfo.Drivers[driverIndex].CarScreenName;
          }
        }
      );
  }
}
