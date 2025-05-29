import type { VisibilityCondition } from "../types/types";

// import type { VisibilityCondition } from "../types/types";
interface Props {
  action: VisibilityCondition["condition"];
  value: string | number;
  fieldValue: string;
}

export const visibilityCheck = ({ action, fieldValue, value }: Props) => {
  switch (action) {
    case "equals":
      return fieldValue === value;
    case "notEquals":
      return fieldValue !== value;
    case "lessThan":
      return Number(fieldValue) < Number(value);
    case "greaterThan":
      return Number(fieldValue) > Number(value);
    default:
      return false;
  }
};
