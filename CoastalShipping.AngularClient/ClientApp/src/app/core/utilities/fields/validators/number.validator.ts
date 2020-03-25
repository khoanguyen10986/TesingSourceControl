import { AbstractControl, ValidationErrors } from '@angular/forms';

export function NumberValidator(control: AbstractControl): ValidationErrors | null {
    
    if (isNaN(control.value)) {
      return { 'number': true };
    }
    return null;
}