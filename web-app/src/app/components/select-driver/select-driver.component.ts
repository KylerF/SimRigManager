import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Driver } from '../../models/driver';
import { DriverService } from '../../services/driver.service';
import { NewDriverComponent } from '../new-driver/new-driver.component';

@Component({
  selector: 'app-select-driver',
  templateUrl: './select-driver.component.html',
  styleUrls: ['./select-driver.component.scss']
})

/**
 * Component to show the driver selection table
 */
export class SelectDriverComponent implements OnInit {
  drivers: Driver[] = [];
  selectedDriver: Driver;
  driverChanged: boolean;

  loading: boolean = true;
  error: any;

  constructor(
    private driverService: DriverService, // Used to query drivers and active driver
    private modalService: NgbModal // Service to display and interface with modal dialogs
  )
  { }

  ngOnInit(): void {
    this.getDrivers();
    this.getSelectedDriver();
  }

  /**
   * Get all available drivers
   */
  getDrivers() {
    this.driverService.getDrivers().subscribe(
      response => {
        // Success!
        this.loading = false;
        this.drivers = response;
      },
      error => {
        // Failed. Save the response.
        this.error = error;
      }
    );
  }

  /**
   * Get the currently selected driver
   */
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

  /**
   * Sign in with the selected driver profile
   *
   * @param driver the selected driver profile
   */
  selectDriver(driver: Driver) {
    if(this.selectedDriver && driver.id === this.selectedDriver.id) {
      return;
    }

    this.driverService.selectDriver(driver).subscribe(
      response => {
        this.selectedDriver = response;
        this.driverChanged = true;
      },
      error => {
        this.error = error;
      }
    )
  }

  /**
   * Show the modal new driver form
   */
  showAddDriverDialog() {
    const modalRef = this.modalService.open(NewDriverComponent, { centered: true });

    // Add the new driver after successful creation
    modalRef.result.then((newDriver) => {
      this.drivers.push(newDriver);
    })
    .catch(_ => {
      // Cancelled
      {}
    });
  }
}
