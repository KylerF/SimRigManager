import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourglassIconComponent } from './hourglass-icon.component';

describe('HourglassIconComponent', () => {
  let component: HourglassIconComponent;
  let fixture: ComponentFixture<HourglassIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourglassIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourglassIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
