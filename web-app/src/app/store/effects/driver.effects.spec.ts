import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import { DriverEffects } from './driver.effects';

describe('DriverEffects', () => {
  let controller: ApolloTestingController;
  let actions$: Observable<any>;
  let effects: DriverEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ApolloTestingModule
      ],
      providers: [
        DriverEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DriverEffects);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
