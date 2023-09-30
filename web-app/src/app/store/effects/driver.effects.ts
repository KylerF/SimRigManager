import { catchError, map, mergeMap, switchMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as driverActions from 'store/actions/driver.actions';
import {
  ActiveDriverGQL,
  DriversGQL,
  DriverService,
  SelectDriverGQL,
} from 'services/driver.service';

@Injectable()
export class DriverEffects {
  constructor(
    private actions$: Actions,
    private activeDriverService: ActiveDriverGQL,
    private allDriversService: DriversGQL,
    private setActiveDriverService: SelectDriverGQL,
    private driverService: DriverService
  ) {}

  loadActiveDriver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverActions.loadActiveDriver),
      switchMap(() =>
        this.activeDriverService.subscribe().pipe(
          map((result) =>
            driverActions.loadActiveDriverSuccess({ data: result.data.activeDriver })
          ),
          catchError((error) => of(driverActions.loadActiveDriverFailure({ error: error.message })))
        )
      )
    )
  );

  setActiveDriver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverActions.setActiveDriver),
      mergeMap((action) =>
        this.setActiveDriverService.mutate({ driverId: action.driver.id }).pipe(
          map((result) =>
            driverActions.setActiveDriverSuccess({ data: result.data.setActiveDriver })
          ),
          catchError((error) => of(driverActions.setActiveDriverFailure({ error: error.message })))
        )
      )
    )
  );

  uploadDriverAvatar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverActions.uploadDriverAvatar),
      mergeMap((action) =>
        this.driverService.uploadProfilePic(action.driver.id, action.file).pipe(
          map((avatar) =>
            driverActions.uploadDriverAvatarSuccess({
              driver: action.driver,
              image_url: avatar.image_url,
            })
          ),
          catchError((error) =>
            of(
              driverActions.uploadDriverAvatarFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  getAllDrivers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverActions.loadAllDrivers),
      switchMap(() =>
        this.allDriversService.fetch().pipe(
          map((result) => driverActions.loadAllDriversSuccess({ data: result.data.drivers })),
          catchError((error) => of(driverActions.loadAllDriversFailure({ error: error.message })))
        )
      )
    )
  );
}
