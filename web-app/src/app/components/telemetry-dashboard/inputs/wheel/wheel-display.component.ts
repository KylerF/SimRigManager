import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { IracingDataService } from '../../../../services/iracing-data.service';
import { CarImageHelper } from '../../../../_helpers/car-image-helper';

@Component({
  selector: 'app-wheel-display',
  templateUrl: './wheel-display.component.html',
  styleUrls: ['./wheel-display.component.scss']
})

/**
 * Component to show the steering wheel angle
 */
export class WheelDisplayComponent implements OnInit {
  /**
   * If true, this component will unsubscribe from the websocket
   * connection when destroyed, but will leave the connection open.
   * This is useful when displaying multiple telemetry components
   * on the same page.
   */
  @Input('keepAlive')
  keepWsAlive: boolean = false;

  private iracingDataSubscription: Subscription;

  driverIndex: number;
  car: string;
  wheelImage: string;

  constructor (
    private iracingDataService: IracingDataService,
    private renderer: Renderer2
  )
  { }

  /**
   * Subscribe to iRacing data and start updating the steering wheel angle
   */
  ngOnInit(): void {
    this.iracingDataService.startStream();

    this.iracingDataSubscription = this.iracingDataService.latestData$
      .subscribe(
        data => {
          if (!_.isEmpty(data)) {
            this.driverIndex = data.DriverInfo.DriverCarIdx;

            // Check if the car has changed, update the image accordingly
            let lastCar = this.car;
            this.car = data.DriverInfo.Drivers[this.driverIndex].CarScreenName;
            if ( lastCar !== this.car ) {
              this.wheelImage = CarImageHelper.getImageForCar(this.car);
            }

            this.rotateWheel(data.SteeringWheelAngle)
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

  /**
   * Rotate the steering wheel graphic by a given number
   * of radians
   *
   * @param radians angle to rotate wheel
   */
  rotateWheel(radians: number) {
    const image = document.getElementById('wheel');

    if (image) {
      this.renderer.setStyle(
        image,
        'transform',
        `rotate(${-radians}rad)`
      );
    }
  }
}
