import { useForm, type FieldErrors } from "react-hook-form";
import { type FormDataProps } from "../../types/types";
import { useState, useEffect, useMemo, useRef } from "react";
import { visibilityCheck } from "../../utils/visibilityCheck";
import { useNavigate, useParams } from "react-router-dom";

export const useDynamicForm = () => {
  const methods = useForm<Record<string, any>>();
  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const prevFormIdRef = useRef<string | null>(null);

  //fetch data
  useEffect(() => {
    methods.unregister();
    methods.reset();
    if (id === undefined || id === "study-drug-dose") {
      fetch("/data/data.json")
        .then((res) => res.json())
        .then((data: FormDataProps) => {
          if (JSON.stringify(data) !== JSON.stringify(formData))
            setFormData(data);
        })
        .catch((error) => {
          console.log(error);
          setFormData(null);
        });
    } else if (id === "hypoglycemia") {
      fetch("/data/hypoglycemiaDiary.json")
        .then((res) => res.json())
        .then((data: FormDataProps) => {
          if (JSON.stringify(data) !== JSON.stringify(formData))
            setFormData(data);
        })
        .catch((error) => {
          console.log(error);
          setFormData(null);
        });
    } else {
      setFormData(null);
    }
  }, [id]);

  //memorized fields
  const memorizedFields = useMemo(() => {
    return formData?.fields ?? [];
  }, [formData]);

  useEffect(() => {
    if (!formData?.formId || prevFormIdRef.current === formData.formId) return;
    methods.reset();
    prevFormIdRef.current = formData.formId;
  }, [formData?.formId]);

  //submit form
  const handleFormSubmit = (data: Record<string, any>) => {
    console.log("data for the form", formData?.formId);
    console.log(data);

    if (formData?.actions) {
      const action = formData.actions?.openForm?.conditions[0].condition;
      const value = formData.actions?.openForm?.conditions[0].value;
      const fieldValue = formData.actions?.openForm?.conditions[0].field
        ? data[
            formData.formId +
              "_" +
              formData.actions?.openForm?.conditions[0].field
          ]
        : undefined;
      if (action && value && fieldValue) {
        const visible = visibilityCheck({
          action: action,
          value: value,
          fieldValue: fieldValue,
        });
        if (visible) {
          setShowModal(visible);
          document.body.style.overflow = "hidden";
        }
        if (formData.actions?.openForm?.alertMessage)
          setModalData(formData.actions?.openForm?.alertMessage);
      }
    }
  };

  //display errors in console while submits
  const handleFormError = (errors: FieldErrors) => {
    console.log("errors for the form", formData?.formId);
    console.log("Validation errors:", errors);
    // alert("errors");
  };

  const handleNavigation = () => {
    // setFormData(null);
    setShowModal(false);
    setModalData("");
    document.body.style.overflow = "unset";
    navigate("/dynamicForm/hypoglycemia");
  };

  return {
    methods,
    title: formData?.formTitle ?? "",
    fields: memorizedFields,
    handleFormSubmit,
    handleFormError,
    showModal,
    modalData,
    handleNavigation,
    formId: formData?.formId,
  };
};
