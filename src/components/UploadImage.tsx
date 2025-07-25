"use client";

import Image from "next/image";
import Input from "./forms/Input";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import { useState } from "react";

interface UploadImageProps<T extends FieldValues> {
  currentImage: string;
  altImage: string;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
}

const UploadImage = <T extends FieldValues>({
  currentImage,
  altImage,
  setValue,
  errors,
  name,
}: UploadImageProps<T>) => {
  const [selectedImage, setSelectedImage] = useState(currentImage);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setValue(name, file as T[typeof name], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue(name, undefined as T[typeof name], {
        shouldValidate: true,
        shouldDirty: true,
      });
      setSelectedImage("");
    }
  };

  return (
    <div className="flex flex-col gap-5 text-center">
      <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={altImage}
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
        )}

        <Input<T>
          name={name}
          type="file"
          onChange={handleImageChange}
          className={`${
            selectedImage
              ? "group-hover:opacity-[1] opacity-0 transition-opacity duration-200"
              : ""
          } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
        />
      </div>

      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default UploadImage;
