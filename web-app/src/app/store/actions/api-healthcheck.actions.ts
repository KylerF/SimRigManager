import { Action } from '@ngrx/store';

import { AvailabilityCheck } from '../../models/availability-check';

export enum ApiHealthcheckActionTypes {
  UpdateApiHealthcheck = '[ApiHealthcheck] Update ApiHealthcheck',
  UpdateApiHealthcheckSuccess = '[ApiHealthcheck] Update ApiHealthcheck Success',
  UpdateApiHealthcheckFailure = '[ApiHealthcheck] Update ApiHealthcheck Failure',
}

/**
 * Main action dispatched by components to update the API healthcheck
 * status in the store
 */
export class UpdateApiHealthcheck implements Action {
  readonly type = ApiHealthcheckActionTypes.UpdateApiHealthcheck;
}

/**
 * Triggered when response from the API was received
 */
export class UpdateApiHealthcheckSuccess implements Action {
  readonly type = ApiHealthcheckActionTypes.UpdateApiHealthcheckSuccess;
  constructor(public payload: { data: AvailabilityCheck }) { }
}

/**
 * Triggered when no response from the API was received
 */
export class UpdateApiHealthcheckFailure implements Action {
  readonly type = ApiHealthcheckActionTypes.UpdateApiHealthcheckFailure;
  constructor(public payload: { error: any }) { }
}

export type ApiHealthcheckActions = UpdateApiHealthcheck        |
                                    UpdateApiHealthcheckSuccess |
                                    UpdateApiHealthcheckFailure;
