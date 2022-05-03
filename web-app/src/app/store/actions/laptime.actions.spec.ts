import * as fromLaptime from './laptime.actions';

describe('loadLaptimes', () => {
  it('should return an action', () => {
    expect(fromLaptime.loadLaptimes().type).toBe('[Laptime] Load Laptimes');
  });
});
