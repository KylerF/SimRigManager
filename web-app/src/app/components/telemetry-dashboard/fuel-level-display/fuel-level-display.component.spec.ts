import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FuelLevelDisplayComponent } from './fuel-level-display.component';

describe('FuelLevelDisplayComponent', () => {
  let component: FuelLevelDisplayComponent;
  let fixture: ComponentFixture<FuelLevelDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuelLevelDisplayComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelLevelDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
