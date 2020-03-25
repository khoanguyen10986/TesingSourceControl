import { FieldBase } from './field-base';

export class DateTimePicker extends FieldBase<string> {
  controlType = 'datetime';

  constructor(attributes: {} = {}) {
    super(attributes);
  }
}
