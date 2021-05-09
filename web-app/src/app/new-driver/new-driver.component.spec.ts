import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDriverComponent } from './new-driver.component';

describe('NewDriverComponent', () => {
  let component: NewDriverComponent;
  let fixture: ComponentFixture<NewDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
