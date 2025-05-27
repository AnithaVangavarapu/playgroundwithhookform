import type { FormFieldProp } from "../types/types";
import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import { visibilityCheck } from "../utils/visibilityCheck";
export const useFieldVisibility = (fieldItem: FormFieldProp) => {
  if(!fieldItem.visibilityDependsOn) return true;
  const { control } = useFormContext();
  //watch value for visibility field
  const watchedValue = fieldItem.visibilityDependsOn
    ? useWatch({
        control,
        name: fieldItem.visibilityDependsOn.field,
      })
    : undefined;
  //check to render item
  const showItem = useMemo(() => {
    if (fieldItem.visibilityDependsOn) {
      if (watchedValue) {
        const visible = visibilityCheck({
          action: fieldItem.visibilityDependsOn.condition,
          value: fieldItem.visibilityDependsOn.value,
          fieldValue: watchedValue,
        });

        return visible;
      }
    } 
  }, [watchedValue]);
  return showItem;
};
