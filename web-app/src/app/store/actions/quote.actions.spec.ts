import * as quoteActions from './quote.actions';

describe('Quote', () => {
  it('should create an instance', () => {
    expect(quoteActions.LoadQuote()).toBeTruthy();
  });
});
