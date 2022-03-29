import * as QuoteActions from './quote.actions';

describe('Quote', () => {
  it('should create an instance', () => {
    expect(new QuoteActions.LoadQuote()).toBeTruthy();
  });
});
