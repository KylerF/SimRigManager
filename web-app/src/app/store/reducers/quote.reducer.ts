import { createReducer, on } from '@ngrx/store';
import moment from 'moment';

import * as quoteActions from 'store/actions/quote.actions';
import { StateContainer } from 'models/state';
import { Quote } from 'models/quote';

export const quoteFeatureKey = 'quote';

export const initialState: StateContainer<Quote> = {
  state: {
    id: 0,
    text: '',
    by: '',
  },
  error: null,
  loading: false,
  lastUpdated: null,
};

export const reducer = createReducer(
  initialState,
  on(quoteActions.LoadQuote, (state) => ({
    ...state,
    loading: true,
  })),
  on(quoteActions.LoadQuoteSuccess, (state, action) => ({
    state: action.payload.data,
    error: null,
    loading: false,
    lastUpdated: moment().toDate(),
  })),
  on(quoteActions.LoadQuoteFailure, (state, action) => ({
    ...state,
    error: action.payload.error,
    loading: false,
    lastUpdated: moment().toDate(),
  }))
);
