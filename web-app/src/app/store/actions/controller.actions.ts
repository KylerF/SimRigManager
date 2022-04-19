import { createAction, props } from '@ngrx/store';

import { Controller } from 'models/controller';
import { ControllerSettings } from 'models/controller-settings';
import { Driver } from 'models/driver';
import { WledState } from 'models/wled/wled-state';

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

  // Actions for updating a controller
  UpdateController = '[Controller] Update Controller',
  UpdateControllerSuccess = '[Controller] Update Controller Success',
  UpdateControllerFailure = '[Controller] Update Controller Failure',

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
 * Action dispatched to get controller settings
 */
export const GetControllerSettings = createAction(
  ControllerActionTypes.GetControllerSettings,
  props<{ payload: { data: { controller: Controller, driver: Driver } } }>()
);

export const GetControllerSettingsSuccess = createAction(
  ControllerActionTypes.GetControllerSettingsSuccess,
  props<{ payload: { data: ControllerSettings } }>()
);

export const GetControllerSettingsFailure = createAction(
  ControllerActionTypes.GetControllerSettingsFailure,
  props<{ payload: { error: any } }>()
);

/**
 * Action dispatched by components to update the status of a light controller
 * @param controllerId The ID of the controller to update
 */
export const UpdateControllerState = createAction(
  ControllerActionTypes.UpdateControllerState,
  props<{ controller: Controller }>()
);

export const UpdateControllerStateSuccess = createAction(
  ControllerActionTypes.UpdateControllerStateSuccess,
  props<{ payload: { controller: Controller, data: WledState } }>()
);

export const UpdateControllerStateFailure = createAction(
  ControllerActionTypes.UpdateControllerStateFailure,
  props<{ payload: { controller: Controller, error: any } }>()
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
 * Action dispatched by components to update a light controller
 * @param controller The controller to update
 */
 export const UpdateController = createAction(
  ControllerActionTypes.UpdateController,
  props<{ controller: Controller }>()
);

export const UpdateControllerSuccess = createAction(
  ControllerActionTypes.UpdateControllerSuccess,
  props<{ payload: { data: Controller } }>()
);

export const UpdateControllerFailure = createAction(
  ControllerActionTypes.UpdateControllerFailure,
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
