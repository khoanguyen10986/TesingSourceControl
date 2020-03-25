import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IFieldBase } from '../utilities/fields/field-base';
import { Textarea } from '../utilities/fields/field-textarea';
import { Dropdown } from '../utilities/fields/field-dropdown';
import { Textbox } from '../utilities/fields/field-textbox';
import { DateTimePicker } from '../utilities/fields/field-datetimepicker';
import { DateValidator } from '../utilities/fields/validators/date.validator';
import { NumberValidator } from '../utilities/fields/validators/number.validator';
import { of } from 'rxjs';

@Injectable()
export class FieldControlService {
  constructor() { }
  
  toFormGroup(fields: IFieldBase<string>[] ) {
    let group: any = {};

    fields.forEach(field => {
      let validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.type == "email") {
        validators.push(Validators.email);
      }
      if (field.controlType == "datetime") {
        validators.push(DateValidator);
      }
      if (field.controlType == "number") {
        validators.push(NumberValidator);
      }

      const formControl = new FormControl(field.value || '', validators);
      group[field.key] = formControl;
    });
    
    return new FormGroup(group);
  }

  createFields(fields: IFieldBase<any>[]) {
    
    for(var i in fields) {
        const control = fields[i];
        switch(control.controlType) {
          case("textarea"):
              fields[i] = new Textarea(control);
              break;
          case("dropdown"):
              fields[i]= new Dropdown(control);
              break
          case("textbox"): case("number"):
              fields[i]= new Textbox(control);
              break;
          case("datetime"):
              fields[i]= new DateTimePicker(control);
              break;
        }
    }
    
    return of(fields.sort((a, b) => a.order - b.order));
  }
}
