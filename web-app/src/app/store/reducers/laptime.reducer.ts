import { createReducer, on } from '@ngrx/store';
import * as moment from 'moment';

import * as laptimeActions from 'store/actions/laptime.actions';
import { LapTimeState } from 'models/lap-time';
import { StateContainer } from 'models/state';

export const laptimeFeatureKey = 'laptimes';

export const initialState: StateContainer<LapTimeState> = {
  state: {
    laptimes: [],
    filterParams: {},
  },
  error: null,
  loading: false,
  lastUpdated: null,
};

export const reducer = createReducer(
  initialState,
  on(laptimeActions.LoadLaptimes, (state) => ({
    ...state,
    loading: true,
  })),
  on(laptimeActions.LoadLaptimesSuccess, (state, action) => {
    // To cache all laptimes, we need to merge the new laptimes with the existing ones.
    // This is done only when the filtering parameters are the same, and limited
    // to 1000 laptimes.
    if (
      state.state.filterParams &&
      action.params &&
      state.state.filterParams.where === action.params.where &&
      state.state.filterParams.order === action.params.order
    ) {
      const newLaptimes = action.payload.data;
      const existingLaptimes = state.state.laptimes;
      const mergedLaptimes = [...existingLaptimes, ...newLaptimes];

      return {
        state: {
          laptimes: mergedLaptimes,
          filterParams: action.params,
        },
        error: null,
        loading: false,
        lastUpdated: moment().toDate(),
      };
    }

    // Otherwise, replace the existing laptimes with the new ones.
    return {
      state: {
        laptimes: action.payload.data,
        filterParams: action.params,
      },
      error: null,
      loading: false,
      lastUpdated: moment().toDate(),
    };
  }),
  on(laptimeActions.LoadLaptimesFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(laptimeActions.AddLaptime, (state, action) => ({
    ...state,
    state: {
      laptimes: [...state.state.laptimes, action.payload.data],
      filterParams: state.state.filterParams,
    },
    lastUpdated: moment().toDate(),
  }))
);
