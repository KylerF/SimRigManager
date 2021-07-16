import { IpAddressValidator } from './ip-address-validator.directive';

describe('IpAddressValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new IpAddressValidator();
    expect(directive).toBeTruthy();
  });
});
