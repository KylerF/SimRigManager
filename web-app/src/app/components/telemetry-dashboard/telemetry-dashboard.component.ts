import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { first, Subscription } from 'rxjs';
import { isEmpty } from 'lodash-es';

import { IracingDataService } from 'services/iracing-data.service';

@Component({
  selector: 'app-telemtry-display',
  templateUrl: './telemetry-dashboard.component.html',
  styleUrls: ['./telemetry-dashboard.component.scss'],
  standalone: false,
})

/**
 * Dashboard to show real time iRacing data
 */
export class TelemetryDashboardComponent implements OnInit, OnDestroy {
  iracingDataSubscription: Subscription;
  error: string;

  /**
   * Get the current iRacing data status (true if data available, false otherwise)
   */
  get iracingDataAvailable() {
    return this.iracingDataService.getConnectionStatus().pipe(first()) && !this.error;
  }

  /**
   * Inject dependencies and set up a websocket connection
   * to the iRacing stream
   *
   * @param iracingDataService service to stream iRacing data
   * @param renderer render graphics in response to changes
   */
  constructor(private iracingDataService: IracingDataService) {}

  /**
   * Start updating the dashboard with the latest iRacing data
   */
  ngOnInit(): void {
    this.subscribeToIracingData();
  }

  /**
   * Destroy the websocket connection when the component is destroyed
   */
  ngOnDestroy(): void {
    this.iracingDataSubscription.unsubscribe();
    this.iracingDataService.stopStream();
  }

  /**
   * Subscribe to the iRacing data stream
   */
  subscribeToIracingData() {
    this.iracingDataService.startStream();

    this.iracingDataSubscription = this.iracingDataService.latestData$.subscribe({
      next: (data) => {
        if (isEmpty(data)) {
          this.error = 'No data available';
        } else {
          this.error = null;
        }
      },
    });
  }

  /**
   * Save the drag position of components in the dashboard
   *
   * @param event drag event
   */
  onDragEnded($event: CdkDragEnd) {
    //TODO: save the position of the component
    //console.log($event.source.getFreeDragPosition());
  }

  /**
   * Start playback of the recorded session
   */
  startPlayback() {
    this.iracingDataService.startPlayback().subscribe({
      next: () => {
        console.log('Playback started');
      },
      error: (err) => {
        console.error('Error starting playback', err);
      },
    });
  }

  /**
   * Stop playback of the recorded session
   */
  stopPlayback() {
    this.iracingDataService.stopPlayback().subscribe({
      next: () => {
        console.log('Playback stopped');
      },
      error: (err) => {
        console.error('Error stopping playback', err);
      },
    });
  }

  /**
   * Pause playback of the recorded session
   */
  pausePlayback() {
    this.iracingDataService.pausePlayback().subscribe({
      next: () => {
        console.log('Playback paused');
      },
      error: (err) => {
        console.error('Error pausing playback', err);
      },
    });
  }

  /**
   * Rewind playback of the recorded session
   */
  rewindPlayback() {
    this.iracingDataService.rewindPlayback().subscribe({
      next: () => {
        console.log('Playback rewinded');
      },
      error: (err) => {
        console.error('Error rewinding playback', err);
      },
    });
  }

  /**
   * Set playback speed of the recorded session
   *
   * @param speed playback speed
   */
  setPlaybackSpeed(speed: number) {
    this.iracingDataService.setPlaybackSpeed(speed).subscribe({
      next: () => {
        console.log(`Playback speed set to ${speed}x`);
      },
      error: (err) => {
        console.error('Error setting playback speed', err);
      },
    });
  }
}
