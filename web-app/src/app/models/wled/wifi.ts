/**
 * Model interface for WLED WiFi info
 */
export interface Wifi {
    bssid: string;
    rssi: number;
    signal: number;
    channel: number;
}
