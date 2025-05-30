import { Square, SquareCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";
interface Props {
  label: string;
  value: string;
  updateValue: (value: string) => void;
  checked: boolean;
}

const Checkbox = ({ label, value, updateValue, checked }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const toggleCheck = () => {
    setIsChecked(() => !isChecked);
    updateValue(value);
  };
  return (
    <div
      onClick={toggleCheck}
      className="flex items-center
    "
    >
      {isChecked ? (
        <SquareCheck size={24} color="black" />
      ) : (
        <Square size={24} color="gray" strokeWidth={1} />
      )}
      <label
        style={{ paddingLeft: "10px" }}
        className={cn(
          "text-[12px]",
          isChecked ? "text-black" : " text-gray-500"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
