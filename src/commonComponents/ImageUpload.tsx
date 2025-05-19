import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { twMerge } from "tw-merge";
import clsx from "clsx";
import { type Validation } from "../types/types";
import {
  type FieldError,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type Control,
  Controller,
} from "react-hook-form";
import { ruleConversion } from "../utils/ruleConversion";

interface Props<T extends FieldValues> {
  control: Control<T>;
  label?: string;
  placeholder?: string;
  name: Path<T>;
  error?: FieldError;
  readonly?: boolean;
  validation?: Validation;
}

const ImageUpload = <T extends FieldValues>({
  label,
  placeholder,
  error,
  readonly,
  validation,
  control,
  name,
}: Props<T>) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rules: RegisterOptions<T, Path<T>> | undefined = validation
    ? ruleConversion(validation)
    : undefined;

  // console.log("rules in the image upload", rules);
  const handleUpload = () => {
    if (inputRef.current !== null) inputRef.current.click();
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <div className={twMerge(clsx("mx-1 mt-3"))}>
      <div className="text-[12px] text-gray-500  font-medium">
        {label}
        <span className="text-red-400">{`${rules?.required ? " *" : ""}`}</span>
      </div>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <div
            className={twMerge(
              clsx(
                `relative h-7.5 border border-dashed text-[10px] place-items-center rounded-lg  cursor-pointer p-0.5 border-gray-300`
              )
            )}
            onClick={() => previewImage && setShowModal(true)}
          >
            {!previewImage ? (
              <button
                type="button"
                onClick={handleUpload}
                className="flex items-center gap-2 text-gray-400 cursor-pointer"
                disabled={readonly}
              >
                <Upload width={15} color="gray" />
                {placeholder || "Upload Image"}
              </button>
            ) : (
              <span className="flex p-1">{fileName}</span>
            )}
            {previewImage && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                  field.onChange(null);
                }}
                className="absolute top-1 right-1 bg-white rounded-full  shadow hover:bg-gray-100 p-1"
              >
                <X size={10} />
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={(el) => {
                field.ref(el);
                inputRef.current = el;
              }}
              hidden
              onChange={(event) => {
                const imageFile = event.target.files?.[0];
                if (imageFile) {
                  const previewURL = URL.createObjectURL(imageFile);
                  setPreviewImage(previewURL);
                  setFileName(imageFile.name);
                  field.onChange(imageFile);
                }
              }}
              readOnly={readonly}
            />
          </div>
        )}
      />
      {error && <p className="text-[10px] text-red-400">{error.message}</p>}
      {showModal && previewImage && (
        <div className="fixed inset-0 z-50 bg-gray-50 bg-opacity-70 flex items-center justify-center">
          <div
            className="relative p-2 bg-white rounded shadow-lg max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Full Preview"
              className="rounded max-w-full max-h-[80vh] object-contain"
            />
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
              }}
              className="absolute top-2 right-2 bg-white rounded-full  shadow hover:bg-gray-100 p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
