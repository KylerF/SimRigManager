import { createAction, props } from '@ngrx/store';
import { LapTime } from 'src/app/models/lap-time';

export enum LaptimeActionTypes {
  LoadLaptimes = '[Laptime] Load Laptimes',
  LoadLaptimesSuccess = '[Laptime] Load Laptimes Success',
  LoadLaptimesFailure = '[Laptime] Load Laptimes Failure',
  StreamLaptimes = '[Laptime] Stream Laptimes',
  StopStreamLaptimes = '[Laptime] Stop Streaming Laptimes',
  AddLaptime = '[Laptime] Add Laptime',
}

export const LoadLaptimes = createAction(
  LaptimeActionTypes.LoadLaptimes
);

export const LoadLaptimesSuccess = createAction(
  LaptimeActionTypes.LoadLaptimesSuccess,
  props<{ payload: { data: LapTime[] }}>()
);

export const LoadLaptimesFailure = createAction(
  LaptimeActionTypes.LoadLaptimesFailure,
  props<{ payload: { error: any }}>()
);

export const StreamLaptimes = createAction(
  LaptimeActionTypes.StreamLaptimes,
);

export const StopStreamLaptimes = createAction(
  LaptimeActionTypes.StopStreamLaptimes,
);

export const AddLaptime = createAction(
  LaptimeActionTypes.AddLaptime,
  props<{ payload: { data: LapTime }}>()
);
