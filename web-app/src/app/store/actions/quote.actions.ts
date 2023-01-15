import { createAction, props } from '@ngrx/store';

import { Quote } from 'models/quote';

export enum QuoteActionTypes {
  LoadQuote = '[Quote] Load Quote',
  LoadQuoteSuccess = '[Quote] Load Quote Success',
  LoadQuoteFailure = '[Quote] Load Quote Failure',
}

export const LoadQuote = createAction(
  QuoteActionTypes.LoadQuote
);

export const LoadQuoteSuccess = createAction(
  QuoteActionTypes.LoadQuoteSuccess,
  props<{ payload: { data: Quote } }>()
);

export const LoadQuoteFailure = createAction(
  QuoteActionTypes.LoadQuoteFailure,
  props<{ payload: { error: any } }>()
);
