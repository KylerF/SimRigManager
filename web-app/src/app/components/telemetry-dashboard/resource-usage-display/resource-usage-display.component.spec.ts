import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ResourceUsageDisplayComponent } from './resource-usage-display.component';

describe('ResourceUsageDisplayComponent', () => {
  let component: ResourceUsageDisplayComponent;
  let fixture: ComponentFixture<ResourceUsageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceUsageDisplayComponent],
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceUsageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
