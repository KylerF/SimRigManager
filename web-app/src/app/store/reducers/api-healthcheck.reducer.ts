import { createReducer, on } from '@ngrx/store';
import moment from 'moment';

import * as apiHealthcheckActions from 'store/actions/api-healthcheck.actions';
import { AvailabilityCheck } from 'models/availability-check';
import { StateContainer } from 'models/state';

export const apiHealthcheckFeatureKey = 'apiHealthcheck';

export const initialState: StateContainer<AvailabilityCheck> = {
  state: {
    apiActive: false,
  },
  error: null,
  loading: false,
  lastUpdated: null,
};

/**
 * The reducer function for API healthchecks
 *
 * @param state The current state
 * @param action The action to process
 * @returns The new state
 */
export const reducer = createReducer(
  initialState,
  on(apiHealthcheckActions.UpdateApiHealthcheck, (state) => ({
    ...state,
    loading: true,
  })),
  on(apiHealthcheckActions.UpdateApiHealthcheckSuccess, (state, action) => ({
    state: action.payload.data,
    error: null,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(apiHealthcheckActions.UpdateApiHealthcheckFailure, (state, action) => ({
    state: initialState.state,
    error: action.payload.error,
    loading: false,
    lastUpdated: moment().toDate(),
  }))
);
