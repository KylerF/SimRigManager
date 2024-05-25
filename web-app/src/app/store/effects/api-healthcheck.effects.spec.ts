import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ApiHealthcheckEffects } from './api-healthcheck.effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ApiHealthcheckEffects', () => {
  let actions$: Observable<any>;
  let effects: ApiHealthcheckEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ApiHealthcheckEffects,
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(ApiHealthcheckEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
