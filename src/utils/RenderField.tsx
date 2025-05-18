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

interface Props<T extends FieldValues> {
  field: FormFieldProp;
  control: Control<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
}

const RenderField = <T extends FieldValues>({
  field,
  control,
  register,
  error,
  errors,
  watch,
}: Props<T>) => {
  const type: string = field.type;
  console.log("field that rerenders", field.id);
  // const formStateData = watch();
  // const visibilityFieldId = field.visibilityDependsOn?.field;
  // const watchedValue = visibilityFieldId
  //   ? watch(visibilityFieldId as Path<T>)
  //   : undefined;
  // const isVisible = field.visibilityDependsOn
  //   ? visibilityCheck(field.visibilityDependsOn, {
  //       [visibilityFieldId as string]: watchedValue,
  //     })
  //   : true;
  const renderedField = () => {
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
            readonly={DatePickerField.readOnly === true}
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
                <RenderField
                  field={item}
                  error={errors[item.id] as FieldError}
                  control={control}
                  register={register}
                  errors={errors}
                  watch={watch}
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
            readonly={numberField.readOnly === true}
            value={
              numberField.valuePopulateFrom
                ? populateForm(
                    numberField.valuePopulateFrom,
                    Object.fromEntries(
                      numberField.valuePopulateFrom.fields.map((f) => [
                        f,
                        watch(f as Path<T>),
                      ])
                    )
                  )
                : undefined
            }
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
            visible={
              timeField.visibilityDependsOn &&
              visibilityCheck(timeField.visibilityDependsOn, {
                [timeField.visibilityDependsOn.field]: watch(
                  timeField.visibilityDependsOn.field as Path<T>
                ),
              })
            }
            readonly={timeField.readOnly === true}
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
            readonly={fileUploadField.readOnly === true}
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
            readonly={textField.readOnly === true}
            visible={
              textField.visibilityDependsOn &&
              visibilityCheck(textField.visibilityDependsOn, {
                [textField.visibilityDependsOn.field]: watch(
                  textField.visibilityDependsOn.field as Path<T>
                ),
              })
            }
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
            readonly={textareaField.readOnly === true}
            validation={textareaField.validation}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderedField()}</>;
};
export default RenderField;
