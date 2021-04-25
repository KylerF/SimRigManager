import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewController } from '../models/new-controller';

import { ControllerService } from '../services/controller.service';

@Component({
  selector: 'app-new-controller',
  templateUrl: './new-controller.component.html',
  styleUrls: ['./new-controller.component.css']
})
export class NewControllerComponent implements OnInit {
  newController: NewController = { 'name': '', 'ipAddress': '', 'universe': null };
  submitted = false;
  error: string;

  // Create the reactive driver form with validation
  newControllerForm = this.formBuilder.group({
    name: ['', Validators.required],
    ipAddress: ['', Validators.required],
    universe: ['', Validators.required]
  });

  constructor(
    private controllerService: ControllerService, // Used to add a new controller
    private activeModal: NgbActiveModal, // Used to reference the modal in which this component is displayed
    private formBuilder: FormBuilder // Used to build the new driver form
  ) 
  { }

  ngOnInit(): void {
  }

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

  addController() {
    this.controllerService.addController(this.newController).subscribe(
      response => {
        // Close and return the new controller to parent
        this.activeModal.close(response);
      }, 
      error => {
        this.error = error;
      }
    )
  }

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
