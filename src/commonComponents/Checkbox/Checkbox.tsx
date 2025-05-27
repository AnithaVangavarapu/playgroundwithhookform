import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";
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
      {isChecked ? <CheckSquare size={10} /> : <Square size={10} />}
      <label
        style={{ paddingLeft: "10px" }}
        className="text-[10px] text-gray-400"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
