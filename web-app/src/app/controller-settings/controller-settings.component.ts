import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  connecting: boolean;
  ipValid: boolean;

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

  /**
   * Populate the settings form with controller details
   */
  ngOnInit(): void {
    this.controllerSettingsForm.get('name').setValue(this.controller.name);
    this.controllerSettingsForm.get('ipAddress').setValue(this.controller.ipAddress);
    this.controllerSettingsForm.get('universe').setValue(this.controller.universe);
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

  /**
   * Test the controller connection with given IP address
   * 
   * @param controller controller to check
   */
  testIp() {
    this.connecting = true;
    this.ipValid = null;

    this.controllerService.testIp(this.controllerSettingsForm.get('ipAddress').value).subscribe(
      response => {
        // Connection succeeded
        this.connecting = false;
        this.ipValid = true;
      }, 
      error => {
        // Connection failed
        this.connecting = false;
        this.ipValid = false;
      }
    );
  }
  
  /**
   * If valid, update the controller settings
   */
  onSubmit() {
    this.submitted = true;

    if (this.controllerSettingsForm.valid) {
      this.updateController();
    }
  }

  /**
   * Update the controller settings via the API
   */
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
