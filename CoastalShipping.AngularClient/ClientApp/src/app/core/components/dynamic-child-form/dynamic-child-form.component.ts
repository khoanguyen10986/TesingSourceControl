import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import * as _moment from 'moment';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { FormGroup } from '@angular/forms';
import { FieldBase } from '../../utilities/fields/field-base';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_CUSTOM_FORMATS = {
  parseInput: 'DD/MMM/YYYY LT',
  fullPickerInput: 'DD/MMM/YYYY',
  datePickerInput: 'DD/MMM/YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM/YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMM/YYYY'
};

@Component({
  selector: 'app-dynamic-child-form',
  templateUrl: './dynamic-child-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS },
  ],
})
export class DynamicChildFormComponent {
  @Input() field: FieldBase<string>;
  @Input() form: FormGroup;
  @Output() getFormChanges = new EventEmitter();

  constructor() { }

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  get isEmailValid() {
    const control = this.form.controls[this.field.key];
    return control.errors ? !control.errors.email : true;
  }

  get isDateTimeValid() {
    const control = this.form.controls[this.field.key];
    return control.errors ? !control.errors.datetime : true;
  }

  get isNumberValid() {
    const control = this.form.controls[this.field.key];
    return control.errors ? !control.errors.number : true;
  }

  get isEdited() {
    return this.form.controls[this.field.key].dirty || this.form.controls[this.field.key].touched;
  }

  get needsAValue() {
    return this.form.controls[this.field.key].errors != null && this.form.controls[this.field.key].errors.required;
  }

  valueChange(event: any) {
    if (this.field.controlType == "datetime") {
      this.form.controls[this.field.key].setValue(event.target.value);
    }
    this.getFormChanges.emit(this.form);
  }
}
