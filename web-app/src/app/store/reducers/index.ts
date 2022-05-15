import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from 'environments/environment';

import * as fromApiHealthcheck from './api-healthcheck.reducer';
import * as fromIracing from './iracing.reducer';
import * as fromQuote from './quote.reducer';
import * as fromController from './controller.reducer';

import { AvailabilityCheck } from 'models/availability-check';
import { Quote } from 'models/quote';
import { StateContainer } from 'models/state';
import { IracingConnectionStatus } from 'models/iracing/connection-status';
import { Controller } from 'models/controller';
import * as fromLaptime from './laptime.reducer';
import { LapTime } from 'models/lap-time';
import * as moment from 'moment';
import {
  LapTimeColumn,
  LapTimeFilterParams,
  LaptimeSortParams,
  SortOrder
} from 'models/lap-time-search-params';

/**
 * The complete state of the application (combined from all reducers)
 */
export interface State {
  [fromIracing.iracingFeatureKey]: StateContainer<IracingConnectionStatus>;
  [fromApiHealthcheck.apiHealthcheckFeatureKey]: StateContainer<AvailabilityCheck>;
  [fromQuote.quoteFeatureKey]: StateContainer<Quote>;
  [fromController.controllerFeatureKey]: StateContainer<Controller[]>;
  [fromLaptime.laptimeFeatureKey]: StateContainer<LapTime[]>;
}

/**
 * All the reducers for the application
 */
export const reducers: ActionReducerMap<State> = {
  [fromIracing.iracingFeatureKey]: fromIracing.reducer,
  [fromApiHealthcheck.apiHealthcheckFeatureKey]: fromApiHealthcheck.reducer,
  [fromQuote.quoteFeatureKey]: fromQuote.reducer,
  [fromController.controllerFeatureKey]: fromController.reducer,
  [fromLaptime.laptimeFeatureKey]: fromLaptime.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// Top-level state selectors
export const selectAPIActive =
  (state: State) =>
    state[fromApiHealthcheck.apiHealthcheckFeatureKey].state.active;

export const selectQuote =
  (state: State) =>
    state[fromQuote.quoteFeatureKey];

export const selectIracingConnected =
  (state: State) =>
    state[fromIracing.iracingFeatureKey].state.connected;

export const selectControllers =
  (state: State) =>
    state[fromController.controllerFeatureKey];

export const selectAllLaptimes = () =>
  createSelector(
    selectAllLaptimes,
    (state: State) => state[fromLaptime.laptimeFeatureKey]
  );

// Laptime filters
export const selectLaptimesForDriver = (driverId: number) =>
  createSelector(
    selectLaptimesForDriver,
    (state: State) => state[fromLaptime.laptimeFeatureKey].state.filter(
      (laptime: LapTime) => laptime.driver.id === driverId
    )
  );

export const selectLaptimesSince = (since: moment.Moment) =>
  createSelector(
    selectLaptimesSince,
    (state: State) => state[fromLaptime.laptimeFeatureKey].state.filter(
      (laptime: LapTime) => moment(laptime.setAt).isAfter(since)
    )
  );

export const selectSortedLaptimes = (sortParams: LaptimeSortParams) =>
  createSelector(
    selectSortedLaptimes,
    (state: State) => state[fromLaptime.laptimeFeatureKey].state.sort((lapTime1, lapTime2) => {
      if (sortParams.sortBy == LapTimeColumn.DRIVER) {
        return sortParams.sortOrder == SortOrder.DESC ?
          (lapTime2.driver.name > lapTime1.driver.name ?
            1 : lapTime2.driver.name < lapTime1.driver.name ? -1 : 0) :
          (lapTime1.driver.name > lapTime2.driver.name ?
            1 : lapTime1.driver.name < lapTime2.driver.name ? -1 : 0);
      } else {
        return sortParams.sortOrder == SortOrder.DESC ?
          (lapTime2[sortParams.sortBy] > lapTime1[sortParams.sortBy] ?
            1 : lapTime2[sortParams.sortBy] < lapTime1[sortParams.sortBy] ? -1 : 0) :
          (lapTime1[sortParams.sortBy] > lapTime2[sortParams.sortBy] ?
            1 : lapTime1[sortParams.sortBy] < lapTime2[sortParams.sortBy] ? -1 : 0);
      }
    })
  );

export const selectFilteredLaptimes = (filterParams: LapTimeFilterParams) =>
  createSelector(
    selectLaptimesSince(filterParams.since),
    selectSortedLaptimes(filterParams.sortParams)
  );
