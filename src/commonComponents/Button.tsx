import type React from "react";
import { cn } from "../utils/cn";
interface ClassNames {
  div?: string;
  button?: string;
}
interface Props {
  label: string;
  type: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  classnames?: ClassNames;
}

const Button = ({ label, type, onClick, classnames }: Props) => {
  return (
    <div className={cn("text-center", classnames?.div)}>
      <button
        className={cn(
          "border rounded-lg p-1 text-[10px] w-15 font-medium bg-blue-950 text-white border-blue-950 cursor-pointer",
          classnames?.button
        )}
        type={type}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
