import { useForm, type FieldErrors } from "react-hook-form";
import { type FormFieldProp, type FormActions } from "../../types/types";
import { useState, useEffect, useMemo } from "react";
interface FormDataProps {
  formId: string;
  formTitle: string;
  showAs: string;
  fields: FormFieldProp[];
  actions?: FormActions;
}
export const useStudyDrugDoseDairy = () => {
  const methods = useForm<Record<string, any>>({
    shouldUnregister: true,
  });

  const [formData, setFormData] = useState<FormDataProps | null>(null);
  //fetch data
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data: FormDataProps) => setFormData(data))
      .catch((error) => {
        console.log(error);
        setFormData(null);
      });
  }, []);

  //memorized fields
  const memorizedFields = useMemo(() => {
    return formData?.fields ?? [];
  }, [formData]);

  //submit form
  const handleFormSubmit = async (data: Record<string, any>) => {
    console.log(data);
    // alert("submitted");
  };

  //display errors in console while submits
  const handleFormError = (errors: FieldErrors) => {
    console.log(" Validation errors:", errors);
    // alert("errors");
  };

  return {
    methods,
    title: formData?.formTitle ?? "",
    fields: memorizedFields,
    handleFormSubmit,
    handleFormError,
  };
};
