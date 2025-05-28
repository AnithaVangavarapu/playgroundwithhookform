import { CheckSquare, Square } from "lucide-react";
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
        <CheckSquare size={10} color="black" />
      ) : (
        <Square size={10} />
      )}
      <label
        style={{ paddingLeft: "10px" }}
        className={cn(
          "text-[10px]",
          isChecked ? "text-black" : " text-gray-400"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
