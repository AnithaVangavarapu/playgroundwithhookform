import type { VisibilityCondition } from "../types/types";

export const visibilityCheck = (
  condition: VisibilityCondition,
  fieldValue: string
) => {
  // const field = condition.field;
  const action = condition.condition;
  const value = condition.value;
  // console.log("fieldValue", fieldValue);
  const fieldvalue = fieldValue;

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
      return fieldvalue === value;
    case "notEquals":
      return fieldvalue !== value;
    case "lessThan":
      return Number(fieldValue) < Number(value);
    case "greaterThan":
      return Number(fieldValue) > Number(value);
    default:
      return false;
  }
};
