import { createAction, props } from '@ngrx/store';
import { Driver } from 'models/driver';

export const loadActiveDriver = createAction(
  '[LoadActiveDriver] Load Active Driver'
);

export const loadActiveDriverSuccess = createAction(
  '[LoadActiveDriver] Load Active Driver Success',
  props<{ data: Driver }>()
);

export const loadActiveDriverFailure = createAction(
  '[LoadActiveDriver] Load Active Driver Failure',
  props<{ error: any }>()
);

export const loadAllDrivers = createAction(
  '[LoadDrivers] Load All Drivers'
);

export const loadAllDriversSuccess = createAction(
  '[LoadDrivers] Load All Drivers Success',
  props<{ data: Driver[] }>()
);

export const loadAllDriversFailure = createAction(
  '[LoadActiveDriver] Load Active Driver Failure',
  props<{ error: any }>()
);

export const uploadDriverAvatar = createAction(
  '[UpdateDriverProfile] Upload Driver Avatar',
  props<{ driver: Driver, file: File }>()
);

export const uploadDriverAvatarSuccess = createAction(
  '[UpdateDriverProfile] Upload Driver Avatar Success',
  props<{ driver: Driver, image_url: string }>()
);

export const uploadDriverAvatarFailure = createAction(
  '[UpdateDriverProfile] Upload Driver Avatar Failure',
  props<{ error: any }>()
);
