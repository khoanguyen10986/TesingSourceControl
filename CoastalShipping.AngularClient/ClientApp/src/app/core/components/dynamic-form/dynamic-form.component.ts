import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldControlService } from '../../services/field-control.service';
import { IFieldBase } from '../../utilities/fields/field-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: IFieldBase<any>[];
  form: FormGroup = new FormGroup({});
  payLoad: string;

  constructor(private fieldControlService: FieldControlService) { }

  ngOnInit() {
    this.form = this.fieldControlService.toFormGroup(this.fields);
  }

  formChange(form: FormGroup) {
    this.form = form;
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }
}
