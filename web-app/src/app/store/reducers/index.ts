import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from 'environments/environment';

import { cloneDeep } from 'lodash-es';

import * as fromApiHealthcheck from './api-healthcheck.reducer';
import * as fromIracing from './iracing.reducer';
import * as fromQuote from './quote.reducer';
import * as fromController from './controller.reducer';
import * as fromDriver from './driver.reducer';

import { AvailabilityCheck } from 'models/availability-check';
import { Quote } from 'models/quote';
import { StateContainer } from 'models/state';
import { IracingConnectionStatus } from 'models/iracing/connection-status';
import { Controller } from 'models/controller';
import * as fromLaptime from './laptime.reducer';
import { LapTime } from 'models/lap-time';
import * as moment from 'moment';
import { Driver, DriverState } from 'models/driver';

/**
 * The complete state of the application (combined from all reducers)
 */
export interface State {
  [fromIracing.iracingFeatureKey]: StateContainer<IracingConnectionStatus>;
  [fromApiHealthcheck.apiHealthcheckFeatureKey]: StateContainer<AvailabilityCheck>;
  [fromQuote.quoteFeatureKey]: StateContainer<Quote>;
  [fromController.controllerFeatureKey]: StateContainer<Controller[]>;
  [fromLaptime.laptimeFeatureKey]: StateContainer<LapTime[]>;
  [fromDriver.driverFeatureKey]: StateContainer<DriverState>;
}

/**
 * All the reducers for the application
 */
export const reducers: ActionReducerMap<State> = {
  [fromIracing.iracingFeatureKey]: fromIracing.reducer,
  [fromApiHealthcheck.apiHealthcheckFeatureKey]: fromApiHealthcheck.reducer,
  [fromQuote.quoteFeatureKey]: fromQuote.reducer,
  [fromController.controllerFeatureKey]: fromController.reducer,
  [fromLaptime.laptimeFeatureKey]: fromLaptime.reducer,
  [fromDriver.driverFeatureKey]: fromDriver.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// Top-level state selectors
export const selectAPIActive = (state: State) =>
  state[fromApiHealthcheck.apiHealthcheckFeatureKey].state.apiActive;

export const selectDriverState = (state: State) => state[fromDriver.driverFeatureKey];

export const selectActiveDriver = (state: State) =>
  state[fromDriver.driverFeatureKey].state.activeDriver;

export const selectDrivers = (state: State) => state[fromDriver.driverFeatureKey].state.drivers;

export const selectDriverById = (id: number) =>
  createSelector(selectDrivers, (drivers: Driver[]) => drivers.find((driver) => driver.id === id));

export const selectQuote = (state: State) => state[fromQuote.quoteFeatureKey];

export const selectIracingConnected = (state: State) =>
  state[fromIracing.iracingFeatureKey].state.connected;

export const selectControllers = (state: State) => state[fromController.controllerFeatureKey];

// Laptime selectors
export const selectLaptimes = createFeatureSelector<StateContainer<LapTime[]>>(
  fromLaptime.laptimeFeatureKey
);

export const selectLaptimesState = () =>
  createSelector(selectLaptimes, (laptimeState: StateContainer<LapTime[]>) => laptimeState);

export const selectAllLaptimes = () =>
  createSelector(selectLaptimes, (laptimeState: StateContainer<LapTime[]>) => laptimeState.state);

export const selectLaptimesForDriver = (driverId: number) =>
  createSelector(selectLaptimes, (laptimeState: StateContainer<LapTime[]>) => {
    let filteredState = cloneDeep(laptimeState);
    filteredState.state = laptimeState.state.filter(
      (lapTime: LapTime) => lapTime.driver.id === driverId
    );

    return filteredState;
  });

export const selectOverallBestLaptimes = () =>
  createSelector(selectLaptimes, (laptimeState: StateContainer<LapTime[]>) => {
    let filteredState = laptimeState;
    filteredState.state = laptimeState.state.filter(
      (lapTime) =>
        lapTime.time ==
        Math.min(
          laptimeState.state.filter(
            (cLapTime) =>
              cLapTime.car == lapTime.car &&
              cLapTime.trackName == lapTime.trackName &&
              cLapTime.trackConfig == lapTime.trackConfig
          )[0].time
        )
    );

    return filteredState;
  });

export const selectLaptimesSince = (since: moment.Moment) =>
  createSelector(selectLaptimes, (laptimeState: StateContainer<LapTime[]>) =>
    laptimeState.state.filter((laptime: LapTime) => moment(laptime.setAt).isAfter(since))
  );
