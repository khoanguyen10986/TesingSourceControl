import { FieldBase } from './field-base';

export class Textbox extends FieldBase<string> {
  
  constructor(attributes: {} = {}) {
    super(attributes);
  }
}
