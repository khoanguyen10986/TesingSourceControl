import { FieldBase } from './field-base';

export class Dropdown extends FieldBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(attributes: {} = {}) {
    super(attributes);
    this.options = attributes['options'] || [];
  }
}
