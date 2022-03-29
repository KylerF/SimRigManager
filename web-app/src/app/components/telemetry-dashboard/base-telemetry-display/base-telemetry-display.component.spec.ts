import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BaseTelemetryDisplayComponent } from './base-telemetry-display.component';

describe('BaseTelemetryDisplayComponent', () => {
  let component: BaseTelemetryDisplayComponent;
  let fixture: ComponentFixture<BaseTelemetryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTelemetryDisplayComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTelemetryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
