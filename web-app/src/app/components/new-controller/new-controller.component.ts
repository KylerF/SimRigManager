import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { selectControllers, State } from 'store/reducers';

import { ipAddressValidatorFunction } from 'directives/validators/ip-address-validator-function';
import { CreateController } from 'store/actions/controller.actions';
import { Controller } from 'models/controller';
import { StateContainer } from 'models/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-controller',
  templateUrl: './new-controller.component.html',
  styleUrls: ['./new-controller.component.scss']
})

/**
 * Modal component to show the light controller creation form
 */
export class NewControllerComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  controllers: Controller[];
  submitted = false;
  loading = false;
  error: string;

  newControllerForm: FormGroup;

  constructor(
    private activeModal: NgbActiveModal, // Used to reference the modal in which this component is displayed
    private formBuilder: FormBuilder, // Used to build the new driver form
    private store: Store<State>
  )
  { }

  ngOnInit() {
    // Create the reactive controller form with validation
    this.newControllerForm = this.formBuilder.group({
      name: ['', Validators.required],
      ipAddress: ['', [Validators.required, ipAddressValidatorFunction()]],
      universe: ['', [Validators.required, Validators.pattern('^[1-9]\d*$')]]
    });

    // Keep track of current controllers
    this.store.select(selectControllers)
      .subscribe((controllers: StateContainer<Controller[]>) => {
        this.controllers = controllers.state;
        this.loading = controllers.loading;
      });
  }

  /**
   * Called when the new controller form is submitted. If valid, the
   * controller is added.
   */
  onSubmit() {
    this.submitted = true;

    if(this.newControllerForm.valid) {
      // Validate that the controller does not already exist
      if (this.controllers.find(controller =>
        controller.ipAddress === this.newControllerForm.value.ipAddress)
      ) {
        this.error = 'IP address already in use';
        return;
      }
      if (this.controllers.find(controller =>
        controller.name === this.newControllerForm.value.name)
      ) {
        this.error = 'Controller name already in use';
        return;
      }

      // Add the new controller
      this.addController();
      this.activeModal.close();
    }
  }

  /**
   * Add the controller to the database
   */
  addController() {
    this.store.dispatch(CreateController({
      payload: {
        data: {
          id: null,
          name: this.newControllerForm.value.name,
          ipAddress: this.newControllerForm.value.ipAddress,
          universe: this.newControllerForm.value.universe
        }
      }
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
    return this.newControllerForm.controls;
  }
}
