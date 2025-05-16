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
  input?: string;
  label?: string;
  error?: string;
}
interface Props<T extends FieldValues> {
  label?: string;
  error?: FieldError;
  name: Path<T>;
  register: UseFormRegister<T>;
  validation?: Validation;
  classnames?: ClassNames;
  placeholder?: string;
  readonly?: boolean;
  visible?: boolean;
}
const Text = <T extends FieldValues>({
  label,
  error,
  name,
  register,
  classnames,
  placeholder,
  readonly,
  validation,
  visible,
}: Props<T>) => {
  const rules: RegisterOptions<T, Path<T>> | undefined = validation
    ? ruleConversion(validation)
    : undefined;

  return (
    <div className={twMerge(clsx(`m-1`, classnames?.div))} hidden={visible}>
      {label && (
        <label
          className={twMerge(
            clsx(`text-[12px] text-gray-500  font-medium`, classnames?.label)
          )}
        >
          {`${label}${rules?.required ? "*" : ""}`}
        </label>
      )}
      <input
        {...register(name, rules)}
        className={twMerge(
          clsx(
            `border w-full rounded-lg border-gray-200 p-1.5 text-[10px] focus:outline-none`,
            classnames?.input
          )
        )}
        placeholder={placeholder}
        readOnly={readonly}
        type="text"
      />
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

export default Text;
