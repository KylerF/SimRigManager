import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';
import { Constants } from 'helpers/constants';

@Component({
  selector: 'app-speedometer-display',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss']
})

/**
 * Component to show a speedometer
 */
export class SpeedometerComponent extends BaseTelemetryDisplayComponent implements OnInit {
  speed: number;

  constructor (iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Get current speed in MPH
   */
  get speedMph() {
    return this.speed * Constants.mathematical.speedMphMultiplier;
  }

  /**
   * Subscribe to iRacing data and start updating the speed.
   * The component will attempt to start the stream if it is not
   * already running.
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!isEmpty(data)) {
            this.speed = data.Speed;
          }
        }
      );
  }
}
