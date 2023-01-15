import { TestBed } from '@angular/core/testing';

import { IracingGraphqlService } from './iracing-graphql.service';

describe('IracingGraphqlService', () => {
  let service: IracingGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IracingGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
