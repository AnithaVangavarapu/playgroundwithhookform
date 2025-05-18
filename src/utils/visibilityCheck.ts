import type { VisibilityCondition } from "../types/types";

export const visibilityCheck = (
  condition: VisibilityCondition,
  formStateData: Record<string, any>
) => {
  const field = condition.field;
  const action = condition.condition;
  const value = condition.value;
  const fieldValue = formStateData[field];

  switch (action) {
    case "equals":
      return !(fieldValue === value);
    case "notEquals":
      return !(fieldValue !== value);
    case "lessThan":
      return !(Number(fieldValue) < Number(value));
    case "greaterThan":
      return !(Number(fieldValue) > Number(value));
    default:
      return false;
  }
};
