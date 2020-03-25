import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as _moment from 'moment';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export function DateValidator(control: AbstractControl): ValidationErrors | null {
    
    const isValid = !control.value || control.value._isValid;
    if (!isValid) {
      return { 'datetime': true, 'format': 'dd/MMM/yyyy' };
    }
    return null;
}