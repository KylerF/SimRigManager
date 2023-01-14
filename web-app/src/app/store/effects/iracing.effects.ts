import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { IracingDataService } from 'services/iracing-data.service';

import * as iracingActions from '../actions/iracing.actions';

@Injectable()
export class IracingEffects {
  constructor(
    private actions$: Actions,
    private iracingDataService: IracingDataService
  )
  { }

  /**
   * Get connection status
   */
  /*
  getConnectionStatus$ = createEffect(() => this.actions$.pipe(
    ofType(iracingActions.GetConnectionStatus),
    mergeMap(() => this.iracingDataService.getConnectionStatus()
      .pipe(
        map(
          connected => iracingActions.GetConnectionStatusSuccess({ status: {connected: connected} })
        ),
        catchError(
          error => of(iracingActions.GetConnectionStatusFailure({ error: error.message }))
        )
      ))
    )
  );
  */
}
