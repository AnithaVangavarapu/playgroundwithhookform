import { useFieldWrapper } from "./useFieldWrapper";
import FieldItem from "../FieldItem";
import type { FormFieldProp } from "../../types/types";
import React from "react";
interface Props {
  fieldItem: FormFieldProp;
}
const FieldWrapper = ({ fieldItem }: Props) => {
  const isvisible = useFieldWrapper(fieldItem);
  if (!isvisible) return null;

  return (
    <div>
      <FieldItem fieldItem={fieldItem} />
    </div>
  );
};

export default React.memo(FieldWrapper);
