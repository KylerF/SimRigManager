import * as driverActions from './driver.actions';

describe('Active driver update action', () => {
  it('should create an instance', () => {
    expect(driverActions.loadActiveDriver()).toBeTruthy();
  });
});
