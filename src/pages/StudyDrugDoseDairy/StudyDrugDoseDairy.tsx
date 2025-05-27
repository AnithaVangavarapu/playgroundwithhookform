import { useStudyDrugDoseDairy } from "./useStudyDrugDoseDairy";
import React from "react";
import { type ColumnLayoutFiled } from "../../types/types";
import { FormProvider } from "react-hook-form";
import FieldWrapper from "../../utils/FieldWrapper";
const StudyDrugDoseDairy = React.memo(() => {
  const { title, fields, methods, handleFormSubmit, handleFormError } =
    useStudyDrugDoseDairy();

  return (
    <div className="mx-40 p-4">
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
          <div className="text-center">
            <button
              className="border rounded-lg p-1 text-[10px] w-15 font-medium bg-blue-950 text-white border-blue-950 cursor-pointer"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                methods.handleSubmit(handleFormSubmit, handleFormError)();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
});

export default StudyDrugDoseDairy;
