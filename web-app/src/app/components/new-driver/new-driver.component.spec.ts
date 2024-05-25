import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NewDriverComponent } from './new-driver.component';

describe('NewDriverComponent', () => {
  let component: NewDriverComponent;
  let fixture: ComponentFixture<NewDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDriverComponent],
      imports: [],
      providers: [NgbActiveModal, UntypedFormBuilder, provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
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
