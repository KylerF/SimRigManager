import * as controllerActions from 'store/actions/controller.actions';
import { Controller } from 'models/controller';
import { StateContainer } from 'models/state';

import * as moment from 'moment';
import { createReducer, on } from '@ngrx/store';

export const controllerFeatureKey = 'controllers';

export const initialState: StateContainer<Controller[]> = {
  state: [],
  error: null,
  loading: false,
  lastUpdated: null,
};

export const reducer = createReducer(
  initialState,
  on(controllerActions.LoadControllers, (state) => ({
    ...state,
    loading: true,
  })),
  on(controllerActions.LoadControllersSuccess, (state, action) => ({
    state: action.payload.data,
    error: null,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.LoadControllersFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.UpdateControllerState, (state) => ({
    ...state,
    loading: true,
  })),
  on(controllerActions.UpdateControllerStateSuccess, (state, action) => ({
    ...state,
    state: state.state.map((controller) => {
      if (controller.id === action.payload.controller.id) {
        return {
          ...controller,
          isAvailable: true,
          state: action.payload.data.state,
          info: action.payload.data.info,
        };
      }
      return controller;
    }),
    error: null,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.UpdateControllerStateFailure, (state, action) => ({
    ...state,
    state: state.state.map((controller) => {
      if (controller.id === action.payload.controller.id) {
        return {
          ...controller,
          isAvailable: false,
          state: null,
        };
      }
      return controller;
    }),
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.CreateController, (state) => ({
    ...state,
    loading: true,
  })),
  on(controllerActions.CreateControllerSuccess, (state, action) => ({
    state: [...state.state, action.payload.data],
    error: null,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.CreateControllerFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.UpdateControllerSettings, (state) => ({
    ...state,
    loading: true,
  })),
  on(controllerActions.UpdateControllerSettingsSuccess, (state, action) => ({
    state: state.state.map((controller) => {
      if (controller.id === action.payload.data.id) {
        // Preserve the controller state if IP address has not changed
        if (controller.ipAddress === action.payload.data.ipAddress) {
          return {
            ...action.payload.data,
            isAvailable: controller.isAvailable,
            state: controller.state,
            info: controller.info,
          };
        }

        return action.payload.data;
      }
      return controller;
    }),
    error: null,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.UpdateControllerSettingsFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.DeleteController, (state) => ({
    ...state,
    loading: true,
  })),
  on(controllerActions.DeleteControllerSuccess, (state, action) => ({
    state: state.state.filter((controller) => controller.id !== action.payload.data.id),
    error: null,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(controllerActions.DeleteControllerFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    lastUpdated: moment().toDate(),
  }))
);
