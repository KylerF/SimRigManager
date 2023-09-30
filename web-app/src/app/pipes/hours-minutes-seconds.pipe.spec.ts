import { HoursMinutesSecondsPipe } from './hours-minutes-seconds.pipe';

describe('HoursminutessecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe).toBeTruthy();
  });
  it('should convert 0 to 00:00:00', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe.transform(0)).toEqual('00:00:00');
  });
  it('should convert 1 to 00:00:01', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe.transform(1)).toEqual('00:00:01');
  });
  it('should convert 60 to 00:01:00', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe.transform(60)).toEqual('00:01:00');
  });
  it('should convert 3600 to 01:00:00', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe.transform(3600)).toEqual('01:00:00');
  });
  it('should convert 3661 to 01:01:01', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe.transform(3661)).toEqual('01:01:01');
  });
  it('should convert 3661.5 to 01:01:01', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe.transform(3661.5)).toEqual('01:01:01');
  });
  it('should convert 3661.9 to 01:01:01', () => {
    const pipe = new HoursMinutesSecondsPipe();
    expect(pipe.transform(3661.9)).toEqual('01:01:01');
  });
});
