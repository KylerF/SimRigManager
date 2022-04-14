import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ControllerEffects } from './controller.effects';

describe('ControllerEffects', () => {
  let actions$: Observable<any>;
  let effects: ControllerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ControllerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ControllerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
