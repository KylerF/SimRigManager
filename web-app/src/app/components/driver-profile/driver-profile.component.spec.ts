import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { DriverProfileComponent } from './driver-profile.component';

describe('DriverProfileComponent', () => {
  let component: DriverProfileComponent;
  let fixture: ComponentFixture<DriverProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverProfileComponent],
      imports: [HttpClientModule, RouterTestingModule, StoreModule.forRoot({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
