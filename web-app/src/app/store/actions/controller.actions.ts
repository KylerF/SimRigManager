import { createAction, props } from '@ngrx/store';

import { ControllerSettings } from 'models/controller-settings';
import { WledMessage } from 'models/wled/wled-message';
import { Controller } from 'models/controller';
import { Driver } from 'models/driver';

export enum ControllerActionTypes {
  // Actions for getting the list of controllers
  LoadControllers = '[Controller] Load Controllers',
  LoadControllersSuccess = '[Controller] Load Controllers Success',
  LoadControllersFailure = '[Controller] Load Controllers Failure',

  // Actions for getting the state of controllers
  UpdateControllerState = '[Controller] Update Controller State',
  UpdateControllerStateSuccess = '[Controller] Update Controller State Success',
  UpdateControllerStateFailure = '[Controller] Update Controller State Failure',

  // Actions for streaming controller state
  StartStream = '[Controller] Start Stream',
  StartStreamSuccess = '[Controller] Start Stream Success',
  StartStreamFailure = '[Controller] Start Stream Failure',
  StopStream = '[Controller] Stop Stream',
  StopStreamSuccess = '[Controller] Stop Stream Success',
  StopStreamFailure = '[Controller] Stop Stream Failure',

  // Actions for getting controller settings
  GetControllerSettings = '[Controller] Get Controller Settings',
  GetControllerSettingsSuccess = '[Controller] Get Controller Settings Success',
  GetControllerSettingsFailure = '[Controller] Get Controller Settings Failure',

  // Actions for creating a new controller
  CreateController = '[Controller] Create Controller',
  CreateControllerSuccess = '[Controller] Create Controller Success',
  CreateControllerFailure = '[Controller] Create Controller Failure',

  // Actions for updating a controller's settings
  UpdateControllerSettings = '[Controller] Update Settings Controller',
  UpdateControllerSettingsSuccess = '[Controller] Update Controller Settings Success',
  UpdateControllerSettingsFailure = '[Controller] Update Controller Settings Failure',

  // Actions for deleting a controller
  DeleteController = '[Controller] Delete Controller',
  DeleteControllerSuccess = '[Controller] Delete Controller Success',
  DeleteControllerFailure = '[Controller] Delete Controller Failure',
}

/**
 * Action dispatched to get the list of controllers
 */
export const LoadControllers = createAction(ControllerActionTypes.LoadControllers);

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
  props<{ payload: { data: { controller: Controller; driver: Driver } } }>()
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
  props<{ payload: { controller: Controller; data: WledMessage } }>()
);

export const UpdateControllerStateFailure = createAction(
  ControllerActionTypes.UpdateControllerStateFailure,
  props<{ payload: { controller: Controller; error: any } }>()
);

/**
 * Action dispatched to subscribe to the state of a light controller using
 * its websocket API
 * @param controller The controller to subscribe to
 */
export const StartStream = createAction(
  ControllerActionTypes.StartStream,
  props<{ controller: Controller }>()
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
export const UpdateControllerSettings = createAction(
  ControllerActionTypes.UpdateControllerSettings,
  props<{ controller: Controller }>()
);

export const UpdateControllerSettingsSuccess = createAction(
  ControllerActionTypes.UpdateControllerSettingsSuccess,
  props<{ payload: { data: Controller } }>()
);

export const UpdateControllerSettingsFailure = createAction(
  ControllerActionTypes.UpdateControllerSettingsFailure,
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
