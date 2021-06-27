/**
 * Model interface for WLED night light state
 */
export interface Nl {
    on: boolean;   // nightlight currently active
    dur: number;   // duration of nightlight in minutes (1 - 255)
    fade: boolean; // If true, the light will gradually dim over the course of the nightlight duration. If false, it will instantly turn to the target brightness once the duration has elapsed
    mode: number;  // nightlight mode (0: instant, 1: fade, 2: color fade, 3: sunrise)
    tbri: number;  // target brightness of nightlight feature
    rem: number;
}
