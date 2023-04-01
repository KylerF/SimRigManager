import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DeltaDisplayComponent } from './delta-display.component';

describe('DeltaDisplayComponent', () => {
  let component: DeltaDisplayComponent;
  let fixture: ComponentFixture<DeltaDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeltaDisplayComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeltaDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
