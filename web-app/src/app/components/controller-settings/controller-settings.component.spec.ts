import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { ControllerSettingsComponent } from './controller-settings.component';

describe('ControllerSettingsComponent', () => {
  let component: ControllerSettingsComponent;
  let fixture: ComponentFixture<ControllerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerSettingsComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({})
      ],
      providers: [
        NgbActiveModal,
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerSettingsComponent);
    component = fixture.componentInstance;
    component.controller = {
      id: 1,
      name: 'TestController',
      ipAddress: '127.0.0.1',
      universe: 1,
      isAvailable: false,
      state: null
    };
    component.activeDriver = {
      id: 1,
      name: 'TestDriver',
      nickname: 'test',
      trackTime: 60,
      profilePic: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
