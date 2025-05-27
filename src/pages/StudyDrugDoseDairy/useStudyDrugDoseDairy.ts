import { useForm, type FieldErrors } from "react-hook-form";
import { type FormDataProps } from "../../types/types";
import { useState, useEffect, useMemo } from "react";
import { visibilityCheck } from "../../utils/visibilityCheck";
import { useNavigate } from "react-router-dom";

export const useStudyDrugDoseDairy = () => {
  const methods = useForm<Record<string, any>>();
  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string>("");
  const navigate = useNavigate();

  //fetch data
  useEffect(() => {
    fetch("/data/data.json")
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
  const handleFormSubmit = (data: Record<string, any>) => {
    console.log(data);

    if (formData?.actions) {
      const action = formData.actions?.openForm?.conditions[0].condition;
      const value = formData.actions?.openForm?.conditions[0].value;
      const fieldValue = formData.actions?.openForm?.conditions[0].field
        ? data[formData.actions?.openForm?.conditions[0].field]
        : undefined;
      if (action && value && fieldValue) {
        const visible = visibilityCheck({
          action: action,
          value: value,
          fieldValue: fieldValue,
        });
        if (visible) {
          setShowModal(visible);
        }
        if (formData.actions?.openForm?.alertMessage)
          setModalData(formData.actions?.openForm?.alertMessage);
      }
    }
  };

  //display errors in console while submits
  const handleFormError = (errors: FieldErrors) => {
    console.log("Validation errors:", errors);
    // alert("errors");
  };
  const handleNavigation = () => {
    navigate("/hypoglycemiaDiary");
    setShowModal(false);
    setModalData("");
  };

  return {
    methods,
    title: formData?.formTitle ?? "",
    fields: memorizedFields,
    handleFormSubmit,
    handleFormError,
    showModal,
    setShowModal,
    modalData,
    handleNavigation,
  };
};
