import { createReducer, on } from '@ngrx/store';
import * as moment from 'moment';
import * as iracingActions from 'store/actions/iracing.actions';

export const iracingFeatureKey = 'iracing';

export const initialState = {
  state: {
    connected: false,
  },
  error: null,
  loading: false,
  lastUpdated: null,
};

export const reducer = createReducer(
  initialState,
  on(iracingActions.SetConnectionStatus, (state, action) => ({
    ...state,
    lastUpdated: moment().toDate(),
    state: {
      connected: action.connected,
    },
  })),
  on(iracingActions.GetConnectionStatus, (state, action) => ({
    ...state,
  }))
);
