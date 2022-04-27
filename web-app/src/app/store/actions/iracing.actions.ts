import { createAction, props } from '@ngrx/store';
import { IracingConnectionStatus } from 'models/iracing/connection-status';

export enum IracingActionTypes {
  GetConnectionStatus = '[iracing] Get Connection Status',
  GetConnectionStatusSuccess = '[iracing] Get Connection Status Success',
  GetConnectionStatusFailure = '[iracing] Get Connection Status Failure'
}

export const GetConnectionStatus = createAction(
  IracingActionTypes.GetConnectionStatus
);

export const GetConnectionStatusSuccess = createAction(
  IracingActionTypes.GetConnectionStatusSuccess,
  props<{ status: IracingConnectionStatus }>()
);

export const GetConnectionStatusFailure = createAction(
  IracingActionTypes.GetConnectionStatusFailure,
  props<{ error: any }>()
);
