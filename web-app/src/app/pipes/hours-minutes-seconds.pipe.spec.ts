import { HoursMinutesSecondsPipe } from './hours-minutes-seconds.pipe';

describe('HoursminutessecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
