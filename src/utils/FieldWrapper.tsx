import { useFieldVisibility } from "../customHooks/useFieldVisibility";
import FieldItem from "./FieldItem";
import type { FormFieldProp } from "../types/types";
const FieldWrapper = ({ fieldItem }: { fieldItem: FormFieldProp }) => {
  const isvisible = useFieldVisibility(fieldItem);
  if (!isvisible) return null;
  return (
    <div>
      <FieldItem fieldItem={fieldItem} />
    </div>
  );
};

export default FieldWrapper;
