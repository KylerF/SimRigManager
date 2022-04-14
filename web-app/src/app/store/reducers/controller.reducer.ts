import * as controllerActions from '../actions/controller.actions';
import { Controller } from 'models/controller';
import { StateContainer } from 'models/state';
import * as moment from 'moment';

export const controllerFeatureKey = 'controllers';

export const initialState: StateContainer<Controller[]> = {
  state: [],
  error: '',
  lastUpdated: null
};

export function reducer(
  state = initialState,
  action: controllerActions.ControllerActions
): StateContainer<Controller[]> {
  switch (action.type) {
    case controllerActions.ControllerActionTypes.LoadControllersSuccess:
      return handleUpdateControllersSuccess(action);
    case controllerActions.ControllerActionTypes.LoadControllersFailure:
      return handleUpdateControllersFailure(action);
    default:
      return state;
  }
}

/**
 * A response from the API was received
 *
 * @param action update controllers success action
 * @returns controller data
 */
function handleUpdateControllersSuccess(
   action: controllerActions.LoadControllersSuccess
): StateContainer<Controller[]> {
  return {
    state: action.payload.data,
    error: '',
    lastUpdated: moment().toDate()
  };
}

/**
 * Error response from the API
 *
 * @returns empty controller state with error
 */
function handleUpdateControllersFailure(
  action: controllerActions.LoadControllersFailure
): StateContainer<Controller[]> {
  return {
    state: {
      ...initialState.state
    },
    error: action.payload.error,
    lastUpdated: moment().toDate()
  }
}
