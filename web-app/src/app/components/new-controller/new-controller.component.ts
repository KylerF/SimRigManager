import { FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewController } from '../../models/new-controller';

import { ControllerService } from '../../services/controller.service';
import { ipAddressValidatorFunction } from '../../directives/validators/ip-address-validator-function';

@Component({
  selector: 'app-new-controller',
  templateUrl: './new-controller.component.html',
  styleUrls: ['./new-controller.component.scss']
})

/**
 * Modal component to show the light controller creation form
 */
export class NewControllerComponent {
  @ViewChild('closebutton') closebutton;

  newController: NewController = { 'name': '', 'ipAddress': '', 'universe': null };
  submitted = false;
  error: string;

  // Create the reactive controller form with validation
  newControllerForm = this.formBuilder.group({
    name: ['', Validators.required],
    ipAddress: ['', [Validators.required, ipAddressValidatorFunction()]],
    universe: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]]
  });

  constructor(
    private controllerService: ControllerService, // Used to add a new controller
    private activeModal: NgbActiveModal, // Used to reference the modal in which this component is displayed
    private formBuilder: FormBuilder // Used to build the new driver form
  )
  { }

  /**
   * Called when the new driver form is submitted. If valid, the
   * driver is added.
   */
   onSubmit() {
    this.submitted = true;

    if(this.newControllerForm.valid) {
      this.addController();
    }
  }

  /**
   * Add the controller to the database
   */
  addController() {
    this.controllerService.addController(this.newController).subscribe({
      next: controller => this.activeModal.close(controller),
      error: error => this.error = error
    });
  }

  /**
   * Called when the X button is selected
   */
  dismiss() {
    this.activeModal.dismiss();
  }

  /**
   * Helper function to get the list of form controls
   */
  get formControls() {
    return this.newControllerForm.controls;
  }
}
