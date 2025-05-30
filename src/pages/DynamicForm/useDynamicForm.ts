import { useForm, type FieldErrors } from "react-hook-form";
import { type FormDataProps } from "../../types/types";
import { useState, useEffect, useMemo } from "react";
import { visibilityCheck } from "../../utils/visibilityCheck";
import { useNavigate, useParams } from "react-router-dom";
import isEqual from "lodash/isEqual";
export const useDynamicForm = () => {
  const methods = useForm<Record<string, any>>();
  const [formData, setFormData] = useState<FormDataProps | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);

  //import json data based on id
  const importJson = async (id: string | undefined) => {
    let res;
    let data: FormDataProps;
    switch (id) {
      case undefined:
      case "study-drug-dose":
        res = await import("../../data/data.json");
        data = res.default as FormDataProps;
        return data;
      case "hypoglycemia":
        res = await import("../../data/hypoglycemiaDiary.json");
        data = res.default as FormDataProps;
        return data;
      default:
        return null;
    }
  };

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      const data = await importJson(id);
      // console.log(data);
      if (data) {
        if (!isEqual(data, formData)) {
          methods.unregister();
          methods.reset();
          setFormData(data);
        }
      }
    };
    fetchData();
  }, [id]);

  //memorized fields
  const memorizedFields = useMemo(() => {
    return formData?.fields ?? [];
  }, [formData]);

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
