import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { BaseTelemetryDisplayComponent } from '../../base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-pedals-display',
  templateUrl: './pedals-display.component.html',
  styleUrls: ['./pedals-display.component.scss']
})

/**
 * Component to display the pedal inputs
 */
export class PedalsDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  throttle: number;
  brake: number;
  handBrake: number;
  clutch: number;

  constructor (iracingDataService: IracingDataService){
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the pedal inputs
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            this.throttle = data.Throttle;
            this.brake = data.Brake;
            this.handBrake = data.HandbrakeRaw;
            this.clutch = 1 - data.Clutch;
          }
        }
      );
  }
}
