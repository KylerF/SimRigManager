import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { IracingDataService } from '../services/iracing-data.service';

@Component({
  selector: 'app-real-time-input-display',
  templateUrl: './real-time-input-display.component.html',
  styleUrls: ['./real-time-input-display.component.css']
})
export class RealTimeInputDisplayComponent implements OnInit {
  wheelAngle: number;
  throttle: number;
  brake: number;
  clutch: number;

  wsSubscription: Subscription;

  error: string;

  constructor(
    private iracingDataService: IracingDataService,
    private renderer: Renderer2
  ) 
  { 
    this.wsSubscription =
      this.iracingDataService.getStream()
       .subscribe(
        data => {
          let jsonData = JSON.parse(data);
          this.wheelAngle = jsonData.SteeringWheelAngle;
          this.throttle = jsonData.Throttle;
          this.brake = jsonData.Brake;
          this.clutch = jsonData.Clutch;
          this.rotateWheel(this.wheelAngle);
        },
        err => {
          this.error = err.message;
        }     
      );
  }

  ngOnInit(): void {

  }

  /**
   * Rotate the steering wheel graphic by a given number
   * of radians
   * 
   * @param radians angle to rotate wheel
   */
   rotateWheel(radians: number) {
    const image = document.getElementById('wheel');
    this.renderer.setStyle(
      image,
      'transform',
      `rotate(${-radians}rad)`
    )
  }
}
