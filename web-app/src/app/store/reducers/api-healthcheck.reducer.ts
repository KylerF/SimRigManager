import * as apiHealthcheckActions from '../actions/api-healthcheck.actions';
import { AvailabilityCheck } from 'models/availability-check';
import { StateContainer } from 'models/state';
import * as moment from 'moment';

export const apiHealthcheckFeatureKey = 'apiHealthcheck';

export const initialState: StateContainer<AvailabilityCheck> = {
  state: {
    active: false
  },
  error: '',
  lastUpdated: null
};

/**
 * The reducer function for API healthchecks
 *
 * @param state The current state
 * @param action The action to process
 * @returns The new state
 */
export function reducer(
  state = initialState,
  action: apiHealthcheckActions.ApiHealthcheckActions
): StateContainer<AvailabilityCheck> {
  switch (action.type) {
    case apiHealthcheckActions.ApiHealthcheckActionTypes.UpdateApiHealthcheckSuccess:
      return handleSetStatusSuccess(action);
    case apiHealthcheckActions.ApiHealthcheckActionTypes.UpdateApiHealthcheckFailure:
      return handleSetStatusFailure(action);
    default:
      return state;
  }
}

/**
 * A response from the API was received
 *
 * @param action update healthcheck success action
 * @returns active status reported by the API
 */
function handleSetStatusSuccess(
  action: apiHealthcheckActions.UpdateApiHealthcheckSuccess
): StateContainer<AvailabilityCheck> {
  return {
    state: {
      ...action.payload.data
    },
    error: '',
    lastUpdated: moment().toDate()
  };
}

/**
 * No response from the API
 *
 * @returns active: false
 */
function handleSetStatusFailure(
  action: apiHealthcheckActions.UpdateApiHealthcheckFailure
): StateContainer<AvailabilityCheck> {
  return {
    state: {
      active: false
    },
    error: action.payload.error,
    lastUpdated: moment().toDate()
  }
}
