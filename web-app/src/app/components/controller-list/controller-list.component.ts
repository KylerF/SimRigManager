import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from "rxjs/internal/observable/interval";
import { startWith } from "rxjs/operators";
import { Store } from '@ngrx/store';
import { State, selectControllers } from 'store/reducers';

import { ControllerSettingsComponent } from '../controller-settings/controller-settings.component';
import { NewControllerComponent } from '../new-controller/new-controller.component';
import { ControllerService } from 'services/controller.service';
import { DriverService } from 'services/driver.service';
import { Controller } from 'models/controller';
import { Observable, Subscription } from 'rxjs';
import { LoadControllers, DeleteController, UpdateControllerState } from 'store/actions/controller.actions';
import { StateContainer } from 'models/state';

@Component({
  selector: 'app-controller-list',
  templateUrl: './controller-list.component.html',
  styleUrls: ['./controller-list.component.scss']
})

/**
 * Component to list and configure WLED controllers
 */
export class ControllerListComponent implements OnInit, OnDestroy {
  controllers$: Observable<StateContainer<Controller[]>>;
  controllers: Controller[];
  loading: boolean = true;
  error: string;

  private wledPoller: Subscription;

  constructor(
    private controllerService: ControllerService, // Used to query WLED light controllers
    private modalService: NgbModal, // Service to display and interface with modal dialogs
    private driverService: DriverService,
    private store: Store<State>
  ) { }

  // Poll controllers to update their status
  ngOnInit(): void {
    this.controllers$ = this.store.select(selectControllers);
    this.controllers$.subscribe({
      next: controllers => {
        if (!this.controllers && controllers.lastUpdated) {
          this.controllers = controllers.state;
          // Poll controllers to update their status
          this.wledPoller = interval(10000)
            .pipe(startWith(0)).subscribe(() => {
              this.controllers.forEach(controller => {
                this.getControllerState(controller);
              });
            });
        }
      },
      error: error => this.error = error.message
    });

    this.getControllers();
  }

  /**
   * Retrieve configured WLED controllers, and start polling their status
   * TODO: Poll all controller states
   */
  getControllers() {
    this.store.dispatch(LoadControllers());
  }

  /**
   * Get the state of a controller
   *
   * @param controller controller from which to retrieve data
   */
  getControllerState(controller: Controller) {
    this.store.dispatch(UpdateControllerState({
      controller: controller
    }));
  }

  /**
   * Toggle the power of a controller
   *
   * @param controller controller to toggle
   */
  togglePowerController(controller: Controller) {
    this.controllerService.togglePowerController(controller).subscribe({
      next: _ => this.getControllerState(controller),
      error: error => this.error = error.message
    });
  }

  /**
   * Delete a controller
   */
  deleteController(controller: Controller) {
    this.store.dispatch(DeleteController({
      payload: {
        data: controller
      }
    }));
  }

  /**
   * Show the modal controller settings dialog
   */
  editController(controller: Controller) {
    this.driverService.getSelectedDriver().subscribe({
      next: driver => {
        const modalRef = this.modalService.open(ControllerSettingsComponent, { centered: true });
        modalRef.componentInstance.controller = controller;
        modalRef.componentInstance.activeDriver = driver;

        // Update controller in table after changes are made
        modalRef.result.then((updatedController: Controller) => {
          this.getControllers();
        })
        .catch(_ => {
          // Cancelled
          {}
        });
      },
      error: error => this.error = error.message
    });
  }

  /**
   * Show the modal add controller dialog
   */
  showAddControllerDialog() {
    const modalRef = this.modalService.open(NewControllerComponent, { centered: true });

    // Add the new controller after successful creation
    modalRef.result.then((newController) => {
      //this.controllers.push(newController);
      this.getControllerState(newController);
    })
    .catch(_ => {
      // Cancelled
      {}
    });
  }

  ngOnDestroy() {
    this.wledPoller.unsubscribe();
  }
}
