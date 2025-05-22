import { Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { twMerge } from "tw-merge";
import clsx from "clsx";
interface Props {
  onChange?: (file: File) => void;
  label?: string;
  placeholder?: string;
  name: string;
  error?: string;
  required?: boolean;
  readonly?: boolean;
}

const ImageUpload = ({
  onChange,
  name,
  label,
  placeholder,
  error,
  required,
  readonly,
}: Props) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    if (inputRef.current !== null) inputRef.current.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      const previewURL = URL.createObjectURL(imageFile);
      setPreviewImage(previewURL);
      setFileName(imageFile.name);
      onChange?.(imageFile);
    }
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
        {label} {required && <span className="text-red-400">*</span>}
      </div>
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
            className="flex items-center gap-2 text-gray-400"
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
            }}
            className="absolute top-1 right-1 bg-white rounded-full  shadow hover:bg-gray-100 p-1"
          >
            <X size={10} />
          </button>
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          hidden
          onChange={handleFileChange}
          readOnly={readonly}
          name={name}
        />
      </div>
      {error && <p className="text-[10px] text-red-400">{error}</p>}
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

export default React.memo(ImageUpload);
