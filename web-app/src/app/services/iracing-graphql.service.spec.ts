import { inject, TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import { IracingDataGQLWeekendInfo } from './iracing-graphql.service';

describe('IracingDataGQLWeekendInfo', () => {
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ]
    });

    controller = TestBed.inject(ApolloTestingController);
  });

  it('should be created', inject([IracingDataGQLWeekendInfo], (service: IracingDataGQLWeekendInfo) => {
    expect(service).toBeTruthy();
  }));

  afterEach(() => {
    controller.verify();
  });
});
