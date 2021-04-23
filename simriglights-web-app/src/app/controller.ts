/**
 * Model class for a WLED controller
 */
export interface Controller {
    id: Number;
    name: String;
    ipAddress: String;
    universe: Number;
    isBeingEdited: Boolean;
}
