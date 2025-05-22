import { cn } from "../utils/cn";
import React, { useRef, useState, useEffect } from "react";
interface ClassNames {
  div?: string;
  textArea?: string;
  label?: string;
  error?: string;
}
interface Props {
  label?: string;
  error?: string;
  name: string;
  onChange: (val: string) => void;
  classnames?: ClassNames;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
}

const TextArea = ({
  label,
  error,
  name,
  onChange,
  classnames,
  placeholder,
  readonly,
  required,
  value,
}: Props) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      onChange(newValue);
    }, 500);
  };
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
      <textarea
        name={name}
        className={cn(
          `border w-full rounded-lg border-gray-200 p-1.5 text-[10px] focus:outline-none`,
          classnames?.textArea
        )}
        placeholder={placeholder}
        readOnly={readonly}
        rows={4}
        onChange={handleChange}
        value={internalValue}
      />
      {error && (
        <p className={cn(`text-red-400 text-[10px]`, classnames?.error)}>
          {error}
        </p>
      )}
    </div>
  );
};

export default React.memo(TextArea);
