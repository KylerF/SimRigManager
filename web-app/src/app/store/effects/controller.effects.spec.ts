import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ControllerEffects } from './controller.effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ControllerEffects', () => {
  let actions$: Observable<any>;
  let effects: ControllerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ControllerEffects,
        provideMockActions(() => actions$),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(ControllerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
