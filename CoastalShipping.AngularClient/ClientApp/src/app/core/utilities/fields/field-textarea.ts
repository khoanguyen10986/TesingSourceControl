import { FieldBase } from './field-base';

export class Textarea extends FieldBase<string> {
  controlType = 'textarea';

  constructor(attributes: {} = {}) {
    super(attributes);
  }
}
