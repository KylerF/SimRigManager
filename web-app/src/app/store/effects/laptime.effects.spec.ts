import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { LaptimeEffects } from './laptime.effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LaptimeEffects', () => {
  let actions$: Observable<any>;
  let effects: LaptimeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        LaptimeEffects,
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(LaptimeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
