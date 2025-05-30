import { cn } from "../utils/cn";
import React, { useState } from "react";
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
interface Props {
  options: Option[];
  label?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  classnames?: ClassNames;
  error?: string;
  required?: boolean;
  name: string;
}
const DropDown = ({
  label,
  error,
  options,
  name,
  onChange,
  required,
  classnames,
  placeholder,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <div className={cn(`m-1`, classnames?.div)}>
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
      <select
        className={cn(
          `w-full border border-gray-200 rounded-lg p-1.5 text-[10px] focus:outline-none`,
          classnames?.select,
          selectedValue === "" ? "text-gray-400" : ""
        )}
        onChange={(e) => {
          onChange(e.target.value);
          setSelectedValue(e.target.value);
        }}
        name={name}
        value={selectedValue}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className={cn(`text-red-400 text-[10px]`, classnames?.error)}>
          {error}
        </p>
      )}
    </div>
  );
};

export default React.memo(DropDown);
