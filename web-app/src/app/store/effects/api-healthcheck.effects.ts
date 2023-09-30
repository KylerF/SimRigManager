import { map, mergeMap, catchError, takeUntil } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, Observable, timer } from 'rxjs';
import { Injectable } from '@angular/core';

import * as apiHealthcheckActions from 'store/actions/api-healthcheck.actions';
import { AvailabilityService } from 'services/availability.service';

@Injectable()
export class ApiHealthcheckEffects {
  private readonly POLL_INTERVAL = 5000;
  private stopPolling$ = new Observable<void>();

  constructor(private actions$: Actions, private availabilityService: AvailabilityService) {}

  /**
   * Check the backend API status periodically and update the store
   */
  startHealthcheckPolling$ = createEffect(
    () =>
      ({ scheduler = asyncScheduler, stopTimer = this.stopPolling$ } = {}) =>
        this.actions$.pipe(
          ofType(apiHealthcheckActions.UpdateApiHealthcheck),
          mergeMap(() =>
            timer(0, this.POLL_INTERVAL, scheduler).pipe(
              takeUntil(stopTimer),
              mergeMap(() =>
                this.availabilityService.getAPIAvailability().pipe(
                  map((availability) => ({
                    type: apiHealthcheckActions.ApiHealthcheckActionTypes
                      .UpdateApiHealthcheckSuccess,
                    payload: {
                      data: availability,
                    },
                  })),
                  catchError((error) => [
                    {
                      type: apiHealthcheckActions.ApiHealthcheckActionTypes
                        .UpdateApiHealthcheckFailure,
                      payload: { error: error.message },
                    },
                  ])
                )
              )
            )
          )
        )
  );
}
