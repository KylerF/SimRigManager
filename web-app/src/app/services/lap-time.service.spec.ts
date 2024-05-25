import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LapTimeService } from './lap-time.service';

describe('LapTimeService', () => {
  let service: LapTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    });
    service = TestBed.inject(LapTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
