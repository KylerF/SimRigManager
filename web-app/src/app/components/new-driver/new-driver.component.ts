import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DriverService } from 'services/driver.service';
import { NewDriver } from 'models/new-driver';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.component.html',
  styleUrls: ['./new-driver.component.scss']
})

/**
 * Modal component to show the driver creation form
 */
export class NewDriverComponent implements OnInit {
  newDriver: NewDriver = {
    name: '',
    nickname: '',
    profilePic: ''
  };

  submitted = false;
  error: string;

  newDriverForm: FormGroup;

  constructor(
    private driverService: DriverService, // Used to add a new driver
    private activeModal: NgbActiveModal, // Used to reference the modal in which this component is displayed
    private formBuilder: FormBuilder // Used to build the new driver form
  )
  { }

  ngOnInit() {
    // Create the reactive driver form with validation
    this.newDriverForm = this.formBuilder.group({
      name: ['', Validators.required],
      nickname: ['', Validators.required],
    });
  }

  /**
   * Called when the new driver form is submitted. If valid, the
   * driver is added.
   */
  onSubmit() {
    this.submitted = true;

    if(this.newDriverForm.valid) {
      this.addDriver();
    }
  }

  addDriver() {
    this.driverService.addDriver(this.newDriver).subscribe({
      next: driver => this.activeModal.close(driver),
      error: error => this.error = error
    });
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  /**
   * Helper function to get the list of form controls
   */
  get formControls() {
    return this.newDriverForm.controls;
  }
}
