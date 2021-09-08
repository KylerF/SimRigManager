import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { IracingDataService } from './iracing-data.service';

describe('IracingDataService', () => {
  let service: IracingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(IracingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
