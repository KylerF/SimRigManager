import { Fs } from "./fs";
import { Leds } from "./leds";
import { Wifi } from "./wifi";

/**
 * Model interface for WLED info returned from controller API
 */
 export interface Info {
  ver: string;
  vid: number;
  leds: Leds;
  str: boolean;
  name: string;
  udpport: number;
  live: boolean;
  lm: string;
  lip: string;
  ws: number;
  fxcount: number;
  palcount: number;
  wifi: Wifi;
  fs: Fs;
  ndc: number;
  arch: string;
  core: string;
  lwip: number;
  freeheap: number;
  uptime: number;
  opt: number;
  brand: string;
  product: string;
  mac: string;
  ip: string;
}
