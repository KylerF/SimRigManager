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
      order: [[ 5, "desc" ]], 
      pageLength: 10, 
      columnDefs:[
        {
          orderData: 6, 
          targets: 5
        },
      ], 
      dom: 'Qlfrtip'
    };

    // Get laptimes from server
    this.getLapTimes();
  }

  /**
   * Fetch the top lap times from the API
   */
  getLapTimes() {
    this.lapTimeService.getLapTimes().subscribe(
      response => {
        // Success!
        this.lapTimes = response;
        this.loading = false;

        // Render the datatable
        this.dtTrigger.next();
      },
      error => {
        // Failed. Save the response.
        this.error = error;
        this.loading = false;
      }
    );
  }

  /**
   * Clean up resources
   */
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
