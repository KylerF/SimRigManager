import { IracingConnectionStatus } from 'models/iracing/connection-status';
import { StateContainer } from 'models/state';
import * as moment from 'moment';
import * as iracingActions from '../actions/iracing.actions';

export const iracingFeatureKey = 'iracing';

export const initialState = {
  state: {
    connected: false
  },
  error: '',
  lastUpdated: null
};

/**
 * The reducer function for IRacing data
 *
 * @param state The current state
 * @param action The action to process
 * @returns The new state
 */
export function reducer(state = initialState, action: iracingActions.IracingActions): StateContainer<IracingConnectionStatus> {
  switch (action.type) {
    case iracingActions.IracingActionTypes.UpdateIracingSuccess:
      handleSetIracingDataSuccess(action);
      break;
    case iracingActions.IracingActionTypes.UpdateIracingFailure:
      handleSetIracingDataFailure(action);
      break;
    default:
      return state;
  }
}

/**
 * An iRacing data frame was received
 *
 * @param action update iracing success action
 * @returns the latest iRacing data frame
 */
function handleSetIracingDataSuccess(action: iracingActions.UpdateIracingSuccess): StateContainer<IracingConnectionStatus> {
  return {
    state: {
      ...action.payload.data
    },
    error: '',
    lastUpdated: moment().toDate()
  };
}

/**
 * No iRacing data was received from the API
 *
 * @param action update iracing failure action
 * @returns an empty iRacing data frame
 */
function handleSetIracingDataFailure(action: iracingActions.UpdateIracingFailure): StateContainer<IracingConnectionStatus> {
  return {
    state: {
      ...initialState.state
    },
    error: action.payload.error,
    lastUpdated: moment().toDate()
  }
}
