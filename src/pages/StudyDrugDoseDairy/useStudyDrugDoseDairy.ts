import { useForm } from "react-hook-form";
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
  } = useForm<Record<string, any>>();
  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<FormFieldProp[]>([]);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data: FormDataProps) => setFormData(data))
      .catch((error) => {
        console.log(error);
        setFormData(null);
      });
  }, []);
  useEffect(() => {
    if (formData !== null) {
      setTitle(formData?.formTitle);
      setFields(formData?.fields);
    }
  }, [formData]);
  const handleFormSubmit = async (data: Record<string, any>) => {
    console.log(data);
  };
  return { register, handleSubmit, title, fields, handleFormSubmit, errors };
};
