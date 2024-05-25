import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { QuoteEffects } from './quote.effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('QuoteEffects', () => {
  let actions$: Observable<any>;
  let effects: QuoteEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        QuoteEffects,
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(QuoteEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
