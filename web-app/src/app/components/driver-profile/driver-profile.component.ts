import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { DeleteDriverComponent } from 'components/delete-driver/delete-driver.component';
import { DriverService } from 'services/driver.service';
import { DriverStats } from 'models/driver-stats';
import { Driver } from 'models/driver';
import { selectActiveDriver, State } from 'store/reducers';
import * as driverActions from 'store/actions/driver.actions';

@Component({
    selector: 'app-driver-profile',
    templateUrl: './driver-profile.component.html',
    styleUrls: ['./driver-profile.component.scss'],
    standalone: false
})

/**
 * Component to show the active driver's profile details and allow
 * the user to edit them
 */
export class DriverProfileComponent implements OnInit {
  driver: Driver;
  driverStats: DriverStats;
  editingProfile: boolean;
  profileUpdated: boolean;
  error: string;

  constructor(
    private driverService: DriverService,
    private modalService: NgbModal,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActiveDriver();
  }

  /**
   * Get the active driver to show their profile details
   */
  getActiveDriver() {
    this.store.select(selectActiveDriver).subscribe({
      next: (driver) => {
        if (driver == null) {
          return;
        }

        this.driver = { ...driver };
        this.getDriverStats(driver?.id);
      },
    });
  }

  /**
   * Get stats for a driver (records held, favorite track etc..)
   */
  getDriverStats(driverId) {
    this.driverService.getDriverStats(driverId).subscribe({
      next: (stats) => (this.driverStats = stats),
      error: (error) => (this.error = error.message),
    });
  }

  /**
   * Enable the edit profile form
   */
  editProfile() {
    this.editingProfile = true;
  }

  /**
   * Get the uploaded profile pic and save it
   *
   * @param event triggered by file input (contains image)
   */
  setProfilePic(event) {
    const file: File = event.target.files[0];

    if (!file) {
      // Cancelled
      return;
    }

    this.store.dispatch(
      driverActions.uploadDriverAvatar({
        driver: this.driver,
        file: file,
      })
    );
  }

  /**
   * Cancel the edit
   */
  cancelEdit() {
    this.editingProfile = false;
  }

  /**
   * Save changes to driver profile
   */
  saveProfile() {
    this.driverService.updateDriver(this.driver).subscribe({
      next: (response) => {
        this.driverService.setCachedDriver(response);
        this.driver = response;
        this.profileUpdated = true;
      },
      error: (error) => (this.error = error.message),
    });

    this.editingProfile = false;
  }

  /**
   * Show the modal driver deletion confirmation
   */
  showDeleteProfileDialog() {
    const modalRef = this.modalService.open(DeleteDriverComponent, { centered: true });
    modalRef.componentInstance.driver = this.driver;

    // Add the new driver after successful creation
    modalRef.result
      .then((_) => {
        // Redirect to sign in
        this.router.navigate(['selectdriver']);
      })
      .catch((_) => {
        // Cancelled
        {
        }
      });
  }
}
