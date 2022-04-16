import { createAction, props } from '@ngrx/store';

import { Controller } from 'models/controller';

export enum ControllerActionTypes {
  // Actions for getting the list of controllers
  LoadControllers = '[Controller] Load Controllers',
  LoadControllersSuccess = '[Controller] Load Controllers Success',
  LoadControllersFailure = '[Controller] Load Controllers Failure',

  // Actions for getting the state of controllers
  UpdateControllerState = '[Controller] Update Controller State',
  UpdateControllerStateSuccess = '[Controller] Update Controller State Success',
  UpdateControllerStateFailure = '[Controller] Update Controller State Failure',

  // Actions for getting controller settings
  GetControllerSettings = '[Controller] Get Controller Settings',
  GetControllerSettingsSuccess = '[Controller] Get Controller Settings Success',
  GetControllerSettingsFailure = '[Controller] Get Controller Settings Failure',

  // Actions for creating a new controller
  CreateController = '[Controller] Create Controller',
  CreateControllerSuccess = '[Controller] Create Controller Success',
  CreateControllerFailure = '[Controller] Create Controller Failure',

  // Actions for deleting a controller
  DeleteController = '[Controller] Delete Controller',
  DeleteControllerSuccess = '[Controller] Delete Controller Success',
  DeleteControllerFailure = '[Controller] Delete Controller Failure',
}

/**
 * Action dispatched to get the list of controllers
 */
export const LoadControllers = createAction(
  ControllerActionTypes.LoadControllers
);

export const LoadControllersSuccess = createAction(
  ControllerActionTypes.LoadControllersSuccess,
  props<{ payload: { data: Controller[] } }>()
);

export const LoadControllersFailure = createAction(
  ControllerActionTypes.LoadControllersFailure,
  props<{ payload: { error: any } }>()
);

/**
 * Action dispatched by components to update the status of a light controller
 * @param controllerId The ID of the controller to update
 */
export const UpdateControllerState = createAction(
  ControllerActionTypes.UpdateControllerState,
  props<{ controllerId: number }>()
);

export const UpdateControllerStateSuccess = createAction(
  ControllerActionTypes.UpdateControllerStateSuccess,
  props<{ controllerId: number, status: Controller }>()
);

export const UpdateControllerStateFailure = createAction(
  ControllerActionTypes.UpdateControllerStateFailure,
  props<{ controllerId: number, error: any }>()
);

/**
 * Action dispatched by components to create a new light controller
 * @param controller The controller to create
 */
export const CreateController = createAction(
  ControllerActionTypes.CreateController,
  props<{ payload: { data: Controller } }>()
);

export const CreateControllerSuccess = createAction(
  ControllerActionTypes.CreateControllerSuccess,
  props<{ payload: { data: Controller } }>()
);

export const CreateControllerFailure = createAction(
  ControllerActionTypes.CreateControllerFailure,
  props<{ payload: { error: any } }>()
);

/**
 * Action dispatched by components to delete a light controller
 * @param controller The controller to delete
 */
export const DeleteController = createAction(
  ControllerActionTypes.DeleteController,
  props<{ payload: { data: Controller } }>()
);

export const DeleteControllerSuccess = createAction(
  ControllerActionTypes.DeleteControllerSuccess,
  props<{ payload: { data: Controller } }>()
);

export const DeleteControllerFailure = createAction(
  ControllerActionTypes.DeleteControllerFailure,
  props<{ payload: { error: any } }>()
);
