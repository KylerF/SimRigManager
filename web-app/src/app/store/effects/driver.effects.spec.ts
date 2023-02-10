import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DriverEffects } from './driver.effects';

describe('DriverEffects', () => {
  let actions$: Observable<any>;
  let effects: DriverEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DriverEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DriverEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
