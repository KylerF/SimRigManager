import { createAction, props } from '@ngrx/store';
import { LapTime } from 'src/app/models/lap-time';

export enum LaptimeActionTypes {
  LoadLaptimes = '[Laptime] Load Laptimes',
  LoadLaptimesSuccess = '[Laptime] Load Laptimes Success',
  LoadLaptimesFailure = '[Laptime] Load Laptimes Failure'
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
