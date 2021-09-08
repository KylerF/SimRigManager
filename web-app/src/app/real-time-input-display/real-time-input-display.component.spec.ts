import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeInputDisplayComponent } from './real-time-input-display.component';

describe('RealTimeInputDisplayComponent', () => {
  let component: RealTimeInputDisplayComponent;
  let fixture: ComponentFixture<RealTimeInputDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealTimeInputDisplayComponent ] ,
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeInputDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
