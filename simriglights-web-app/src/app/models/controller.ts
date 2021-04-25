/**
 * Model class for a WLED controller
 */
export interface Controller {
    id: number;
    name: string;
    ipAddress: string;
    universe: number;
    isBeingEdited: boolean;
}
