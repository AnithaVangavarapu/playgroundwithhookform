export interface SelectOption {
  value: string;
  label: string;
}
export interface RequiredValidation {
  value: boolean;
  message: boolean;
}
export interface RangeValidation {
  min: number;
  max: number;
  message: string;
}
export interface PatternValidation {
  pattern: string;
  message: string;
}
export interface LessThanValidation {
  value: string | number;
  message: string;
}

export interface Validation {
  required?: RequiredValidation;
  range?: RangeValidation;
  pattern?: PatternValidation;
  lessThan?: LessThanValidation;
}
export interface VisibilityCondition {
  field: string;
  condition: "equals" | "notEquals" | "lessThan" | "greaterThan";
  value: string;
}
export interface ValuePopulateFrom {
  type: "formula";
  formulaType: "multiply" | "addition" | "substract";
  fields: string[];
  default?: string;
}
export interface BaseField {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  validation?: Validation;
  visibilityDependsOn?: VisibilityCondition;
  readOnly?: boolean;
}
export interface DateField extends BaseField {
  type: "date";
  deviation?: {
    minus: number;
    plus: number;
  };
}

export interface SelectField extends BaseField {
  type: "select";
  options: SelectOption[];
}
export interface ColumnLayoutFiled extends BaseField {
  type: "columnLayout";
  numberOfColumns: number;
  columnWidthRatio: string;
  items: FormFieldProp[];
}
export interface TextField extends BaseField {
  type: "text";
}

export interface TextAreaField extends BaseField {
  type: "textarea";
}

export interface TimeField extends BaseField {
  type: "time";
}

export interface NumberField extends BaseField {
  type: "number";
  valuePopulateFrom?: ValuePopulateFrom;
}

export interface FileUploadField extends BaseField {
  type: "fileUpload";
}

export type FormFieldProp =
  | DateField
  | TimeField
  | TextField
  | TextAreaField
  | NumberField
  | SelectField
  | FileUploadField
  | ColumnLayoutFiled;

export interface ActionCondition {
  field: string;
  condition: "equals" | "notEquals" | "lessThan" | "greaterThan";
  value: string | number;
}
export interface ActionOpenForm {
  alertMessage: string;
  conditions: ActionCondition[];
  target: string;
}
export interface FormActions {
  openForm?: ActionOpenForm;
}
