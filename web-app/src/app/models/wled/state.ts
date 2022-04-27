import { Udpn } from "./udpn";
import { Seg } from "./seg";
import { Nl } from "./nl";

/**
 * Model interface for state returned from the WLED API.
 * Full API documentation: https://github.com/Aircoookie/WLED/wiki/JSON-API
 */
export interface State {
  on: boolean;        // on/off state of the light
  bri: number;        // brightness of the light (0-255)
  transition: number; // duration of the crossfade between different colors/brightness levels
  ps: number;         // ID of currently set preset
  pl: number;         // ID of currently set playlist
  nl: Nl;             // night light settings
  udpn: Udpn;         // UDP broadcast settings
  lor: number;        // live data override
  mainseg: number;    // main segment
  seg: Seg[];         // segment state
}
