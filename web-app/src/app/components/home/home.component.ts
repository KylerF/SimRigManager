import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash-es';

import { ControllerStatus } from 'models/controller-status';
import { ControllerService } from 'services/controller.service';
import { DriverService } from 'services/driver.service';
import { IracingDataService } from 'services/iracing-data.service';
import { delay, Observable, retryWhen, Subscription, tap } from 'rxjs';
import { Driver } from 'models/driver';
import { IracingDataFrame } from 'models/iracing/data-frame';
import { State, selectAPIActive, selectIracingConnected } from 'store/reducers';
import { GetConnectionStatus } from 'store/actions/iracing.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Component to show the home page with service availability status
 */
export class HomeComponent implements OnInit, OnDestroy {
  apiActive$: Observable<boolean>;
  iracingConnected$: Observable<boolean>;
  iracingData: IracingDataFrame;
  iracingDataSubscription: Subscription;
  selectedDriver: Driver;
  controllerStatus: ControllerStatus[] = [];

  errors: string[] = [];

  constructor(
    private iracingDataService: IracingDataService,
    private controllerService: ControllerService, // used to check connection to WLED controllers
    private driverService: DriverService, // used to check whether a driver has been selected
    private store: Store<State>
  )
  { }

  ngOnInit(): void {
    this.apiActive$ = this.store.select(selectAPIActive);
    this.iracingConnected$ = this.store.select(selectIracingConnected);

    this.getIracingStatus();
    this.getSelectedDriver();
    this.getControllerStatus();
  }

  ngOnDestroy(): void {
    this.iracingDataSubscription.unsubscribe();
    this.iracingDataService.stopStream();
  }

  /**
   * Check whether data is being streamed from iRacing
   */
  getIracingStatus() {
    this.iracingDataService.startStream();
    this.store.dispatch(GetConnectionStatus());
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
          if (!isEmpty(response)) {
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
    this.driverService.getSelectedDriver().subscribe({
      next: driver => this.selectedDriver = driver,
      error: error => this.errors.push(error.message)
    });
  }

  /**
   * Query the status of all WLED controllers
   */
  getControllerStatus() {
    this.controllerService.getControllers().subscribe({
      next: controllers => {
        // Try to connect to each controller
        controllers.forEach(controller => {
          this.controllerService.getControllerState(controller).subscribe({
            next: state => this.controllerStatus.push({
              'name': controller.name,
              'online': true,
              'power': state.on
            }),
            error: () => this.controllerStatus.push({
              'name': controller.name,
              'online': false
            })
          });
        });
      },
      error: error => this.errors.push(error.message)
    });
  }
}
