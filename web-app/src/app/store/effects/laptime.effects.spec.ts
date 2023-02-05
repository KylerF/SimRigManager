import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { LaptimeEffects } from './laptime.effects';

describe('LaptimeEffects', () => {
  let actions$: Observable<any>;
  let effects: LaptimeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule
      ],
      providers: [
        LaptimeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LaptimeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
