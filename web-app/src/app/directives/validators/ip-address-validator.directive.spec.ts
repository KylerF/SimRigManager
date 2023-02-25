import { FormControl } from '@angular/forms';
import { IpAddressValidator } from './ip-address-validator.directive';

describe('IpAddressValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new IpAddressValidator();
    expect(directive).toBeTruthy();
  });

  it('should return null when value is empty string', () => {
    const directive = new IpAddressValidator();
    expect(directive.validate(new FormControl(''))).toBeNull();
  });

  it('should pass for valid IP address', () => {
    const directive = new IpAddressValidator();
    expect(directive.validate(new FormControl('192.168.1.100'))).toBeNull();
  });

  it('should fail for invalid IP address', () => {
    const directive = new IpAddressValidator();
    expect(directive.validate(new FormControl('192.168.1.a'))).toEqual({ ipAddress: true });
  });
});
