import clsx from "clsx";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { twMerge } from "tw-merge";
import { Clock } from "lucide-react";
import "./time.css";
import { type Validation } from "../../types/types";
import {
  type FieldError,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type Control,
  Controller,
} from "react-hook-form";
import { ruleConversion } from "../../utils/ruleConversion";
interface Props<T extends FieldValues> {
  label?: string;
  error?: FieldError;
  control: Control<T>;
  placeholder?: string;
  visible?: boolean;
  readonly?: boolean;
  validation?: Validation;
  name: Path<T>;
}
const Time = <T extends FieldValues>({
  label,
  error,
  placeholder,
  validation,
  name,
  control,
  visible,
  readonly,
}: Props<T>) => {
  const rules: RegisterOptions<T, Path<T>> | undefined = validation
    ? ruleConversion(validation)
    : undefined;
  // console.log("rules in time", rules);
  return (
    <div className={twMerge(clsx("m-1"))} hidden={visible}>
      {label && (
        <label
          className={twMerge(clsx(`text-[12px] text-gray-500  font-medium`))}
        >
          {`${label}${rules?.required ? "*" : ""}`}
        </label>
      )}
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field }) => (
          <div className="flex border justify-between p-1 rounded-lg border-gray-200">
            <DatePicker
              disableDayPicker
              format="hh:mm A"
              plugins={[<TimePicker hideSeconds />]}
              placeholder={placeholder}
              onChange={(date: DateObject | null) => {
                field.onChange(date?.toDate());
              }}
              value={field.value ? new DateObject(field.value) : null}
              inputClass="custom-input"
              readOnly={readonly}
              editable={false}
            />
            <Clock width={15} color="gray" />
          </div>
        )}
      />
      {error && (
        <p className={twMerge(clsx(`text-[10px] text-red-400`))}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Time;
