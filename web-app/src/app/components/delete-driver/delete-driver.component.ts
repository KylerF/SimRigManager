import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DriverService } from '../../services/driver.service';
import { Driver } from '../../models/driver';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.scss']
})

/**
 * Modal component to confirm driver profile deletion
 */
export class DeleteDriverComponent {
  @Input() driver: Driver
  error: string;

  constructor(
    private driverService: DriverService, // Used to delete the driver profile
    private activeModal: NgbActiveModal // Used to reference the modal in which this component is displayed
  )
  { }

  /**
   * Submit the request to delete a driver profile.
   * This is called after confirming, for sure, that the
   * user wants to do this.
   */
  deleteDriver() {
    this.driverService.deleteDriver(this.driver).subscribe(
      response => {
        // Close and return the new driver to parent
        this.activeModal.close(response);
      },
      error => {
        this.error = error;
      }
    )
  }

  /**
   * Dismiss the modal, cancelling the request
   */
  dismiss() {
    this.activeModal.dismiss();
  }
}
