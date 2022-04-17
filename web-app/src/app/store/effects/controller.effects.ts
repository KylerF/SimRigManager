import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Controller } from 'models/controller';
import { mergeMap, map, catchError, Observable, switchMap, of } from 'rxjs';

import { ControllerService } from 'services/controller.service';
import * as controllerActions from '../actions/controller.actions';

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
    ofType(controllerActions.LoadControllers),
    mergeMap(() => this.controllerService.getControllers()
      .pipe(
        map(
          controllers => controllerActions.LoadControllersSuccess({ payload: { data: controllers } })
        ),
        catchError(
          error => of(controllerActions.LoadControllersFailure({ payload: { error: error.message } }))
        )
      ))
    )
  );

  /**
   * Update the state of a WLED light controller
   */
  updateControllerState$ = createEffect(() => this.actions$.pipe(
    ofType(controllerActions.UpdateControllerState),
    mergeMap(action => this.controllerService.getControllerState(action.controller)
      .pipe(
        map(
          controllerState => controllerActions.UpdateControllerStateSuccess({
            payload: {
              controller: action.controller,
              data: controllerState
            }
          })
        ),
        catchError(
          error => of(controllerActions.UpdateControllerStateFailure({
            payload: {
              controller: action.controller,
              error: error.message
            }
          })
        ))
      ))
    )
  );

  /**
   * Get controller settings
   */
  getControllerSettings$ = createEffect(() => this.actions$.pipe(
    ofType(controllerActions.GetControllerSettings),
    switchMap(action => this.controllerService.getControllerSettings(
      action.payload.data.controller,
      action.payload.data.driver
    )
    .pipe(
      map(
        controllerSettings => controllerActions.GetControllerSettingsSuccess({
          payload: {
            data: controllerSettings
          }
        })
      ),
      catchError(
        error => of(controllerActions.GetControllerSettingsFailure({ payload: error }))
      )
    ))
  ));

  /**
   * Create a new WLED light controller
   */
  createController$ = createEffect(() => this.actions$.pipe(
    ofType(controllerActions.CreateController),
    switchMap(action => {
      return this.controllerService.addController(action.payload.data).pipe(
        map((controller: Controller) => {
          return controllerActions.CreateControllerSuccess({ payload: { data: controller } });
        }),
        catchError(error => {
          return of(controllerActions.CreateControllerFailure({payload: { error: error } }));
        })
      )
    })
  ));

  /**
   * Delete a WLED light controller
   */
  deleteController$ = createEffect(() => this.actions$.pipe(
    ofType(controllerActions.DeleteController),
    switchMap(action => {
      return this.controllerService.deleteController(action.payload.data).pipe(
        map((controller: Controller) => {
          return controllerActions.DeleteControllerSuccess({ payload: { data: controller } });
        }),
        catchError(error => {
          return of(controllerActions.DeleteControllerFailure({ payload: { error: error } }));
        })
      )
    })
  ));
}
