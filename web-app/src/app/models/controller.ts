import { WledState } from "./wled/wled-state";

/**
 * Model class for a WLED controller
 */
export interface Controller {
    id: number;
    name: string;
    ipAddress: string;
    universe: number;
    isBeingEdited: boolean;
    isAvailable: boolean;
    state: WledState;
}
