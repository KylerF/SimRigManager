import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { LapTimeGQL, LapTimeService } from 'src/app/services/lap-time.service';
import * as laptimeActions from 'store/actions/laptime.actions';
import { catchError, map, mergeMap, of, takeUntil } from 'rxjs';

@Injectable()
export class LaptimeEffects {
  constructor(
    private actions$: Actions,
    private lapTimeService: LapTimeService,
    private lapTimeGQL: LapTimeGQL
  ) { }

  // Get all lap times
  loadLaptimes$ = createEffect(() => this.actions$.pipe(
    ofType(laptimeActions.LoadLaptimes),
    mergeMap(() => this.lapTimeGQL.fetch()
      .pipe(
        map(
          response => laptimeActions.LoadLaptimesSuccess({
            payload: {
              data: response.data.laptimes
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
