import { type ValuePopulateFrom } from "../types/types";
interface Props {
  type: ValuePopulateFrom["type"];
  formulaType: ValuePopulateFrom["formulaType"];
  defaultValue: ValuePopulateFrom["default"];
  formStateData: Array<string>;
}
export const populateFrom = ({
  type,
  formulaType,
  formStateData,
  defaultValue,
}: Props) => {
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
