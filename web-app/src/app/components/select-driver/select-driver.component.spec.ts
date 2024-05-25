import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { SelectDriverComponent } from './select-driver.component';

describe('SelectDriverComponent', () => {
  let component: SelectDriverComponent;
  let fixture: ComponentFixture<SelectDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectDriverComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
