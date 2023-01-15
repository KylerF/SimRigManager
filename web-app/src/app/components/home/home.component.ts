import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash-es';

import { ControllerService } from 'services/controller.service';
import { DriverService } from 'services/driver.service';
import { IracingDataService } from 'services/iracing-data.service';
import { delay, first, Observable, retryWhen, Subscription, tap } from 'rxjs';
import { Driver } from 'models/driver';
import { IracingDataFrame } from 'models/iracing/data-frame';
import { State, selectAPIActive, selectControllers } from 'store/reducers';
import { LoadControllers, StartStream } from 'store/actions/controller.actions';
import { StateContainer } from 'models/state';
import { Controller } from 'models/controller';

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
  controllers$: Observable<StateContainer<Controller[]>>;

  errors: string[] = [];

  constructor(
    private iracingDataService: IracingDataService,
    private controllerService: ControllerService, // used to check connection to WLED controllers
    private driverService: DriverService, // used to check whether a driver has been selected
    private store: Store<State>
  )
  { }

  ngOnInit(): void {
    this.getIracingStatus();
    this.getSelectedDriver();
    this.getControllerStatus();

    this.apiActive$ = this.store.select(selectAPIActive);
    this.iracingConnected$ = this.iracingDataService.getConnectionStatus();
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
    this.iracingDataSubscription = this.iracingDataService.latestData$
      .pipe(
        retryWhen( error => error.pipe(
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
    this.store.dispatch(LoadControllers());
    this.controllers$ = this.store.select(selectControllers);

    this.startControllerUpdates();
  }

  /**
   * Connect to WLED controllers and start updating their status
   */
  startControllerUpdates() {
    this.controllers$.pipe(
      first(
        controllers => controllers.state.some(
          controller => controller.isAvailable == undefined
        )
      )
    )
    .subscribe({
      next: controllers => {
        controllers.state.forEach(controller => {
          if (controller.isAvailable == undefined) {
            this.controllerService.disconnectController(controller);
            this.store.dispatch(StartStream({ controller: controller }));
          }
        });
      }
    });
  }
}
