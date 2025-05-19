import clsx from "clsx";
import { twMerge } from "tw-merge";
import { type Validation } from "../types/types";
import {
  type FieldError,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegister,
} from "react-hook-form";
import { ruleConversion } from "../utils/ruleConversion";
interface ClassNames {
  div?: string;
  label?: string;
  error?: string;
  select?: string;
}
interface Option {
  value: string;
  label: string;
}
interface Props<T extends FieldValues> {
  options: Option[];
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  classnames?: ClassNames;
  error?: FieldError;
  validation?: Validation;
  name: Path<T>;
}
const DropDown = <T extends FieldValues>({
  label,
  error,
  options,
  name,
  register,
  classnames,
  placeholder,
  validation,
}: Props<T>) => {
  const rules: RegisterOptions<T, Path<T>> | undefined = validation
    ? ruleConversion(validation)
    : undefined;
  // console.log("rules in the dropdown", rules);
  return (
    <div className={twMerge(clsx(`m-1`, classnames?.div))}>
      {label && (
        <label
          className={twMerge(
            clsx(`text-[12px] text-gray-500  font-medium`, classnames?.label)
          )}
        >
          {label}
          <span className="text-red-400">{`${
            rules?.required ? " *" : ""
          }`}</span>
        </label>
      )}
      <select
        className={twMerge(
          clsx(
            `w-full border border-gray-200 rounded-lg p-1.5 text-[10px] text-gray-400 focus:outline-none`,
            classnames?.select
          )
        )}
        {...register(name, rules)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p
          className={twMerge(
            clsx(`text-red-400 text-[10px]`, classnames?.error)
          )}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default DropDown;
