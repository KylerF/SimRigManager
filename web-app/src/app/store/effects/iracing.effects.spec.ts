import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { IracingEffects } from './iracing.effects';

describe('IracingEffects', () => {
  let actions$: Observable<any>;
  let effects: IracingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        IracingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(IracingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
