import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CurrentLapTimeDisplayComponent } from './current-lap-time-display.component';

describe('CurrentLapTimeDisplayComponent', () => {
  let component: CurrentLapTimeDisplayComponent;
  let fixture: ComponentFixture<CurrentLapTimeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentLapTimeDisplayComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLapTimeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
