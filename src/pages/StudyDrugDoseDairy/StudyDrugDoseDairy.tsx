import { useStudyDrugDoseDairy } from "./useStudyDrugDoseDairy";
import RenderField from "../../utils/RenderField";
import React from "react";
import type { FieldError } from "react-hook-form";
const StudyDrugDoseDairy = React.memo(() => {
  const {
    title,
    fields,
    register,
    handleSubmit,
    handleFormSubmit,
    errors,
    control,
    watch,
    handleFormError,
  } = useStudyDrugDoseDairy();

  return (
    <div className="mx-40 p-4">
      <div className="mb-3 font-bold">{title}</div>
      <form
        className="border rounded-lg border-gray-200 bg-white p-2 shadow-sm"
        onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
      >
        {fields.map((field) => {
          return (
            <div key={field.id}>
              {
                <RenderField<Record<string, any>>
                  field={field}
                  error={errors[field.id] as FieldError}
                  register={register}
                  control={control}
                  errors={errors}
                  watch={watch}
                />
              }
            </div>
          );
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
