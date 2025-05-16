import { type Validation } from "../types/types";
export const ruleConversion = (validation: Validation) => {
  let rules: Record<string, any> = {};
  const customArray = Object.entries(validation);
  if (customArray.length === 0) {
    return {};
  } else {
    customArray.map(([key, value]) => {
      if (key === "required") {
        if (value.value === true) {
          rules.required = value.message;
        }
      }

      if (key === "lessThan") {
        if (value.value === "today") {
          const currentDate = new Date();
          rules.lessThan = {
            value: currentDate,
            message: value.message,
          };
        }
      }
    });
  }
  return rules;
};
