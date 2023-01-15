/**
 * Unit tests for the DriverService
 */
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import { DriverService, ActiveDriverGQL } from './driver.service';

describe('ActiveDriverGQL', () => {
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ]
    });

    controller = TestBed.inject(ApolloTestingController);
  });

  it('should be created', inject([ActiveDriverGQL], (service: ActiveDriverGQL) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    controller.verify();
  });
});


describe('DriverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([DriverService], (service: DriverService) => {
    expect(service).toBeTruthy();
  }));
});
