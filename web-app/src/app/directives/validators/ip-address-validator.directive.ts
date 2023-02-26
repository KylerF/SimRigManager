import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';
import { ipAddressValidatorFunction } from './ip-address-validator-function';

@Directive({
  selector: '[appIpAddress]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IpAddressValidator,
      multi: true,
    },
  ],
})

/**
 * Custom validator for IP address fields in a reactive form
 */
export class IpAddressValidator implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    return ipAddressValidatorFunction()(control);
  }
}
