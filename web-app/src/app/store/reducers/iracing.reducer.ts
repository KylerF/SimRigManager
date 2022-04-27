import { createReducer, on } from '@ngrx/store';
import * as moment from 'moment';
import * as iracingActions from '../actions/iracing.actions';

export const iracingFeatureKey = 'iracing';

export const initialState = {
  state: {
    connected: false
  },
  error: null,
  loading: false,
  lastUpdated: null
};

export const reducer = createReducer(
  initialState,
  on(iracingActions.GetConnectionStatus, (state, action) => ({
    ...state,
    loading: true
  })),
  on(iracingActions.GetConnectionStatusSuccess, (state, action) => ({
    ...state,
    lastUpdated: moment().toDate(),
    state: {
      connected: action.status.connected
    }
  })),
  on(iracingActions.GetConnectionStatusFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error
  }))
);
