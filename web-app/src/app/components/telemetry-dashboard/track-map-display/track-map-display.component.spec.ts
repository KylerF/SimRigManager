import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMapDisplayComponent } from './track-map-display.component';

describe('TrackMapDisplayComponent', () => {
  let component: TrackMapDisplayComponent;
  let fixture: ComponentFixture<TrackMapDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackMapDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMapDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
