/**
 * Model interface for 'leds' info returned from WLED API
 */
export interface Leds {
  count: number;
  pwr: number;
  fps: number;
  maxpwr: number;
  maxseg: number;
  seglc: number[];
  lc: number;
  rgbw: boolean;
  wv: number;
  cct: number;
}
