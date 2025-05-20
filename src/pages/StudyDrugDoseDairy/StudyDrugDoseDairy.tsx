import { useStudyDrugDoseDairy } from "./useStudyDrugDoseDairy";
import FieldItem from "../../utils/FieldItem";
import React from "react";
import type { FieldError } from "react-hook-form";
import { type ColumnLayoutFiled } from "../../types/types";
const StudyDrugDoseDairy = React.memo(() => {
  const {
    title,
    fields,
    register,
    handleSubmit,
    handleFormSubmit,
    errors,
    control,
    handleFormError,
    setValue,
  } = useStudyDrugDoseDairy();

  return (
    <div className="mx-40 p-4">
      <div className="mb-3 font-bold">{title}</div>
      <form
        className="border rounded-lg border-gray-200 bg-white p-2 shadow-sm"
        onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
      >
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
                    <FieldItem
                      field={item}
                      error={errors[item.id] as FieldError}
                      control={control}
                      register={register}
                      setValue={setValue}
                    />
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div key={field.id}>
                {
                  <FieldItem
                    field={field}
                    error={errors[field.id] as FieldError}
                    register={register}
                    control={control}
                    setValue={setValue}
                  />
                }
              </div>
            );
          }
        })}
        <div className="text-center">
          <button
            className="border rounded-lg p-1 text-[10px] w-15 font-medium bg-blue-950 text-white border-blue-950 cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
});

export default StudyDrugDoseDairy;
