import {
  ActionReducerMap,
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

/**
 * The complete state of the application (combined from all reducers)
 */
export interface State {
  [fromIracing.iracingFeatureKey]: StateContainer<IracingConnectionStatus>;
  [fromApiHealthcheck.apiHealthcheckFeatureKey]: StateContainer<AvailabilityCheck>;
  [fromQuote.quoteFeatureKey]: StateContainer<Quote>;
  [fromController.controllerFeatureKey]: StateContainer<Controller[]>;
}

/**
 * All the reducers for the application
 */
export const reducers: ActionReducerMap<State> = {
  [fromIracing.iracingFeatureKey]: fromIracing.reducer,
  [fromApiHealthcheck.apiHealthcheckFeatureKey]: fromApiHealthcheck.reducer,
  [fromQuote.quoteFeatureKey]: fromQuote.reducer,
  [fromController.controllerFeatureKey]: fromController.reducer
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
    state[fromIracing.iracingFeatureKey].state.connected

export const selectControllers =
  (state: State) =>
    state[fromController.controllerFeatureKey];
