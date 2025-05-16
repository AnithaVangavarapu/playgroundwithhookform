import { useStudyDrugDoseDairy } from "./useStudyDrugDoseDairy";
// import RenderField from "../../formUtils/RenderField";
import React from "react";
import { Text } from "../../commonComponents";
import type { FieldError } from "react-hook-form";
const StudyDrugDoseDairy = React.memo(() => {
  const { title, fields, register, handleSubmit, handleFormSubmit, errors } =
    useStudyDrugDoseDairy();

  return (
    <div className="mx-40 p-4">
      <div className="mb-3 font-bold">{title}</div>
      <form
        className="border rounded-lg border-gray-200 bg-white p-2 shadow-sm"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {fields.map((field) => {
          return (
            <div key={field.id}>
              <Text
                register={register}
                name={field.id}
                validation={field.validation}
                label={field.label}
                placeholder={field.placeholder}
                readonly={field.readOnly}
                error={errors?.[field.id]?.message as FieldError}
              />
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
