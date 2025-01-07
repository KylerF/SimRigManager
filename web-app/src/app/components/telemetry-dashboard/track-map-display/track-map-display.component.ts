import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'lodash-es';

import { BaseTelemetryDisplayComponent } from 'components/telemetry-dashboard/base-telemetry-display/base-telemetry-display.component';
import { IracingDataService } from 'services/iracing-data.service';

@Component({
    selector: 'app-track-map-display',
    templateUrl: './track-map-display.component.html',
    styleUrls: ['./track-map-display.component.scss'],
    standalone: false
})

/**
 * Component to draw a track map. If an existing track map is not available, it will
 * be generated from the driver's position on the track. To determine the position,
 * the driver's X and Y velocity is recorded throughout a lap.
 */
export class TrackMapDisplayComponent extends BaseTelemetryDisplayComponent implements OnInit {
  xVelocity: number;
  yVelocity: number;
  currentPosition: Position;
  isOnTrack: boolean;
  lapPctComplete: number;
  startLapPctComplete: number;
  trackMapPoints: Set<Position>;

  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;

  constructor(iracingDataService: IracingDataService) {
    super(iracingDataService);
  }

  /**
   * Subscribe to iRacing data and start updating the track map
   */
  ngOnInit() {
    super.ngOnInit();

    // Get the canvas element from the template and set the context
    this.canvas = document.getElementById('trackMap') as HTMLCanvasElement;
    this.canvasContext = this.canvas.getContext('2d');

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe((data) => {
      if (!isEmpty(data)) {
        if (!this.startLapPctComplete) {
          // Get the lap percentage at startup - used to
          this.startLapPctComplete = data.LapDistPct;
        }

        this.xVelocity = data.VelocityX;
        this.yVelocity = data.VelocityY;
        this.lapPctComplete = data.LapDistPct;
        this.isOnTrack = data.IsOnTrack;

        this.drawTrackMap();
      }
    });
  }

  /**
   * Draw the track map on the canvas
   */
  drawTrackMap() {
    if (this.trackMapPoints) {
      this.drawTrackMapPoints();
    } else {
      this.generateTrackMapPoints();
    }
  }

  /**
   * Draw the track map points on the canvas
   */
  drawTrackMapPoints() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = '#000000';
    this.canvasContext.lineWidth = 2;

    this.trackMapPoints.forEach((point) => {
      this.canvasContext.moveTo(point.x, point.y);
      this.canvasContext.lineTo(point.x, point.y);
    });

    this.canvasContext.stroke();
  }

  /**
   * Generate the track map points from the driver's position on the track
   */
  generateTrackMapPoints() {}
}

/**
 * Represents a position (x/y coordinates) on the track map
 */
type Position = {
  x: number;
  y: number;
};
