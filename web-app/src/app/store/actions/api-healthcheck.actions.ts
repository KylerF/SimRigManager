import { createAction, props } from '@ngrx/store';

import { AvailabilityCheck } from 'models/availability-check';

export enum ApiHealthcheckActionTypes {
  UpdateApiHealthcheck = '[ApiHealthcheck] Update ApiHealthcheck',
  UpdateApiHealthcheckSuccess = '[ApiHealthcheck] Update ApiHealthcheck Success',
  UpdateApiHealthcheckFailure = '[ApiHealthcheck] Update ApiHealthcheck Failure',
}

/**
 * Main action dispatched by components to update the API healthcheck
 * status in the store
 */
export const UpdateApiHealthcheck = createAction(
  ApiHealthcheckActionTypes.UpdateApiHealthcheck
);

/**
 * Triggered when response from the API was received
 */
export const UpdateApiHealthcheckSuccess = createAction(
  ApiHealthcheckActionTypes.UpdateApiHealthcheckSuccess,
  props<{ payload: { data: AvailabilityCheck } }>()
);

/**
 * Triggered when no response from the API was received
 */
export const UpdateApiHealthcheckFailure = createAction(
  ApiHealthcheckActionTypes.UpdateApiHealthcheckFailure,
  props<{ payload: { error: any } }>()
);
