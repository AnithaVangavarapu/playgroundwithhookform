import { type ValuePopulateFrom } from "../types/types";
export const populateFrom = (
  populateFormValues: ValuePopulateFrom,
  formStateData: Array<string>
) => {
  const type = populateFormValues.type;
  const formulaType = populateFormValues.formulaType;
  // const fields = populateFormValues.fields;
  const defaultValue = populateFormValues.default;

  if (type === "formula") {
    switch (formulaType) {
      case "multiply":
        const total = formStateData.reduce(
          (acc, item) => acc * Number(item),
          1
        );
        // console.log("total", total);
        return isNaN(total) ? defaultValue : String(total);
      default:
        return;
    }
  }
  return defaultValue;
};
