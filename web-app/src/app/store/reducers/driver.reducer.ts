import { createReducer, on } from '@ngrx/store';

import * as driverActions from 'store/actions/driver.actions';
import { StateContainer } from 'models/state';
import { Driver } from 'models/driver';

export const driverFeatureKey = 'driver';

export interface State {
  activeDriver: Driver;
  drivers: Driver[];
}

export const initialState: StateContainer<State> = {
  state: {
    activeDriver: null,
    drivers: [],
  },
  error: null,
  loading: false,
  lastUpdated: null,
};

export const reducer = createReducer(
  initialState,
  on(driverActions.loadActiveDriver, (state) => ({
    ...state,
    loading: true,
  })),
  on(driverActions.loadActiveDriverSuccess, (state, action) => ({
    ...state,
    state: {
      ...state.state,
      activeDriver: action.data,
    },
    error: null,
    loading: false,
    lastUpdated: new Date(),
  })),
  on(driverActions.loadActiveDriverFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    lastUpdated: new Date(),
  })),
  on(driverActions.setActiveDriverSuccess, (state, action) => ({
    ...state,
    state: {
      ...state.state,
      activeDriver: action.data,
    },
    error: null,
    loading: false,
    lastUpdated: new Date(),
  })),
  on(driverActions.setActiveDriverFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    lastUpdated: new Date(),
  })),
  on(driverActions.uploadDriverAvatar, (state) => ({
    ...state,
    loading: true,
  })),
  on(driverActions.loadAllDrivers, (state) => ({
    ...state,
    loading: true,
  })),
  on(driverActions.loadAllDriversSuccess, (state, action) => ({
    ...state,
    state: {
      ...state.state,
      drivers: action.data,
    },
    error: null,
    loading: false,
    lastUpdated: new Date(),
  })),
  on(driverActions.uploadDriverAvatarSuccess, (state, action) => ({
    ...state,
    state: {
      drivers: state.state.drivers.map((driver) => {
        if (driver.id === action.driver.id) {
          return {
            ...driver,
            image_url: action.image_url,
          };
        }
        return driver;
      }),
      activeDriver:
        state.state.activeDriver.id === action.driver.id
          ? {
              ...state.state.activeDriver,
              profilePic: action.image_url,
            }
          : state.state.activeDriver,
    },
    error: null,
    loading: false,
    lastUpdated: new Date(),
  })),
  on(driverActions.uploadDriverAvatarFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    lastUpdated: new Date(),
  }))
);
