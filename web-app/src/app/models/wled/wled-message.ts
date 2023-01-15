import { Info } from "./info";
import { State } from "./state";

/**
 * Model interface for WLED message sent to or received from the controller
 */
export interface WledMessage {
  // Parameters sent to the controller
  v?: boolean; // A message with this parameter set to true will update state
  on?: boolean; // Set the power state of the controller

  // Parameters received from the controller
  state?: State;
  info?: Info;
  effects?: string[];
  palettes?: string[];
}
