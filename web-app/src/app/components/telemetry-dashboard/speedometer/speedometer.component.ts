import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/_helpers/constants';
import { IracingDataService } from '../../../services/iracing-data.service';

@Component({
  selector: 'app-speedometer-display',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss']
})

/**
 * Component to show a speedometer
 */
export class SpeedometerComponent implements OnInit {
  /**
   * If true, this component will unsubscribe from the websocket
   * connection when destroyed, but will leave the connection open.
   * This is useful when displaying multiple telemetry components
   * on the same page.
   */
  @Input('keepAlive')
  keepWsAlive: boolean = false;

  private iracingDataSubscription: Subscription;

  speed: number;

  constructor (
    private iracingDataService: IracingDataService,
  )
  { }

  /**
   * Get current speed in MPH
   */
  get speedMph() {
    return this.speed * Constants.speedMphMultiplier;
  }

  /**
   * Subscribe to iRacing data and start updating the speed
   */
  ngOnInit(): void {
    this.iracingDataService.startStream();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            this.speed = data.Speed;
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
