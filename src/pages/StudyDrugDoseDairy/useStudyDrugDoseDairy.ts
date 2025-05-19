import { useForm, type FieldErrors } from "react-hook-form";
import { type FormFieldProp, type FormActions } from "../../types/types";
import { useState, useEffect } from "react";
interface FormDataProps {
  formId: string;
  formTitle: string;
  showAs: string;
  fields: FormFieldProp[];
  actions?: FormActions;
}
export const useStudyDrugDoseDairy = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<Record<string, any>>({
    shouldUnregister: true,
  });
  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<FormFieldProp[]>([]);

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

  //set title and fields when fetched data changes
  useEffect(() => {
    if (formData !== null) {
      setTitle(formData?.formTitle);
      setFields(formData?.fields);
    }
  }, [formData]);

  //submit form
  const handleFormSubmit = async (data: Record<string, any>) => {
    console.log(data);
    alert("submitted");
  };

  //display errors in console while submits
  const handleFormError = (errors: FieldErrors) => {
    console.log(" Validation errors:", errors);
    alert("errors");
  };

  return {
    register,
    handleSubmit,
    title,
    fields,
    handleFormSubmit,
    errors,
    control,
    watch,
    handleFormError,
    setValue,
  };
};
