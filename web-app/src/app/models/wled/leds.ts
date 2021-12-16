/**
 * Model interface for 'leds' info returned from WLED API
 */
export interface Leds {
    count: number;
    rgbw: boolean;
    wv: boolean;
    pin: [number];
    pwr: number;
    maxpwr: number;
    maxseg: number;
    seglock: false;
}
