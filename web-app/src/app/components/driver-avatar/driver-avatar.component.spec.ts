import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DriverAvatarComponent } from './driver-avatar.component';

describe('DriverAvatarComponent', () => {
  let component: DriverAvatarComponent;
  let fixture: ComponentFixture<DriverAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverAvatarComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
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
