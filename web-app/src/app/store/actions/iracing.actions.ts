import { Action } from '@ngrx/store';
import { IracingConnectionStatus } from 'models/iracing/connection-status';

export enum IracingActionTypes {
  UpdateIracing = '[iracing] Update Data',
  UpdateIracingSuccess = '[iracing] Update Data Success',
  UpdateIracingFailure = '[iracing] Update Data Failure',
}

export class UpdateIracing implements Action {
  readonly type = IracingActionTypes.UpdateIracing;
}

export class UpdateIracingSuccess implements Action {
  readonly type = IracingActionTypes.UpdateIracingSuccess;
  constructor(public payload: { data: IracingConnectionStatus }) { }
}

export class UpdateIracingFailure implements Action {
  readonly type = IracingActionTypes.UpdateIracingFailure;
  constructor(public payload: { error: any }) { }
}

export type IracingActions = UpdateIracing | UpdateIracingSuccess | UpdateIracingFailure;
