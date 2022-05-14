import * as fromLaptime from './laptime.actions';

describe('LoadLaptimes', () => {
  it('should return an action', () => {
    expect(fromLaptime.LoadLaptimes().type).toBe('[Laptime] Load Laptimes');
  });
});
