import { createAction, props } from '@ngrx/store';

export enum IracingActionTypes {
  SetConnectionStatus = '[iracing] Set Connection Status',
  GetConnectionStatus = '[iracing] Get Connection Status',
}

export const SetConnectionStatus = createAction(
  IracingActionTypes.SetConnectionStatus,
  props<{ connected: boolean }>()
);

export const GetConnectionStatus = createAction(IracingActionTypes.GetConnectionStatus);
