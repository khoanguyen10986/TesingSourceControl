import { Component, OnInit } from '@angular/core';
import { IFieldBase } from '../../core/utilities/fields/field-base';
import { DateTimePicker } from '../../core/utilities/fields/field-datetimepicker';
import { Textbox } from '../../core/utilities/fields/field-textbox';
import { Textarea } from '../../core/utilities/fields/field-textarea';
import { FieldControlService } from '../../core/services/field-control.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css'],
  providers: [FieldControlService]
})
export class Page3Component implements OnInit {
  fields: IFieldBase<string>[];

  constructor(private fieldControlService: FieldControlService) { }

  ngOnInit() {
    this.getFields();
  }

  getFields() {
    const fieldSettings: IFieldBase<any>[] =
      [
        new Textbox({
          key: "Summary",
          label: "Summary",
          required: true,
          order: 1,
          controlType: "textbox",
          length: 35,
          type: "text"
        }),
        new Textarea({
          key: "Description",
          label: "Description",
          required: true,
          order: 2,
          controlType: "textarea",
          rows: 6,
          cols: 37
        }),
        new DateTimePicker({
          key: "Date",
          label: "Datetime",
          required: false,
          order: 3,
          controlType: "datetime",
          length: 25
        }),
        new Textbox({
          key: "Number",
          label: "Number",
          required: false,
          order: 4,
          controlType: "number",
          length: 5,
          type: "text"
        })
      ];

    this.fieldControlService.createFields(fieldSettings).subscribe(fields => {
      this.fields = fields;
    });
  }
}
