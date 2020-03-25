import { Component, OnInit } from '@angular/core';
import { IFieldBase } from '../../core/utilities/fields/field-base';
import { FieldControlService } from '../../core/services/field-control.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  providers: [FieldControlService]
})
export class Page2Component implements OnInit {
  fields: IFieldBase<string>[];

  constructor(private fieldControlService: FieldControlService) { }

  ngOnInit() {
    this.getFields();
  }

  getFields() {
    const fieldSettings: IFieldBase<string>[] =
      [{
        key: 'PrimaryEmail',
        label: 'Primary Email',
        value: '',
        required: true,
        order: 1,
        length: 30,
        maxLength: 250,
        type: "email",
        controlType: "textbox"
      },
      {
        key: 'SecondaryEmail',
        label: 'Secondary Email',
        value: 'khoa.nguyen@augensoftwaregroup.com',
        required: false,
        order: 2,
        length: 30,
        maxLength: 250,
        type: "email",
        controlType: "textbox"
      }];

    this.fieldControlService.createFields(fieldSettings).subscribe(fields => {
      this.fields = fields;
    });
  }
}

