import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { IracingDataService } from '../../../../services/iracing-data.service';

@Component({
  selector: 'app-pedals-display',
  templateUrl: './pedals-display.component.html',
  styleUrls: ['./pedals-display.component.scss']
})
export class PedalsDisplayComponent implements OnInit {
  /**
   * If true, this component will unsubscribe from the websocket
   * connection when destroyed, but will leave the connection open.
   * This is useful when displaying multiple telemetry components
   * on the same page.
   */
  @Input('keepAlive')
  keepWsAlive: boolean = false;

  private iracingDataSubscription: Subscription;

  throttle: number;
  brake: number;
  handBrake: number;
  clutch: number;

  constructor(
    private iracingDataService: IracingDataService
  ) { }

  /**
   * Subscribe to iRacing data and start updating the pedal inputs
   */
  ngOnInit(): void {
    this.iracingDataService.startStream();

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

  /**
   * Unsubscribe from iRacing data
   */
  ngOnDestroy(): void {
    this.iracingDataSubscription.unsubscribe();

    if (!this.keepWsAlive) {
      this.iracingDataService.stopStream();
    }
  }
}
