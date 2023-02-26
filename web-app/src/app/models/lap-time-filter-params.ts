/**
 * Models used to filter lap times displayed on the scoreboard
 */
export interface LapTimeQueryParams {
  where?: LapTimeFilterParams;
  order?: LaptimeSortParams;
  skip?: number;
  limit?: number;
}

export interface LapTimeFilterParams {
  driverName?: {
    contains?: string;
  };
  car?: {
    contains?: string;
  };
  trackName?: {
    contains?: string;
  };
  trackConfig?: {
    contains?: string;
  };
  time?: {
    gt?: number;
    lt?: number;
  };
  setAt?: {
    after?: string;
  };
}

export interface LaptimeSortParams {
  driverName?: SortOrder;
  car?: SortOrder;
  trackName?: SortOrder;
  trackConfig?: SortOrder;
  time?: SortOrder;
  setAt?: SortOrder;
}

export interface LapTimeSearchParams {
  searchKey: LapTimeColumn;
  searchValue: string;
}

export enum DriverFilterType {
  OVERALL = 'overall',
  ACTIVE = 'my best',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum LapTimeColumn {
  DRIVER = 'driver',
  CAR = 'car',
  TRACK = 'track',
  CONFIG = 'config',
  TIME = 'time',
  SET_AT = 'setAt',
}
