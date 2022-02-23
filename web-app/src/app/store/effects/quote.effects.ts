import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs';

import { QuoteService } from '../../services/quote.service';
import { QuoteActionTypes } from '../actions/quote.actions';

@Injectable()
export class QuoteEffects {
  constructor(
    private actions$: Actions,
    private quoteService: QuoteService
  )
  { }

  /**
   * Retrieve a random quote from the API
   */
  loadQuote$ = createEffect(() => this.actions$.pipe(
    ofType(QuoteActionTypes.LoadQuote),
    mergeMap(() => this.quoteService.getRandomQuote()
      .pipe(
        map(
          quote => ({
            type: QuoteActionTypes.LoadQuoteSuccess,
            payload: {
              data: quote
            }
          })
        ),
        catchError(
          error => [{
            type: QuoteActionTypes.LoadQuoteFailure,
            payload: error
          }]
        )
      ))
    )
  );
}
