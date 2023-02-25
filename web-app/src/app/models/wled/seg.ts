/**
 * Model interface for WLED segment state
 */
export interface Seg {
  id: number;      // segment ID
  start: number;   // LED the segment starts at
  stop: number;    // LED the segment stops at, not included in range
  len: number;     // length of the segment (stop - start)
  grp: number;
  spc: number;
  of: number;
  on: boolean;     // turns on and off the individual segment
  frz: boolean;
  bri: number;     // sets the individual segment brightness
  col: [[number]]; // array that has up to 3 color arrays as elements, the primary, secondary (background) and tertiary colors of the segment.
  fx: number;      // ID of the effect
  sx: number;      // relative effect speed
  ix: number;      // effect intensity
  pal: number;     // ID of the color palette
  sel: boolean;    // true if the segment is selected
  rev: boolean;    // flips the segment, causing animations to change direction
  mi: boolean;     // mirrors the segment
}
