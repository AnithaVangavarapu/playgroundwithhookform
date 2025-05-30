import { useState } from "react";
import { cn } from "../../utils/cn";
import Checkbox from "./Checkbox";

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
}: Props) => {
  const [values, setValues] = useState<string[]>([]);

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

      {error && (
        <p className={cn(`text-red-400 text-[10px]`, classnames?.error)}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CheckboxGroup;
