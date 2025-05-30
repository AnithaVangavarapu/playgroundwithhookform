import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Clock } from "lucide-react";
import "./time.css";
import React from "react";
import { cn } from "../../utils/cn";
interface Props {
  label?: string;
  error?: string;
  onChange: (val: Date | undefined) => void;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  name: string;
}
const Time = ({
  label,
  error,
  placeholder,
  readonly,
  name,
  required,
  onChange,
}: Props) => {
  return (
    <div className={cn("m-1")}>
      {label && (
        <label className={cn(`text-[12px] text-gray-500  font-medium`)}>
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <div className="flex border justify-between p-1 rounded-lg border-gray-200">
        <DatePicker
          disableDayPicker
          format="hh:mm A"
          plugins={[<TimePicker hideSeconds />]}
          placeholder={placeholder}
          onChange={(date: DateObject | null) => {
            onChange(date?.toDate());
          }}
          // value={field.value ? new DateObject(field.value) : null}
          inputClass="custom-input"
          readOnly={readonly}
          editable={false}
          name={name}
        />
        <Clock width={15} color="gray" />
      </div>

      {error && <p className={cn(`text-[10px] text-red-400`)}>{error}</p>}
    </div>
  );
};

export default React.memo(Time);
