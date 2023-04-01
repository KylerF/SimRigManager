import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BestLapTimeDisplayComponent } from './best-lap-time-display.component';

describe('BestLapTimeDisplayComponent', () => {
  let component: BestLapTimeDisplayComponent;
  let fixture: ComponentFixture<BestLapTimeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestLapTimeDisplayComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestLapTimeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
