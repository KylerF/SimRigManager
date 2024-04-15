import { createAction, props } from '@ngrx/store';

import { LapTimeQueryParams } from 'models/lap-time-filter-params';
import { LapTime } from 'models/lap-time';

export enum LaptimeActionTypes {
  LoadLaptimes = '[Laptime] Load Laptimes',
  LoadLaptimesSuccess = '[Laptime] Load Laptimes Success',
  LoadLaptimesFailure = '[Laptime] Load Laptimes Failure',
  StreamLaptimes = '[Laptime] Stream Laptimes',
  StopStreamLaptimes = '[Laptime] Stop Streaming Laptimes',
  AddLaptime = '[Laptime] Add Laptime',
}

export const LoadLaptimes = createAction(
  LaptimeActionTypes.LoadLaptimes,
  props<{ params?: LapTimeQueryParams }>()
);

export const LoadLaptimesSuccess = createAction(
  LaptimeActionTypes.LoadLaptimesSuccess,
  props<{ params?: LapTimeQueryParams; payload: { data: LapTime[] } }>()
);

export const LoadLaptimesFailure = createAction(
  LaptimeActionTypes.LoadLaptimesFailure,
  props<{ payload: { error: any } }>()
);

export const StreamLaptimes = createAction(LaptimeActionTypes.StreamLaptimes);

export const StopStreamLaptimes = createAction(LaptimeActionTypes.StopStreamLaptimes);

export const AddLaptime = createAction(
  LaptimeActionTypes.AddLaptime,
  props<{ payload: { data: LapTime } }>()
);
