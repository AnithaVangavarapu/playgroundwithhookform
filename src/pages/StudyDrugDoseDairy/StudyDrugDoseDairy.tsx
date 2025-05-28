import { useStudyDrugDoseDairy } from "./useStudyDrugDoseDairy";
import React from "react";
import { type ColumnLayoutFiled } from "../../types/types";
import { FormProvider } from "react-hook-form";
import FieldWrapper from "../../utils/FieldWrapper";
import { Button } from "../../commonComponents";
import ConfirmModal from "../../components/ConfirmModal";

const StudyDrugDoseDairy = React.memo(() => {
  const {
    title,
    fields,
    methods,
    handleFormSubmit,
    handleFormError,
    showModal,
    modalData,
    handleNavigation,
  } = useStudyDrugDoseDairy();

  return (
    <div className={`mx-40 p-4`}>
      <div className="mb-3 font-bold">{title}</div>
      <FormProvider {...methods}>
        <div className="border rounded-lg border-gray-200 bg-white p-2 shadow-sm">
          {fields.map((field) => {
            if (field.type === "columnLayout") {
              const columnLayoutField = field as ColumnLayoutFiled;
              const columnsWidths = columnLayoutField.columnWidthRatio
                .split(",")
                .map((part) => `${part.trim()}fr`)
                .join(" ");

              return (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: columnsWidths,
                  }}
                  key={field.id}
                >
                  {columnLayoutField.items.map((item) => (
                    <div key={item.id} className="">
                      <FieldWrapper fieldItem={item} />
                    </div>
                  ))}
                </div>
              );
            } else {
              return (
                <div key={field.id}>{<FieldWrapper fieldItem={field} />}</div>
              );
            }
          })}

          <Button
            label="Submit"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              methods.handleSubmit(handleFormSubmit, handleFormError)();
            }}
          />
        </div>
      </FormProvider>
      {showModal && (
        <ConfirmModal
          message={modalData}
          handleConfirmation={handleNavigation}
        />
      )}
    </div>
  );
});

export default StudyDrugDoseDairy;
