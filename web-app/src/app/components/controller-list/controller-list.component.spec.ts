import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ControllerListComponent } from './controller-list.component';

describe('ControllerListComponent', () => {
  let component: ControllerListComponent;
  let fixture: ComponentFixture<ControllerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllerListComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
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
