import { visibilityCheck } from "./visibilityCheck";
import { populateForm } from "./populateForm";
import {
  type Control,
  type FieldError,
  type FieldValues,
  type UseFormRegister,
  type Path,
  type FieldErrors,
  type UseFormWatch,
  type UseFormSetValue,
  type PathValue,
} from "react-hook-form";
import {
  type ColumnLayoutFiled,
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
import { useEffect, useState } from "react";

interface Props<T extends FieldValues> {
  field: FormFieldProp;
  control: Control<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}

const FieldItem = <T extends FieldValues>({
  field,
  control,
  register,
  error,
  errors,
  watch,
  setValue,
}: Props<T>) => {
  console.log("rendering field", field.id);
  const [renderField, setRenderField] = useState<boolean>(false);
  const type: string = field.type;
  useEffect(() => {
    if (!field.visibilityDependsOn) {
      setRenderField(true);
    }
  }, [field.id]);

  const watchValue = field.visibilityDependsOn
    ? watch(field.visibilityDependsOn.field as Path<T>)
    : undefined;

  useEffect(() => {
    if (watchValue) {
      const visible = field.visibilityDependsOn
        ? visibilityCheck(field.visibilityDependsOn, watchValue)
        : undefined;
      if (visible) {
        setRenderField(visible);
      }
    }
  }, [watchValue]);

  // useEffect(() => {
  //   if (field.type === "number") {
  //     const numberField = field as NumberField;
  //     if (numberField.valuePopulateFrom) {
  //       const newvalue = numberField.valuePopulateFrom
  //         ? populateForm(
  //             numberField.valuePopulateFrom,
  //             Object.fromEntries(
  //               numberField.valuePopulateFrom.fields.map((f) => [
  //                 f,
  //                 watch(f as Path<T>),
  //               ])
  //             )
  //           )
  //         : undefined;
  //       if (newvalue !== undefined) {
  //         setValue(
  //           numberField.id as Path<T>,
  //           newvalue as PathValue<T, Path<T>>
  //         );
  //       }
  //     }
  //   }
  // }, [
  //   ...(field.type === "number" && field.valuePopulateFrom
  //     ? field.valuePopulateFrom.fields.map((f) => watch(f as Path<T>))
  //     : []),
  // ]);

  const renderedField = () => {
    if (renderField) {
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

        case "columnLayout":
          const columnLayoutField = field as ColumnLayoutFiled;
          const columnsWidths = columnLayoutField.columnWidthRatio
            .split(",")
            .map((part) => `${part.trim()}fr`)
            .join(" ");

          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: columnsWidths,
              }}
            >
              {columnLayoutField.items.map((item) => (
                <div key={item.id} className="">
                  <FieldItem
                    field={item}
                    error={errors[item.id] as FieldError}
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                  />
                </div>
              ))}
            </div>
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
          // const visible =
          //   timeField.visibilityDependsOn &&
          // visibilityCheck(timeField.visibilityDependsOn, {
          //   [timeField.visibilityDependsOn.field]: watch(
          //     timeField.visibilityDependsOn.field as Path<T>
          //   ),
          // });

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
          // const visible =
          //   textField.visibilityDependsOn &&
          //   visibilityCheck(textField.visibilityDependsOn, {
          //     [textField.visibilityDependsOn.field]: watch(
          //       textField.visibilityDependsOn.field as Path<T>
          //     ),
          //   });
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
export default FieldItem;
