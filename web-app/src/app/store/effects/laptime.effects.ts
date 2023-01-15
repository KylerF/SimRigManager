import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { LapTimeService } from 'src/app/services/lap-time.service';
import * as laptimeActions from 'store/actions/laptime.actions';
import { catchError, map, mergeMap, of, takeUntil } from 'rxjs';

@Injectable()
export class LaptimeEffects {
  constructor(
    private actions$: Actions,
    private lapTimeService: LapTimeService
  ) { }

  // Get all lap times
  loadLaptimes$ = createEffect(() => this.actions$.pipe(
    ofType(laptimeActions.LoadLaptimes),
    mergeMap(() => this.lapTimeService.getLapTimes()
      .pipe(
        map(
          laptimes => laptimeActions.LoadLaptimesSuccess({
            payload: {
              data: laptimes
            }
          })
        ),
        catchError(
          error => of(laptimeActions.LoadLaptimesFailure({
            payload: {
              error: error.message
            }
          }))
        )
      ))
    )
  );

  // Stream new lap times
  streamLaptimes$ = createEffect(() => this.actions$.pipe(
    ofType(laptimeActions.StreamLaptimes),
    mergeMap(() => this.lapTimeService.streamLapTimes()
      .pipe(
        takeUntil(this.actions$.pipe(
          ofType(laptimeActions.StopStreamLaptimes)
        )),
        map(
          laptime => laptimeActions.AddLaptime({
            payload: {
              data: laptime
            }
          })
        )
      ))
    )
  );
}
