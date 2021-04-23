import { Component, OnInit } from '@angular/core';
import { AvailabilityCheck } from '../availability-check';
import { AvailabilityService } from '../availability.service';
import { Driver } from '../driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  apiActive: boolean;
  selectedDriver: Driver;
  error: string;

  constructor(
    private availabilityService: AvailabilityService, 
    private driverService: DriverService
  ) 
  {}

  ngOnInit(): void {
    this.getAPIAvailable();
    this.getSelectedDriver();
  }

  getAPIAvailable() {
    this.availabilityService.getAPIAvailability().subscribe(
      response => {
        // Success! 
        this.apiActive = response.active;
      },
      error => {
        // Failed. Save the response.
        this.error = error;
      }
    );
  }

  getSelectedDriver() {
    this.driverService.getSelectedDriver().subscribe(
      response => {
        // Success! 
        this.selectedDriver = response;
      },
      error => {
        // Failed. Save the response.
        this.error = error;
      }
    );
  }
}
