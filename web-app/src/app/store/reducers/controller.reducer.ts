import * as controllerActions from '../actions/controller.actions';
import { Controller } from 'models/controller';
import { StateContainer } from 'models/state';

import * as moment from 'moment';
import { createReducer, on } from '@ngrx/store';

export const controllerFeatureKey = 'controllers';

export const initialState: StateContainer<Controller[]> = {
  state: [],
  error: null,
  loading: false,
  lastUpdated: null
};

export const reducer = createReducer(
  initialState,
  on(controllerActions.LoadControllers, state => ({
    ...state,
    loading: true
  })),
  on(controllerActions.LoadControllersSuccess, (state, action) => ({
    state: action.payload.data,
    error: null,
    loading: false,
    lastUpdated: moment().toDate()
  })),
  on(controllerActions.LoadControllersFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    lastUpdated: moment().toDate()
  })),
  on(controllerActions.CreateController, state => ({
    ...state,
    loading: true
  })),
  on(controllerActions.CreateControllerSuccess, (state, action) => ({
    state: [...state.state, action.payload.data],
    error: null,
    loading: false,
    lastUpdated: moment().toDate()
  })),
  on(controllerActions.CreateControllerFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    lastUpdated: moment().toDate()
  })),
  on(controllerActions.CreateControllerSuccess, (state, action) => ({
    ...state,
    lastUpdated: moment().toDate()
  })),
  on(controllerActions.DeleteController, state => ({
    ...state,
    loading: true
  })),
  on(controllerActions.DeleteControllerSuccess, (state, action) => ({
    state: state.state.filter(controller => controller.id !== action.payload.data.id),
    error: null,
    loading: false,
    lastUpdated: moment().toDate()
  })),
  on(controllerActions.DeleteControllerFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    lastUpdated: moment().toDate()
  })),
);
