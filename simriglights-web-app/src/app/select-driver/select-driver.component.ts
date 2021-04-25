import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActiveDriver } from '../models/active-driver';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';
import { NewDriverComponent } from '../new-driver/new-driver.component';

@Component({
  selector: 'app-select-driver',
  templateUrl: './select-driver.component.html',
  styleUrls: ['./select-driver.component.css']
})
export class SelectDriverComponent implements OnInit {
  drivers: Driver[] = [];
  selectedDriver: ActiveDriver;
  error: string;
  
  constructor(
    private driverService: DriverService, // Used to query drivers and active driver
    private modalService: NgbModal // Service to display and interface with modal dialogs
  ) 
  { }

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
    if(this.selectedDriver && driver.id === this.selectedDriver.driver.id) { 
      return; 
    }
    
    this.driverService.selectDriver(driver).subscribe(
      response => {
        this.selectedDriver = response;
      }, 
      error => {
        this.error = error;
      }
    )
  }

  /**
   * Show the modal cart dialog
   */
   showAddDriverDialog() {
    const modalRef = this.modalService.open(NewDriverComponent, { centered: true });

    // Add the new driver after successful creation
    modalRef.result.then((newDriver) => {
      this.drivers.push(newDriver);
    }); 
  }
}
