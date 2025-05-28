import { populateFrom } from "./populateFrom";
import { useWatch, useController, useFormContext } from "react-hook-form";
import {
  type FormFieldProp,
  type NumberField,
  type DateField,
  type SelectField,
  type TimeField,
  type FileUploadField,
  type TextField,
  type TextAreaField,
  type CheckboxField,
} from "../types/types";
import {
  Date,
  DropDown,
  ImageUpload,
  TextInput,
  TextArea,
  Time,
  CheckboxGroup,
} from "../commonComponents";
import React, { useMemo } from "react";
import { ruleConversion } from "./ruleConversion";
import { DateObject } from "react-multi-date-picker";
interface Props {
  fieldItem: FormFieldProp;
}

const FieldItem = ({ fieldItem }: Props) => {
  console.log("render item", fieldItem.id, fieldItem.type);
  const type: string = fieldItem.type;
  const { control, setValue } = useFormContext();

  const {
    field,
    formState: { errors },
  } = useController({
    name: fieldItem.id,
    control,
    rules: fieldItem.validation && ruleConversion(fieldItem.validation),
  });
  // const { errors } = useFormState();

  const isNumberField =
    fieldItem.type === "number" && fieldItem.valuePopulateFrom;

  //watching populate form values
  const watchedPopulateValues = isNumberField
    ? useWatch({
        control,
        name: fieldItem.valuePopulateFrom!.fields,
      })
    : undefined;

  //calculate autopupulate value when watchedPopulatValues changes
  const newvalue = useMemo(() => {
    if (isNumberField && watchedPopulateValues) {
      const value = populateFrom(
        fieldItem.valuePopulateFrom!,
        watchedPopulateValues
      );
      return value;
    }
    return undefined;
  }, [watchedPopulateValues, isNumberField, fieldItem]);

  const fieldvalue = isNumberField && useWatch({ control, name: field.name });

  if (isNumberField && newvalue !== undefined && fieldvalue !== newvalue) {
    setValue(field.name, newvalue);
  }

  switch (type) {
    case "date":
      const datePickerField = fieldItem as DateField;
      return (
        <Date
          onChange={field.onChange}
          name={field.name}
          label={datePickerField.label}
          placeholder={datePickerField.placeholder}
          error={errors[datePickerField.id]?.message as string}
          readonly={datePickerField.readOnly}
          value={field.value ? new DateObject(field.value) : null}
        />
      );

    case "number":
      const numberField = fieldItem as NumberField;
      return (
        <TextInput
          onChange={field.onChange}
          name={numberField.id}
          label={numberField.label}
          placeholder={numberField.placeholder}
          error={errors[numberField.id]?.message as string}
          readonly={numberField.readOnly}
          value={field.value || ""}
        />
      );
    case "select":
      const selectField = fieldItem as SelectField;
      return (
        <DropDown
          options={selectField.options}
          label={selectField.label}
          onChange={field.onChange}
          name={field.name}
          placeholder={selectField.placeholder}
          error={errors[selectField.id]?.message as string}
        />
      );
    case "checkbox":
      const checkboxField = fieldItem as CheckboxField;
      return (
        <CheckboxGroup
          options={checkboxField.options}
          label={checkboxField.label}
          error={errors[checkboxField.id]?.message as string}
          name={field.name}
          onChange={field.onChange}
        />
      );
    case "time":
      const timeField = fieldItem as TimeField;
      return (
        <Time
          onChange={field.onChange}
          name={field.name}
          label={timeField.label}
          placeholder={timeField.placeholder}
          error={errors[timeField.id]?.message as string}
          readonly={timeField.readOnly}
        />
      );

    case "fileUpload":
      const fileUploadField = fieldItem as FileUploadField;
      return (
        <ImageUpload
          onChange={field.onChange}
          name={fileUploadField.id}
          label={fileUploadField.label}
          placeholder={fileUploadField.placeholder}
          error={errors[fileUploadField.id]?.message as string}
          readonly={fileUploadField.readOnly}
        />
      );
    case "text":
      const textField = fieldItem as TextField;
      return (
        <TextInput
          onChange={field.onChange}
          name={field.name}
          label={textField.label}
          placeholder={textField.placeholder}
          error={errors[textField.id]?.message as string}
          value={field.value || ""}
        />
      );
    case "textarea":
      const textareaField = fieldItem as TextAreaField;
      return (
        <TextArea
          onChange={field.onChange}
          name={field.name}
          label={textareaField.label}
          placeholder={textareaField.placeholder}
          error={errors[textareaField.id]?.message as string}
          readonly={textareaField.readOnly}
        />
      );
    default:
      return null;
  }
};
export default React.memo(FieldItem);
