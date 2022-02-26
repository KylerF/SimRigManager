import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { ControllerStatus } from '../../models/controller-status';
import { ControllerService } from '../../services/controller.service';
import { DriverService } from '../../services/driver.service';
import { IracingDataService } from '../../services/iracing-data.service';
import { delay, Observable, retryWhen, Subscription, take, tap } from 'rxjs';
import { Driver } from '../../models/driver';
import { IracingDataFrame } from '../../models/iracing/data-frame';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Component to show the home page with service availability status
 */
export class HomeComponent implements OnInit {
  apiActive$: Observable<boolean>;
  iracingData: IracingDataFrame;
  iracingDataSubscription: Subscription;
  selectedDriver: Driver;
  controllerStatus: ControllerStatus[] = [];

  errors: string[] = [];

  constructor(
    private iracingDataService: IracingDataService,
    private controllerService: ControllerService, // used to check connection to WLED controllers
    private driverService: DriverService, // used to check whether a driver has been selected
    private store: Store<fromRoot.State>
  )
  { }

  ngOnInit(): void {
    this.apiActive$ = this.store.select(fromRoot.selectAPIActive);

    this.getIracingStatus();
    this.getSelectedDriver();
    this.getControllerStatus();
  }

  ngOnDestroy(): void {
    this.iracingDataService.stopStream();
    this.iracingDataSubscription.unsubscribe();
  }

  /**
   * Check whether data is being streamed from iRacing
   */
  getIracingStatus() {
    this.iracingDataService.startStream();
    this.iracingDataSubscription = this.iracingDataService.latestData$
      .pipe(
        retryWhen(error => error.pipe(
          tap(err => {
            this.errors.push(err.message)
            this.iracingData = null;
          }),
          delay(3000)
        ))
      )
      .subscribe(
        response => {
          if (!_.isEmpty(response)) {
            this.iracingData = response;
          } else {
            this.iracingData = null;
          }
        }
      );
  }

  /**
   * Get the last selected driver
   */
  getSelectedDriver() {
    this.driverService.getSelectedDriver().subscribe(
      response => {
        // Success!
        this.selectedDriver = response;
      },
      error => {
        // Failed. Save the response.
        this.errors.push(error.message);
      }
    );
  }

  /**
   * Query the status of all WLED controllers
   */
  getControllerStatus() {
    this.controllerService.getControllers().subscribe(
      controllers => {
        // Try to connect to each controller
        controllers.forEach(controller => {
          this.controllerService.getControllerState(controller).subscribe(
            response => {
              // Connection succeeded
              this.controllerStatus.push({ 'name': controller.name, 'online': true});
            },
            error => {
              // Connection failed
              this.controllerStatus.push({ 'name': controller.name, 'online': false});
            }
          )
        });
      },
      error => {
        // Failed. Save the response.
        this.errors.push(error.message);
      }
    )
  }
}
