import { DriverService } from '../services/driver.service';
import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.scss']
})

/**
 * Component to show the active driver's profile details and allow
 * the user to edit them
 */
export class DriverProfileComponent implements OnInit {
  driver: Driver;
  editingProfile: boolean;
  profileUpdated: boolean;
  error: string;

  // Updated when avatar is changed to trigger a redraw
  params: string;

  constructor(
    private driverService: DriverService
  ) 
  { }

  ngOnInit(): void {
    this.getActiveDriver();
  }

  /**
   * Get the active driver to show their profile details
   */
  getActiveDriver() {
    this.driverService.getSelectedDriver().subscribe (
      response => {
        this.driver = response;
      }, 
      error => {
        this.error = error.message;
      }
    )
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

    this.driverService.uploadProfilePic(this.driver.id, file).subscribe (
      response => {
        // Add timestamp to src to force an immediate update
        this.params = `?${Date.now().toString()}`;
        this.saveProfile();
      }, 
      error => {
        this.error = error.message;
      }
    )
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
    this.driverService.updateDriver(this.driver).subscribe (
      response => {
        this.driverService.setCachedDriver(response);
        this.driver = response;
        this.profileUpdated = true;
      }, 
      error => {
        this.error = error.message;
      }
    )

    this.editingProfile = false;
  }
}
