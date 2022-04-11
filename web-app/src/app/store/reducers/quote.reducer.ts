import * as quoteActions from '../actions/quote.actions';
import { Quote } from 'models/quote';
import { StateContainer } from 'models/state';
import * as moment from 'moment';

export const quoteFeatureKey = 'quote';

export const initialState: StateContainer<Quote> = {
  state: {
    id: 0,
    text: '',
    by: ''
  },
  error: '',
  lastUpdated: null
};

export function reducer(
  state = initialState,
  action: quoteActions.QuoteActions
): StateContainer<Quote> {
  switch (action.type) {
    case quoteActions.QuoteActionTypes.LoadQuoteSuccess:
      return handleLoadQuoteSuccess(action);
    case quoteActions.QuoteActionTypes.LoadQuoteFailure:
      return handleLoadQuoteFailure(action);
    default:
      return state;
  }
}

/**
 * A response from the API was received
 *
 * @param action load quote success action
 * @returns quote data
 */
 function handleLoadQuoteSuccess(
   action: quoteActions.LoadQuoteSuccess
  ): StateContainer<Quote> {
  return {
    state: {
      id: action.payload.data.id,
      text: action.payload.data.text,
      by: action.payload.data.by
    },
    error: '',
    lastUpdated: moment().toDate()
  };
}

/**
 * No response from the API
 *
 * @returns a default quote
 */
function handleLoadQuoteFailure(
  action: quoteActions.LoadQuotesFailure
): StateContainer<Quote> {
  return {
    state: {
      id: 0,
      text: '',
      by: ''
    },
    error: action.payload.error,
    lastUpdated: moment().toDate()
  }
}
