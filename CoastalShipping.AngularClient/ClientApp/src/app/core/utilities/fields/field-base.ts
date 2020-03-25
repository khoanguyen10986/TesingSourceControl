export class FieldBase<T> implements IFieldBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  length?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  options?: {key: string, value: string}[];
  type?: string;

  constructor(attributes: IFieldBase<T> = {}) {
    this.value = attributes.value;
    this.key = attributes.key || '';
    this.label = attributes.label || '';
    this.required = !!attributes.required;
    this.order = attributes.order === undefined ? 1 : attributes.order;
    this.controlType = attributes.controlType || '';
    this.length = attributes.length || 120;
    this.maxLength = attributes.maxLength || 250;
    this.rows = attributes.rows || 6;
    this.cols = attributes.cols || 20;
    this.options = attributes.options;
    this.type = attributes.type || '';
  }
}

export interface IFieldBase<T> {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: string;
  type?: string;
  length?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  options?: {key: string, value: string}[];
}

export interface IFieldService {
  getFields(): void
}