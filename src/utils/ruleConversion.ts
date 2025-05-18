import { type Validation } from "../types/types";
export const ruleConversion = (validation: Validation) => {
  // console.log("validation fields", validation);
  let rules: Record<string, any> = {};
  rules.validate = {};
  const customArray = Object.entries(validation);
  if (customArray.length === 0) {
    return {};
  } else {
    customArray.forEach(([key, value]) => {
      if (key === "required") {
        if (value.value === true) {
          rules.required = value.message;
        }
      }

      if (key === "lessThan") {
        // console.log("===lessThan key found, value:", value.value);
        // console.log("=== message", value.message);
        if (value.value === "today") {
          const currentDate = new Date();
          rules.validate = {
            ...(rules.validate || {}),
            lessThanDate: (val: Date) => {
              const comparingValue = new Date(val);
              return comparingValue < currentDate || value.message;
            },
          };
        }
        if (value.value === "now") {
          const currentTime = new Date().getTime();

          rules.validate = {
            ...(rules.validate || {}),
            lessThanTime: (val: Date) => {
              const comparingValue = new Date(val).getTime();

              return comparingValue < currentTime || value.message;
            },
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
        rules.validate = {
          ...(rules.validate || {}),
          inRange: (val: string | number) => {
            if (Number(val) < value.min || Number(val) > value.max) {
              return value.message;
            }
            return true;
          },
        };
      }
    });
  }
  // console.log("rules which are returning", rules);
  return rules;
};
