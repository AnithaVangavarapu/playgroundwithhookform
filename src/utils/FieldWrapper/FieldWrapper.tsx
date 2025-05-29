import { useFieldWrapper } from "./useFieldWrapper";
import FieldItem from "../FieldItem";
import type { FormFieldProp } from "../../types/types";
import React from "react";
interface Props {
  fieldItem: FormFieldProp;
  formId: string;
}
const FieldWrapper = ({ fieldItem, formId }: Props) => {
  // console.log("Field wrapper for", fieldItem.id);
  const isvisible = useFieldWrapper(fieldItem, formId);
  if (!isvisible) return null;
  // console.log("Field wrapper renders field item for", fieldItem.id);
  return (
    <div>
      <FieldItem fieldItem={fieldItem} formId={formId} />
    </div>
  );
};

export default React.memo(FieldWrapper);
