/**
 * Model class for a WLED controller
 */
export class Controller {
    name: String;
    ipAddress: String;
    universe: Number;
    isBeingEdited = false;

    /**
     * Create a new Controller object mapped to a WLED controller
     * 
     * @param name name for the controller
     * @param ipAddress network location of the controller
     * @param universe start universe specified in WLED
     */
    constructor(name: String, ipAddress: String, universe: Number) {
        this.name = name;
        this.ipAddress = ipAddress;
        this.universe = universe;
    }

    startEditing() {
        this.isBeingEdited = true;
    }

    stopEditing() {
        this.isBeingEdited = false;
    }
}
