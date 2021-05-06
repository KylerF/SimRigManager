import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewControllerComponent } from './new-controller.component';

describe('NewControllerComponent', () => {
  let component: NewControllerComponent;
  let fixture: ComponentFixture<NewControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
