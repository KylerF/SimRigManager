import * as quoteActions from '../actions/quote.actions';
import { Quote } from 'models/quote';

export const quoteFeatureKey = 'quote';

export const initialState: Quote = {
  id: 0,
  text: '',
  by: ''
};

export function reducer(state = initialState, action: quoteActions.QuoteActions): Quote {
  switch (action.type) {
    case quoteActions.QuoteActionTypes.LoadQuoteSuccess:
      return handleLoadQuoteSuccess(action);
    case quoteActions.QuoteActionTypes.LoadQuoteFailure:
      return handleLoadQuoteFailure();
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
 function handleLoadQuoteSuccess(action: quoteActions.LoadQuoteSuccess): Quote {
  return {
    id: action.payload.data.id,
    text: action.payload.data.text,
    by: action.payload.data.by
  };
}

/**
 * No response from the API
 *
 * @returns a default quote
 */
function handleLoadQuoteFailure(): Quote {
  return initialState;
}
