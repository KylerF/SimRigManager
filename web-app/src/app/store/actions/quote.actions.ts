import { Action } from '@ngrx/store';

import { Quote } from '../../models/quote';

export enum QuoteActionTypes {
  LoadQuote = '[Quote] Load Quote',
  LoadQuoteSuccess = '[Quote] Load Quote Success',
  LoadQuoteFailure = '[Quote] Load Quote Failure',
}

export class LoadQuote implements Action {
  readonly type = QuoteActionTypes.LoadQuote;
}

export class LoadQuoteSuccess implements Action {
  readonly type = QuoteActionTypes.LoadQuoteSuccess;
  constructor(public payload: { data: Quote }) { }
}

export class LoadQuotesFailure implements Action {
  readonly type = QuoteActionTypes.LoadQuoteFailure;
  constructor(public payload: { error: any }) { }
}

export type QuoteActions = LoadQuote | LoadQuoteSuccess | LoadQuotesFailure;
