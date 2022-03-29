/**
 * Model interface for a controller settings profile
 */
export interface ControllerSettings {
  id: number;
  driverId: number;
  controllerId: number;
  colorThemeId: number;
  autoPower: boolean;
  idleEffectId: number;
}
