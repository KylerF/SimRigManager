import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-select-driver',
  templateUrl: './select-driver.component.html',
  styleUrls: ['./select-driver.component.css']
})
export class SelectDriverComponent implements OnInit {
  drivers: Driver[];
  selectedDriver: Driver;
  error: string;
  
  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.getDrivers();
    this.getSelectedDriver();
  }

  getDrivers() {
    this.driverService.getDrivers().subscribe(
      response => {
        // Success! 
        this.drivers = response;
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

  selectDriver(driver: Driver) {
    this.selectedDriver = driver;
  }
}
