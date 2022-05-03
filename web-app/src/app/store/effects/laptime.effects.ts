import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { LapTimeService } from 'src/app/services/lap-time.service';
import { LaptimeActionTypes } from '../actions/laptime.actions';
import * as laptimeActions from '../actions/laptime.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LaptimeEffects {
  constructor(
    private actions$: Actions,
    private lapTimeService: LapTimeService
  ) { }

  loadLaptimes$ = createEffect(() => this.actions$.pipe(
    ofType(laptimeActions.loadLaptimes),
    mergeMap(() => this.lapTimeService.getLapTimes()
      .pipe(
        map(
          laptimes => laptimeActions.loadLaptimesSuccess({
            payload: {
              data: laptimes
            }
          })
        ),
        catchError(
          error => of(laptimeActions.loadLaptimesFailure({
            payload: {
              error: error.message
            }
          }))
        )
      ))
    )
  );
}
