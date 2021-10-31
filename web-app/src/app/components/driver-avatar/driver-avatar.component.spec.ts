import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverAvatarComponent } from './driver-avatar.component';

describe('DriverAvatarComponent', () => {
  let component: DriverAvatarComponent;
  let fixture: ComponentFixture<DriverAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
