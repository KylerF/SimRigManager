import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, of } from 'rxjs';

import { ActiveDriverGQL, DriverService } from 'services/driver.service';
import * as driverActions from 'store/actions/driver.actions';


@Injectable()
export class DriverEffects {
  constructor(
    private actions$: Actions,
    private activeDriverService: ActiveDriverGQL,
    private driverService: DriverService,
  ) {}

  loadActiveDriver$ = createEffect(() => this.actions$.pipe(
    ofType(driverActions.loadActiveDriver),
    switchMap(() => this.activeDriverService.subscribe()
      .pipe(
        map(
          result => driverActions.loadActiveDriverSuccess({ data: result.data.activeDriver })
        ),
        catchError(
          error => of(driverActions.loadActiveDriverFailure({ error: error.message }))
        )
      ))
    )
  );

  uploadDriverAvatar$ = createEffect(() => this.actions$.pipe(
    ofType(driverActions.uploadDriverAvatar),
    mergeMap(action => this.driverService.uploadProfilePic(action.driver.id, action.file)
      .pipe(
        map(
          avatar => driverActions.uploadDriverAvatarSuccess({
            driver: action.driver,
            image_url: avatar.image_url
          })
        ),
        catchError(
          error => of(driverActions.uploadDriverAvatarFailure({
            error: error.message
          })
        ))
      ))
    )
  );
}
