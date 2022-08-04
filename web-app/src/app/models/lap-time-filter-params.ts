/**
 * Models used to filter lap times displayed on the scoreboard
 */
export interface LapTimeFilterParams {
  sortParams?: LaptimeSortParams;
  searchParams?: LapTimeSearchParams[];
  show?: DriverFilterType;
  showForDriverId?: number;
  since?: moment.Moment;
}

export interface LaptimeSortParams {
  sortBy: LapTimeColumn;
  sortOrder: SortOrder;
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
  ASC = 'asc',
  DESC = 'desc',
}

export enum LapTimeColumn {
  DRIVER = 'driver',
  CAR = 'car',
  TRACK = 'track',
  CONFIG = 'config',
  TIME = 'time',
  SET_AT = 'setAt',
}
