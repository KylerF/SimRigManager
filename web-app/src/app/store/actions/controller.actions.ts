import { Action } from '@ngrx/store';

import { Controller } from 'models/controller';

export enum ControllerActionTypes {
  // Actions for getting the list of controllers
  LoadControllers = '[Controller] Update Controllers',
  LoadControllersSuccess = '[Controller] Update Controllers Success',
  LoadControllersFailure = '[Controller] Update Controllers Failure',

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
 * Main action dispatched by components to update the light controller
 * status in the store
 */
export class LoadControllers implements Action {
  readonly type = ControllerActionTypes.LoadControllers;
}

/**
 * Triggered when response from the API was received
 */
export class LoadControllersSuccess implements Action {
  readonly type = ControllerActionTypes.LoadControllersSuccess;
  constructor(
    public payload: {
      data: Controller[]
    })
  { }
}

/**
 * Triggered when no response from the API was received
 */
export class LoadControllersFailure implements Action {
  readonly type = ControllerActionTypes.LoadControllersFailure;
  constructor(
    public payload: {
      error: any
    })
  { }
}

/**
 * Action dispatched by components to update the status of a light controller
 * @param controllerId The ID of the controller to update
 */
export class UpdateControllerState implements Action {
  readonly type = ControllerActionTypes.UpdateControllerState;
  constructor(
    public payload:{
      controllerId: number
    })
  { }
}

/**
 * Triggered when response from the API was received
 */
export class UpdateControllerStateSuccess implements Action {
  readonly type = ControllerActionTypes.UpdateControllerStateSuccess;
  constructor(
    public payload: {
      controllerId: number,
      status: Controller
    })
  { }
}

/**
 * Triggered when no response from the API was received
 */
export class UpdateControllerStateFailure implements Action {
  readonly type = ControllerActionTypes.UpdateControllerStateFailure;
  constructor(
    public payload: {
      controllerId: number,
      error: any
    })
  { }
}

export type ControllerActions = LoadControllers              |
                                LoadControllersSuccess       |
                                LoadControllersFailure       |
                                UpdateControllerState        |
                                UpdateControllerStateSuccess |
                                UpdateControllerStateFailure;
