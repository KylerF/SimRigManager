import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiHealthcheckEffects } from './api-healthcheck.effects';

describe('ApiHealthcheckEffects', () => {
  let actions$: Observable<any>;
  let effects: ApiHealthcheckEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ApiHealthcheckEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ApiHealthcheckEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
