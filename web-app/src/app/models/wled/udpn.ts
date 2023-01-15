/**
 * Model interface for WLED UDP broadcast state
 */
export interface Udpn {
  send: boolean; // send WLED broadcast (UDP sync) packet on state change
  recv: boolean; // receive broadcast packets
}
