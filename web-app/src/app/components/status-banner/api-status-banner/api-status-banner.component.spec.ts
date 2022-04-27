import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStatusBannerComponent } from './api-status-banner.component';

describe('ApiStatusBannerComponent', () => {
  let component: ApiStatusBannerComponent;
  let fixture: ComponentFixture<ApiStatusBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiStatusBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiStatusBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
