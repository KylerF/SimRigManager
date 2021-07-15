import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerSettingsComponent } from './controller-settings.component';

describe('ControllerSettingsComponent', () => {
  let component: ControllerSettingsComponent;
  let fixture: ComponentFixture<ControllerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
