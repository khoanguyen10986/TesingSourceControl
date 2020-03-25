import { Component, OnInit } from '@angular/core';
import { IFieldBase } from '../../core/utilities/fields/field-base';
import { FieldControlService } from '../../core/services/field-control.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  providers: [ FieldControlService ]
})
export class Page1Component implements OnInit {
  fields: IFieldBase<string>[];

  constructor(private fieldControlService: FieldControlService) { }

  ngOnInit() {
    this.getFields();
  }

  getFields() {
    const fieldSettings: IFieldBase<string>[] =
      [{
        key: 'Email',
        label: 'Email',
        value: '',
        required: true,
        order: 1,
        length: 30,
        maxLength: 250,
        type: "email",
        controlType: "textbox"
      },
      {
        key: 'FirstName',
        label: 'First name',
        value: '',
        required: true,
        order: 2,
        length: 30,
        maxLength: 250,
        type: "text",
        controlType: "textbox"
      },
      {
        key: 'LastName',
        label: 'Last name',
        value: '',
        required: true,
        order: 3,
        length: 30,
        maxLength: 250,
        type: "text",
        controlType: "textbox"
      }];

    this.fieldControlService.createFields(fieldSettings).subscribe(fields => {
      this.fields = fields;
    });
  }
}
