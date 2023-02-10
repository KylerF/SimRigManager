/**
 * Model interface for a driver profile
 */
export interface Driver {
  id: number;
  name: string;
  nickname: string;
  trackTime: number;
  profilePic: string;
}

export interface DriverAvatar {
  image_url: string;
}
