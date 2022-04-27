import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ipAddressValidatorFunction } from 'directives/validators/ip-address-validator-function';
import { ControllerService } from 'services/controller.service';
import { Controller } from 'models/controller';
import { Driver } from 'models/driver';
import { Store } from '@ngrx/store';
import { State } from 'store/reducers';
import { GetControllerSettings, UpdateControllerSettings } from 'store/actions/controller.actions';

@Component({
  selector: 'app-controller-settings',
  templateUrl: './controller-settings.component.html',
  styleUrls: ['./controller-settings.component.scss']
})

/**
 * Modal component used to edit a controller's settings
 */
export class ControllerSettingsComponent implements OnInit {
  @Input() public controller: Controller;
  @Input() public activeDriver: Driver;

  availableEffects: string[];

  connecting: boolean;
  ipValid: boolean;

  submitted = false;
  error: any;

  // Create the reactive controller form with validation
  controllerSettingsForm = this.formBuilder.group({
    name: ['', Validators.required],
    ipAddress: ['', [Validators.required, ipAddressValidatorFunction()]],
    universe: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]],
    colorTheme: [''],
    idleEffect: [''],
    autoOn: [false]
  });

  constructor(
    private controllerService: ControllerService, // Used to edit controller settings
    private activeModal: NgbActiveModal, // Used to reference the modal in which this component is displayed
    private formBuilder: FormBuilder, // Used to build the controller settings form
    private store: Store<State>
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
    this.getControllerSettings();

    if (this.controller.isAvailable) {
      this.ipValid = true;
    }
  }

  /**
   * Query current user settings for the controller
   */
  getControllerSettings() {
    this.store.dispatch(GetControllerSettings({
      payload: {
        data: {
          controller: this.controller,
          driver: this.activeDriver
        }
      }
    }));
  }

  /**
   * Query available effects from provided controller
   */
  getAvailableEffects() {
    this.controllerService.getControllerState(this.controller).subscribe({
      next: state => this.availableEffects = state.effects.sort(),
      error: error => this.error = error.message
    });
  }

  /**
   * Test the controller connection with given IP address
   *
   * @param controller controller to check
   */
  testIp() {
    this.connecting = true;
    this.ipValid = null;

    this.controllerService.testIp(this.controllerSettingsForm.get('ipAddress').value).subscribe({
      next: controller => {
        this.connecting = false;
        this.ipValid = true;
      },
      error: error => {
        this.connecting = false;
        this.ipValid = false;
      }
    });
  }

  /**
   * Called when new text is entered in the IP address field
   */
  ipChanged() {
    this.ipValid = null;
  }

  /**
   * If valid, update the controller settings
   */
  onSubmit() {
    this.submitted = true;

    if (this.controllerSettingsForm.valid) {
      this.updateController();
      this.activeModal.close();
    }
  }

  /**
   * Update the controller settings via the API
   */
  updateController() {
    let updatedController = {
      id: this.controller.id,
      name: this.controllerSettingsForm.get('name').value,
      ipAddress: this.controllerSettingsForm.get('ipAddress').value,
      universe: this.controllerSettingsForm.get('universe').value
    };

    this.store.dispatch(UpdateControllerSettings({
      controller: updatedController
    }));
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
