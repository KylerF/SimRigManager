import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerListComponent } from './controller-list.component';

describe('ControllerListComponent', () => {
  let component: ControllerListComponent;
  let fixture: ComponentFixture<ControllerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
