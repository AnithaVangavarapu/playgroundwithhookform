import DatePicker, { DateObject } from "react-multi-date-picker";
import { type Validation } from "../types/types";
import {
  type FieldError,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type Control,
  Controller,
} from "react-hook-form";
import { ruleConversion } from "../utils/ruleConversion";
import { twMerge } from "tw-merge";
import clsx from "clsx";
import "./Time/time.css";
interface ClassNames {
  outerdiv?: string;
  innerdiv?: string;
  label?: string;
  error?: string;
}
interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
  label?: string;
  placeholder?: string;
  validation?: Validation;
  readonly?: boolean;
  classnames?: ClassNames;
  visible?: boolean;
}
const Date = <T extends FieldValues>({
  control,
  name,
  error,
  label,
  placeholder,
  validation,
  readonly,
  classnames,
  visible,
}: Props<T>) => {
  const rules: RegisterOptions<T, Path<T>> | undefined = validation
    ? ruleConversion(validation)
    : undefined;
  // console.log("rules in date ", rules);
  return (
    <div
      className={twMerge(clsx(`m-1`, classnames?.outerdiv))}
      hidden={visible}
    >
      {label && (
        <label
          className={twMerge(
            clsx(`text-[12px] text-gray-500  font-medium`, classnames?.label)
          )}
        >
          {`${label}${rules?.required ? "*" : ""}`}
        </label>
      )}
      <div
        className={twMerge(
          clsx(
            `flex border border-gray-200 justify-between items-center rounded-lg `,
            classnames?.innerdiv
          )
        )}
      >
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field }) => (
            <DatePicker
              placeholder={placeholder}
              readOnly={readonly}
              value={field.value ? new DateObject(field.value) : null}
              onChange={(date) => field.onChange(date?.toDate())}
              inputClass="custom-input"
            />
          )}
        />
      </div>
      {error && <p className="text-[10px] text-red-400">{error.message}</p>}
    </div>
  );
};

export default Date;
