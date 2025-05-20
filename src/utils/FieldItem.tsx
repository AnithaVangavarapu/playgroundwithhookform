import { visibilityCheck } from "./visibilityCheck";
import { populateFrom } from "./populateFrom";
import {
  type Control,
  type FieldError,
  type FieldValues,
  type UseFormRegister,
  type Path,
  type UseFormSetValue,
  type PathValue,
  useWatch,
} from "react-hook-form";
import {
  type FormFieldProp,
  type NumberField,
  type DateField,
  type SelectField,
  type TimeField,
  type FileUploadField,
  type TextField,
  type TextAreaField,
} from "../types/types";
import {
  Date,
  DropDown,
  ImageUpload,
  Text,
  TextArea,
  Time,
} from "../commonComponents";
import React, { useEffect, useMemo } from "react";

interface Props<T extends FieldValues> {
  field: FormFieldProp;
  control: Control<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  setValue: UseFormSetValue<T>;
}

const FieldItem = <T extends FieldValues>({
  field,
  control,
  register,
  error,
  setValue,
}: Props<T>) => {
  console.log("rendering field", field.id);
  const type: string = field.type;

  //watch value for visibility field
  const watchedValue = field.visibilityDependsOn
    ? useWatch({
        control,
        name: field.visibilityDependsOn.field as Path<T>,
      })
    : undefined;
  //check to render item
  const showItem = useMemo(() => {
    if (field.visibilityDependsOn) {
      if (watchedValue) {
        const visible = visibilityCheck(
          field.visibilityDependsOn,
          watchedValue
        );
        return visible;
      }
    } else {
      return true;
    }
  }, [watchedValue]);

  const isNumberField = field.type === "number" && field.valuePopulateFrom;
  //watching populate form values
  const watchedPopulateValues = isNumberField
    ? useWatch({
        control,
        name: field.valuePopulateFrom!.fields as Path<T>[],
      })
    : undefined;
  //calculate autopupulate value when watchedPopulatValues changes
  const newvalue = useMemo(() => {
    if (isNumberField && watchedPopulateValues) {
      const value = populateFrom(
        field.valuePopulateFrom!,
        watchedPopulateValues
      );

      return value;
    }
    return undefined;
  }, [watchedPopulateValues, isNumberField, field]);

  //setting populate vlaue for item when newvalue changes
  useEffect(() => {
    setValue(field.id as Path<T>, newvalue as PathValue<T, Path<T>>);
  }, [newvalue]);

  const renderedField = () => {
    if (showItem) {
      switch (type) {
        case "date":
          const DatePickerField = field as DateField;
          return (
            <Date
              control={control}
              name={DatePickerField.id as Path<T>}
              label={DatePickerField.label}
              placeholder={DatePickerField.placeholder}
              error={error}
              validation={DatePickerField.validation}
              readonly={DatePickerField.readOnly}
            />
          );

        case "number":
          const numberField = field as NumberField;

          return (
            <Text
              register={register}
              name={numberField.id as Path<T>}
              label={numberField.label}
              placeholder={numberField.placeholder}
              error={error}
              readonly={numberField.readOnly}
              validation={numberField.validation}
            />
          );
        case "select":
          const selectField = field as SelectField;
          return (
            <DropDown
              options={selectField.options}
              label={selectField.label}
              register={register}
              name={selectField.id as Path<T>}
              placeholder={selectField.placeholder}
              error={error}
              validation={selectField.validation}
            />
          );

        case "time":
          const timeField = field as TimeField;

          return (
            <Time
              control={control}
              name={timeField.id as Path<T>}
              label={timeField.label}
              placeholder={timeField.placeholder}
              error={error}
              readonly={timeField.readOnly}
              validation={timeField.validation}
            />
          );

        case "fileUpload":
          const fileUploadField = field as FileUploadField;
          return (
            <ImageUpload
              control={control}
              name={fileUploadField.id as Path<T>}
              label={fileUploadField.label}
              placeholder={fileUploadField.placeholder}
              error={error}
              readonly={fileUploadField.readOnly}
              validation={fileUploadField.validation}
            />
          );
        case "text":
          const textField = field as TextField;
          return (
            <Text
              register={register}
              name={textField.id as Path<T>}
              label={textField.label}
              placeholder={textField.placeholder}
              error={error}
              readonly={textField.readOnly}
              validation={textField.validation}
            />
          );
        case "textarea":
          const textareaField = field as TextAreaField;
          return (
            <TextArea
              register={register}
              name={textareaField.id as Path<T>}
              label={textareaField.label}
              placeholder={textareaField.placeholder}
              error={error}
              readonly={textareaField.readOnly}
              validation={textareaField.validation}
            />
          );
        default:
          return null;
      }
    } else {
      null;
    }
  };

  return <>{renderedField()}</>;
};
export default React.memo(FieldItem);
