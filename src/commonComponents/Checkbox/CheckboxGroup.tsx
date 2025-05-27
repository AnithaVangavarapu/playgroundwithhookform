import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import Checkbox from "./Checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  onChange: (val: string[]) => void;
  classnames?: ClassNames;
  error?: string;
  required?: boolean;
  name: string;
}

const CheckboxGroup = ({
  label,
  error,
  options,
  onChange,
  required,
  classnames,
  placeholder,
}: Props) => {
  // console.log("checkboxgroup rendered");
  const [values, setValues] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleData = (value: string) => {
    let newValues: string[];
    if (values.includes(value)) {
      newValues = values.filter((val) => val !== value);
    } else {
      newValues = [...values, value];
    }
    setValues(newValues);
    onChange(newValues);
  };
  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current) {
      if (!ref.current.contains(e.target as Node)) {
        // console.log("outside click");
        setShowOptions(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref.current]);

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
      <div
        className="border rounded-lg text-[10px] text-gray-400 p-1 border-gray-200 "
        ref={ref}
      >
        <div
          className="flex items-center justify-between"
          onClick={() => setShowOptions(!showOptions)}
        >
          {placeholder}
          {showOptions ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={13} strokeWidth={3} />
          )}
        </div>
        {showOptions && (
          <div className="pt-1 pl-1">
            {options.map((option: Option, index: number) => {
              return (
                <div key={index} className="">
                  <Checkbox
                    label={option.label}
                    value={option.value}
                    updateValue={handleData}
                    checked={values.includes(option.value)}
                  />
                </div>
              );
            }, [])}
          </div>
        )}
      </div>

      {error && (
        <p className={cn(`text-red-400 text-[10px]`, classnames?.error)}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CheckboxGroup;
