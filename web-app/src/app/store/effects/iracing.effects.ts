import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { IracingActionTypes } from '../actions/iracing.actions';

@Injectable()
export class IracingEffects {
  constructor(
    private actions$: Actions,
  )
  { }

  /**
   * Update iRacing connection status
   */
  setIracingConnected$ = createEffect(() => this.actions$.pipe(
    ofType(IracingActionTypes.UpdateIracing),
    map(() => {
      return {
        type: IracingActionTypes.UpdateIracingSuccess,
        payload: {
          data: {
            connected: true,
          }
        }
      }
    })
  ));

  /**
   * Update iRacing connection status
   */
  setIracingDisconnected$ = createEffect(() => this.actions$.pipe(
    ofType(IracingActionTypes.UpdateIracing),
    map(() => {
      return {
        type: IracingActionTypes.UpdateIracingSuccess,
        payload: {
          data: {
            connected: false,
          }
        }
      }
    })
  ));
}
