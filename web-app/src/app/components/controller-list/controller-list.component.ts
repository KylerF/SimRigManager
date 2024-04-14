import { Component, OnDestroy, OnInit } from '@angular/core';
import { State, selectControllers } from 'store/reducers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { ControllerSettingsComponent } from 'components/controller-settings/controller-settings.component';
import { LoadControllers, DeleteController, StartStream } from 'store/actions/controller.actions';
import { NewControllerComponent } from 'components/new-controller/new-controller.component';
import { ControllerService } from 'services/controller.service';
import { DriverService } from 'services/driver.service';
import { Controller } from 'models/controller';
import { first, Observable, take } from 'rxjs';
import { StateContainer } from 'models/state';

@Component({
  selector: 'app-controller-list',
  templateUrl: './controller-list.component.html',
  styleUrls: ['./controller-list.component.scss'],
})

/**
 * Component to list and configure WLED controllers
 */
export class ControllerListComponent implements OnInit, OnDestroy {
  controllers$: Observable<StateContainer<Controller[]>>;
  loading: boolean = true;
  error: string;

  constructor(
    private controllerService: ControllerService, // Used to query WLED light controllers
    private modalService: NgbModal, // Service to display and interface with modal dialogs
    private driverService: DriverService,
    private store: Store<State>
  ) {}

  // Poll controllers to update their status
  ngOnInit(): void {
    this.controllers$ = this.store.select(selectControllers);
    this.getControllers();
    this.startControllerUpdates();
  }

  /**
   * Retrieve configured WLED controllers, and start updating their status
   */
  getControllers() {
    this.store.dispatch(LoadControllers());
  }

  /**
   * Connect to WLED controllers and start updating their status
   */
  startControllerUpdates() {
    this.controllers$
      .pipe(
        first((controllers) =>
          controllers.state.some((controller) => controller.isAvailable == undefined)
        )
      )
      .subscribe({
        next: (controllers) => {
          controllers.state.forEach((controller) => {
            if (controller.isAvailable == undefined) {
              this.store.dispatch(StartStream({ controller: controller }));
            }
          });
        },
        error: (error) => (this.error = error.message),
      });
  }

  /**
   * Toggle the power of a controller
   *
   * @param controller controller to toggle
   */
  togglePowerController(controller: Controller) {
    this.controllerService.togglePowerController(controller);
  }

  /**
   * Delete a controller
   */
  deleteController(controller: Controller) {
    this.store.dispatch(
      DeleteController({
        payload: {
          data: controller,
        },
      })
    );
  }

  /**
   * Show the modal controller settings dialog
   */
  editController(controller: Controller) {
    this.driverService.getSelectedDriver().subscribe({
      next: (driver) => {
        const modalRef = this.modalService.open(ControllerSettingsComponent, { centered: true });

        modalRef.componentInstance.controller = controller;
        modalRef.componentInstance.activeDriver = driver;

        modalRef.result
          .then(() => {
            // Update controller state
            this.startControllerUpdates();
          })
          .catch((_) => {
            // Cancelled
            {
            }
          });
      },
      error: (error) => (this.error = error.message),
    });
  }

  /**
   * Show the modal add controller dialog
   */
  showAddControllerDialog() {
    const modalRef = this.modalService.open(NewControllerComponent, { centered: true });

    modalRef.result
      .then(() => {
        // Update controller state
        this.startControllerUpdates();
      })
      .catch((_) => {
        // Cancelled
        {
        }
      });
  }

  ngOnDestroy() {
    this.controllers$.pipe(take(1)).subscribe({
      next: (controllers) => {
        controllers?.state.forEach((controller) => {
          this.controllerService.disconnectController(controller);
        });
      },
      error: (error) => (this.error = error.message),
    });
  }
}
