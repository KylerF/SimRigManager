import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ControllerService } from './controller.service';

describe('ControllerService', () => {
  let service: ControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
