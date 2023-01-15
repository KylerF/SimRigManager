/**
 * Generic state interface for any application state which
 * can result in an error (e.g. API response)
 */
export interface StateContainer<T=any> {
  state: T;
  error: string;
  loading: boolean;
  lastUpdated: Date;
}
