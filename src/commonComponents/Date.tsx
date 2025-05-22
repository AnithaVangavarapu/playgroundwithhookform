import DatePicker, { DateObject } from "react-multi-date-picker";
import "./Time/time.css";
import { cn } from "../utils/cn";
import React from "react";

interface ClassNames {
  outerdiv?: string;
  innerdiv?: string;
  label?: string;
  error?: string;
}
interface Props {
  onChange: (val: Date | undefined) => void;
  name: string;
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  classnames?: ClassNames;
  value: DateObject | null;
}
const Date = ({
  onChange,
  name,
  error,
  label,
  placeholder,
  value,
  readonly,
  classnames,
  required,
}: Props) => {
  return (
    <div className={cn(`m-1`, classnames?.outerdiv)}>
      {label && (
        <label
          className={cn(
            `text-[12px] text-gray-500  font-medium`,
            classnames?.label
          )}
        >
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div
        className={cn(
          `flex border border-gray-200 justify-between items-center rounded-lg p-1`,
          classnames?.innerdiv
        )}
      >
        <DatePicker
          placeholder={placeholder}
          readOnly={readonly}
          value={value}
          onChange={(date) => onChange(date?.toDate())}
          inputClass="custom-input"
          name={name}
        />
      </div>
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
};

export default React.memo(Date);
