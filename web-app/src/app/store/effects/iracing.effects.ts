import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs';

import { IracingDataService } from 'services/iracing-data.service';
import { IracingActionTypes } from '../actions/iracing.actions';

@Injectable()
export class IracingEffects {
  constructor(
    private actions$: Actions,
    private iracingDataService: IracingDataService
  )
  { }

  /**
   * Get the latest iRacing data from the API
   */
  getLatest$ = createEffect(() => this.actions$.pipe(
    ofType(IracingActionTypes.UpdateIracing),
    mergeMap(() => this.iracingDataService.getLatest()
      .pipe(
        map(
          latest => ({
            type: IracingActionTypes.UpdateIracingSuccess,
            payload: {
              data: latest
            }
          })
        ),
        catchError(
          error => [{
            type: IracingActionTypes.UpdateIracingFailure,
            payload: error
          }]
        )
      )
    )
  ));
}

