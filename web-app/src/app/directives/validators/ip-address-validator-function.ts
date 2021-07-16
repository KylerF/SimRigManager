import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validates the value of an IP address for formatting (ex 192.168.1.10)
 * 
 * @returns error or null
 */
export function ipAddressValidatorFunction(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        const ipAddress = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);

        return !ipAddress ? { ipAddress: true }: null;
    }
}
