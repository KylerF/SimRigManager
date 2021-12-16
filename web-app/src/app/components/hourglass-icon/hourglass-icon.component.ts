import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-hourglass-icon',
  templateUrl: './hourglass-icon.component.html',
  styleUrls: ['./hourglass-icon.component.scss']
})

/**
 * Animated hourglass icon, based on Bootstrap Icons
 */
export class HourglassIconComponent implements OnInit {
  stage: number = 0;
  tick = timer(1000, 1000);

  constructor() { }

  /**
   * Subscribe to the rxjs timer, and update each tick
   */
  ngOnInit(): void {
    this.tick.subscribe(_ => {
      this.update();
    });
  }

  /**
   * Increment the animation stage
   */
  update() {
    this.stage = (this.stage + 1) % 4;
  }
}
