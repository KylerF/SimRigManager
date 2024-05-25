import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DriverAvatarComponent } from './driver-avatar.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DriverAvatarComponent', () => {
  let component: DriverAvatarComponent;
  let fixture: ComponentFixture<DriverAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverAvatarComponent],
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
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
