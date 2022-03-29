import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SpeedometerComponent } from './speedometer.component';

describe('SpeedometerComponent', () => {
  let component: SpeedometerComponent;
  let fixture: ComponentFixture<SpeedometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedometerComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
