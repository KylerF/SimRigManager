import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import { QuoteService } from 'services/quote.service';
import * as quoteActions from '../actions/quote.actions';

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
    ofType(quoteActions.LoadQuote),
    mergeMap(() => this.quoteService.getRandomQuote()
      .pipe(
        map(
          controllers => quoteActions.LoadQuoteSuccess({ payload: { data: controllers } })
        ),
        catchError(
          error => of(quoteActions.LoadQuoteFailure({ payload: error }))
        )
      ))
    )
  );
}
