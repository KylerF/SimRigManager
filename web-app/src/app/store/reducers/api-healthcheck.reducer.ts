import * as apiHealthcheckActions from '../actions/api-healthcheck.actions';
import { AvailabilityCheck } from '../../models/availability-check';

export const apiHealthcheckFeatureKey = 'apiHealthcheck';

export const initialState: AvailabilityCheck = {
  active: false
};

/**
 * The reducer function for API healthchecks
 *
 * @param state The current state
 * @param action The action to process
 * @returns The new state
 */
export function reducer(state = initialState, action: apiHealthcheckActions.ApiHealthcheckActions): AvailabilityCheck {
  switch (action.type) {
    case apiHealthcheckActions.ApiHealthcheckActionTypes.UpdateApiHealthcheckSuccess:
      return handleSetStatusSuccess(action);
    case apiHealthcheckActions.ApiHealthcheckActionTypes.UpdateApiHealthcheckFailure:
      return handleSetStatusFailure();
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
function handleSetStatusSuccess(action: apiHealthcheckActions.UpdateApiHealthcheckSuccess): AvailabilityCheck {
  return {
    active: action.payload.data.active
  };
}

/**
 * No response from the API
 *
 * @returns active: false
 */
function handleSetStatusFailure(): AvailabilityCheck {
  return {
    active: false
  };
}
