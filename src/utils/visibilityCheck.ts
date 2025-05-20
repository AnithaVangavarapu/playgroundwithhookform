import type { VisibilityCondition } from "../types/types";

// import type { VisibilityCondition } from "../types/types";
interface Props {
  action: VisibilityCondition["condition"];
  value: string;
  fieldValue: string;
}

export const visibilityCheck = ({ action, fieldValue, value }: Props) => {
  // const field = condition.field;
  // const action = condition.condition;
  // const value = condition.value;
  // console.log("fieldValue", fieldValue);
  // const fieldvalue = fieldValue;
  // console.log(
  //   "typeof value",
  //   typeof value,
  //   "typeof fieldvalue",
  //   fieldvalue,
  //   "fieldvalue",
  //   fieldvalue
  // );

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
