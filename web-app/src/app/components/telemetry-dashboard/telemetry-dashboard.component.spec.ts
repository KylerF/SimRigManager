import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TelemetryDashboardComponent } from './telemetry-dashboard.component';

describe('TelemetryDashboardComponent', () => {
  let component: TelemetryDashboardComponent;
  let fixture: ComponentFixture<TelemetryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelemetryDashboardComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemetryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
