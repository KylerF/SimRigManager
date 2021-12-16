/**
 * Unit tests for the DriverService
 */
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DriverService } from './driver.service';

describe('DriverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DriverService ]
    });
  });

  it('should be created', inject([DriverService], (service: DriverService) => {
    expect(service).toBeTruthy();
  }));
});
