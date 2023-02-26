import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { IncidentCountDisplayComponent } from './incident-count-display.component';

describe('IncidentCountDisplayComponent', () => {
  let component: IncidentCountDisplayComponent;
  let fixture: ComponentFixture<IncidentCountDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentCountDisplayComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCountDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
