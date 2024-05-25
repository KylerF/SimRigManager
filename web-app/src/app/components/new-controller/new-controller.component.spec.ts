import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { NewControllerComponent } from './new-controller.component';

describe('NewControllerComponent', () => {
  let component: NewControllerComponent;
  let fixture: ComponentFixture<NewControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewControllerComponent],
      imports: [StoreModule.forRoot({})],
      providers: [NgbActiveModal, UntypedFormBuilder, provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
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
