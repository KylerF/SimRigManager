import { Component, OnInit } from '@angular/core';
import { LapTime } from '../models/lap-time';
import { LapTimeService } from '../services/lap-time.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  lapTimes: LapTime[] = [];
  loading: boolean;
  error: string;
  
  constructor(private lapTimeService: LapTimeService) { }

  ngOnInit(): void {
    this.getLapTimes();
  }

  getLapTimes() {
    this.loading = true;

    this.lapTimeService.getLapTimes().subscribe(
      response => {
        // Success! Sort by set date by default.
        this.lapTimes = response.sort((laptime1, laptime2) => {
          return +new Date(laptime2.setAt) - +new Date(laptime1.setAt);
        });

        this.loading = false;
      },
      error => {
        // Failed. Save the response.
        this.error = error;
        this.loading = false;
      }
    );
  }
}
