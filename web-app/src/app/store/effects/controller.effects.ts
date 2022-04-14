import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, Observable } from 'rxjs';

import { ControllerService } from 'services/controller.service';
import { ControllerActionTypes } from '../actions/controller.actions';

@Injectable()
export class ControllerEffects {
  private readonly POLL_INTERVAL = 5000;
  private stopPolling$ = new Observable<void>();

  constructor(
    private actions$: Actions,
    private controllerService: ControllerService
  )
  { }

  /**
   * Retrieve all WLED light controllers from the API
   */
  loadControllers$ = createEffect(() => this.actions$.pipe(
    ofType(ControllerActionTypes.LoadControllers),
    mergeMap(() => this.controllerService.getControllers()
      .pipe(
        map(
          controllers => ({
            type: ControllerActionTypes.LoadControllersSuccess,
            payload: {
              data: controllers
            }
          })
        ),
        catchError(
          error => [{
            type: ControllerActionTypes.LoadControllersFailure,
            payload: { error: error.message }
          }]
        )
      ))
    )
  );
}
