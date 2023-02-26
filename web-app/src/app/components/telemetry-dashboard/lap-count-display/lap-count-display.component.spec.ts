import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LapCountDisplayComponent } from './lap-count-display.component';

describe('LapCountDisplayComponent', () => {
  let component: LapCountDisplayComponent;
  let fixture: ComponentFixture<LapCountDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LapCountDisplayComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LapCountDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
