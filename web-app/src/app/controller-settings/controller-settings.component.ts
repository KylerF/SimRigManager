import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { ControllerService } from '../services/controller.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Controller } from '../models/controller';

@Component({
  selector: 'app-controller-settings',
  templateUrl: './controller-settings.component.html',
  styleUrls: ['./controller-settings.component.css']
})

/**
 * Modal component used to edit a controller's settings
 */
export class ControllerSettingsComponent implements OnInit {
  @Input() public controller: Controller;
  availableEffects: [string];

  submitted = false;
  error: any;

  // Create the reactive controller form with validation
  controllerSettingsForm = this.formBuilder.group({
    name: ['', Validators.required],
    ipAddress: ['', Validators.required],
    universe: ['', Validators.required],
    colorTheme: [''],
    idleEffect: [''],
    autoOn: [false]
  });
  
  constructor(
    private controllerService: ControllerService, // Used to edit controller settings
    private activeModal: NgbActiveModal, // Used to reference the modal in which this component is displayed
    private formBuilder: FormBuilder // Used to build the controller settings form
  )
  { }

  ngOnInit(): void {
    this.getAvailableEffects();
  }

  /**
   * Query available effects from provided controller
   */
  getAvailableEffects() {
    this.controllerService.getControllerEffects(this.controller).subscribe(
      effects => {
        this.availableEffects = effects;
      }, 
      error => {
        this.error = error;
      }
    )
  }
  
  onSubmit() {
    if (this.controllerSettingsForm.valid) {
      this.submitted = true;
    }
  }

  updateController() {
    
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
    return this.controllerSettingsForm.controls;
  }
}
