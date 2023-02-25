/**
 * Model interface for WLED night light state
 */
export interface Nl {
  on: boolean;   // nightlight currently active
  dur: number;   // duration of nightlight in minutes (1 - 255)
  mode: number;  // nightlight mode (0: instant, 1: fade, 2: color fade, 3: sunrise)
  tbri: number;  // target brightness of nightlight feature
  rem: number;
}
