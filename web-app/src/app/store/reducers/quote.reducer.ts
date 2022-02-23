import * as quoteActions from '../actions/quote.actions';
import { Quote } from '../../models/quote';

export const quoteFeatureKey = 'quote';

export const initialState: Quote = {
  id: 0,
  text: '',
  by: ''
};

export function reducer(state = initialState, action: quoteActions.QuoteActions): Quote {
  switch (action.type) {
    case quoteActions.QuoteActionTypes.LoadQuoteSuccess:
      return hanndleLoadQuoteSuccess(action);
    case quoteActions.QuoteActionTypes.LoadQuoteFailure:
      return hanndleLoadQuoteFailure();
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
 function hanndleLoadQuoteSuccess(action: quoteActions.LoadQuoteSuccess): Quote {
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
function hanndleLoadQuoteFailure(): Quote {
  return initialState;
}
