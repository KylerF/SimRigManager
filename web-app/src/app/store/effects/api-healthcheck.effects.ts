import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, Observable, timer } from 'rxjs';
import { map, mergeMap, catchError, takeUntil } from 'rxjs/operators';

import { AvailabilityService } from 'services/availability.service';
import { ApiHealthcheckActionTypes } from '../actions/api-healthcheck.actions';

@Injectable()
export class ApiHealthcheckEffects {
  private readonly POLL_INTERVAL = 5000;
  private stopPolling$ = new Observable<void>();

  constructor(
    private actions$: Actions,
    private availabilityService: AvailabilityService
  )
  { }

  /**
   * Check the backend API status periodically and update the store
   */
  startHealthcheckPolling$ = createEffect(
    () => ({ scheduler = asyncScheduler, stopTimer = this.stopPolling$ } = {}) =>
    this.actions$.pipe(
      ofType(ApiHealthcheckActionTypes.UpdateApiHealthcheck),
      mergeMap(() => (
        timer(0, this.POLL_INTERVAL, scheduler).pipe(
          takeUntil(stopTimer),
          mergeMap(() => (
            this.availabilityService.getAPIAvailability()
              .pipe(
                map(
                  availability => ({
                    type: ApiHealthcheckActionTypes.UpdateApiHealthcheckSuccess,
                    payload: {
                      data: availability,
                    }
                  })
                ),
                catchError(
                  error => [{
                    type: ApiHealthcheckActionTypes.UpdateApiHealthcheckFailure,
                    payload: error
                  }]
                )
              )
            )
          )
        )
      ))
    )
  );
}
