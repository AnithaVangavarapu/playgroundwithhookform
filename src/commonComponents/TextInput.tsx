import { cn } from "../utils/cn";

interface ClassNames {
  div?: string;
  input?: string;
  label?: string;
  error?: string;
}
interface Props {
  label?: string;
  error?: string;
  name: string;
  onChange: (val: string) => void;
  required?: boolean;
  classnames?: ClassNames;
  placeholder?: string;
  readonly?: boolean;
  value?: string;
}
const TextInput = ({
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
          {required && <span className="text-red-400"> *</span>}
        </label>
      )}
      <input
        name={name}
        className={cn(
          `border w-full rounded-lg border-gray-200 p-1.5 text-[10px] focus:outline-none`,
          classnames?.input
        )}
        placeholder={placeholder}
        readOnly={readonly}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {error && (
        <p className={cn(`text-red-400 text-[10px]`, classnames?.error)}>
          {error}
        </p>
      )}
    </div>
  );
};
export default TextInput;
