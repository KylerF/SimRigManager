import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ControllerService } from 'services/controller.service';
import { DriverService } from 'services/driver.service';
import { IracingDataGQLWeekendInfo } from 'src/app/services/iracing-graphql.service';
import { first, map, Observable } from 'rxjs';
import { Driver } from 'models/driver';
import { State, selectAPIActive, selectControllers } from 'store/reducers';
import { LoadControllers, StartStream } from 'store/actions/controller.actions';
import { StateContainer } from 'models/state';
import { Controller } from 'models/controller';
import { IracingDataFrame } from 'src/app/models/iracing/data-frame';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

/**
 * Component to show the home page with service availability status
 */
export class HomeComponent implements OnInit {
  apiActive$: Observable<boolean>;
  iracingData$: Observable<IracingDataFrame>;
  selectedDriver: Driver;
  controllers$: Observable<StateContainer<Controller[]>>;

  errors: string[] = [];

  constructor(
    private iracingGraphQLService: IracingDataGQLWeekendInfo,
    private controllerService: ControllerService, // used to check connection to WLED controllers
    private driverService: DriverService, // used to check whether a driver has been selected
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.getSelectedDriver();
    this.getControllerStatus();

    this.apiActive$ = this.store.select(selectAPIActive);
    this.iracingData$ = this.iracingGraphQLService
      .subscribe()
      .pipe(map((result) => result.data.iracing));
  }

  /**
   * Get the last selected driver
   */
  getSelectedDriver() {
    this.driverService.getSelectedDriver().subscribe({
      next: (driver) => (this.selectedDriver = driver),
      error: (error) => this.errors.push(error.message),
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
    this.controllers$
      .pipe(
        first((controllers) =>
          controllers.state.some((controller) => controller.isAvailable == undefined)
        )
      )
      .subscribe({
        next: (controllers) => {
          controllers.state.forEach((controller) => {
            if (controller.isAvailable == undefined) {
              this.controllerService.disconnectController(controller);
              this.store.dispatch(StartStream({ controller: controller }));
            }
          });
        },
      });
  }
}
