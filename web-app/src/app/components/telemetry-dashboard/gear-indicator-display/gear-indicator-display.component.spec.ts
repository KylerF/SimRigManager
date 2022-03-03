import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearIndicatorDisplayComponent } from './gear-indicator-display.component';

describe('GearIndicatorDisplayComponent', () => {
  let component: GearIndicatorDisplayComponent;
  let fixture: ComponentFixture<GearIndicatorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GearIndicatorDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GearIndicatorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
