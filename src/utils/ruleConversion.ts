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
        if (value.value === "now") {
          const currentDate = new Date();
          const currentTime = currentDate.toLocaleTimeString;
          rules.lessThan = {
            value: currentTime,
            message: value.message,
          };
        }
      }
      if (key === "pattern") {
        rules.pattern = {
          value: value.pattern,
          message: value.message,
        };
      }
      if (key === "range") {
        rules.range = {
          min: value.min,
          max: value.max,
          message: value.message,
        };
      }
    });
  }
  return rules;
};
