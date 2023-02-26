import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { LapTimeGQL, LapTimeService } from 'src/app/services/lap-time.service';
import { catchError, map, mergeMap, of, takeUntil } from 'rxjs';
import * as laptimeActions from 'store/actions/laptime.actions';

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
    mergeMap(action => this.lapTimeGQL.fetch(action.params)
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
  ));

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
