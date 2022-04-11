import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from 'environments/environment';

import * as fromApiHealthcheck from './api-healthcheck.reducer';
import * as fromIracing from './iracing.reducer';
import * as fromQuote from './quote.reducer';

import { AvailabilityCheck } from 'models/availability-check';
import { IracingDataFrame } from 'models/iracing/data-frame';
import { Quote } from 'models/quote';
import { StateContainer } from 'models/state';

/**
 * The complete state of the application (combined from all reducers)
 */
export interface State {
  [fromIracing.iracingFeatureKey]: IracingDataFrame;
  [fromApiHealthcheck.apiHealthcheckFeatureKey]: StateContainer<AvailabilityCheck>;
  [fromQuote.quoteFeatureKey]: StateContainer<Quote>;
}

/**
 * All the reducers for the application
 */
export const reducers: ActionReducerMap<State> = {
  [fromIracing.iracingFeatureKey]: fromIracing.reducer,
  [fromApiHealthcheck.apiHealthcheckFeatureKey]: fromApiHealthcheck.reducer,
  [fromQuote.quoteFeatureKey]: fromQuote.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

// Top-level state selectors
export const selectAPIActive =
  (state: State) =>
    state[fromApiHealthcheck.apiHealthcheckFeatureKey].state.active;

export const selectQuote =
  (state: State) =>
    state[fromQuote.quoteFeatureKey];

export const selectIracingData =
  (state: State) =>
    state[fromIracing.iracingFeatureKey];
