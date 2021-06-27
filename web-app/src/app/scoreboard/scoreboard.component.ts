import { Component, OnInit } from '@angular/core';

import { LapTimeService } from '../services/lap-time.service';
import { LapTime } from '../models/lap-time';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})

/**
 * Component to render the scoreboard table
 */
export class ScoreboardComponent implements OnInit {
  lapTimes: LapTime[] = [];
  loading: boolean = true;
  error: string;

  // Datatables configuration
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private lapTimeService: LapTimeService) { }

  ngOnInit(): void {
    // Set datatables options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    // Get laptimes from server
    this.getLapTimes();
  }

  getLapTimes() {
    this.lapTimeService.getLapTimes().subscribe(
      response => {
        // Success!
        this.lapTimes = response;

        // Render the datatable
        this.dtTrigger.next();

        this.loading = false;
      },
      error => {
        // Failed. Save the response.
        this.error = error;
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
