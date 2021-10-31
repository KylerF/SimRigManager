/**
 * Helper class to provide mathematical constants
 */
export class Constants {
    /**
     * meters/second to miles/hour multiplier
     */
    static get speedMphMultiplier(): number {
        return 2.236936;
    }

    /**
     * meters/second to kilometers/hour multiplier
     */
    static get speedKphMultiplier(): number {
        return 3.6;
    }

    /**
     * Vertical acceleration due to gravity at sea level (m/s^2)
     */
    static get g(): number {
        return 9.80665;
    }

    /**
     * Radius of the Earth (km)
     */
    static get re(): number {
        return 6371.009;
    }
}