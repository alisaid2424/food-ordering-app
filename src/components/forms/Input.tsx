"use client";

import { Path, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";

type TFormProps<T extends FieldValues> = {
  name: Path<T>;
  register?: UseFormRegister<T>;
  placeholder?: string;
  label?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  isTextArea?: boolean;
  isSelect?: boolean;
  options?: { value: string; label: string }[];
  checked?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value?: string;
  id?: string;
};

const Input = <T extends FieldValues>({
  name,
  register,
  placeholder,
  label,
  type = "text",
  error,
  disabled,
  className = "",
  isTextArea = false,
  isSelect = false,
  options = [],
  checked,
  onChange,
  value,
  id,
}: TFormProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputId = id || name;
  const isPasswordField = type === "password";
  const isCheckboxOrRadio = type === "checkbox" || type === "radio";
  const isFileField = type === "file";

  const inputProps = register ? register(name) : {};

  return (
    <div className={className}>
      {label && !isCheckboxOrRadio && !isFileField && (
        <label
          htmlFor={inputId}
          className="block mb-2 font-medium text-black capitalize"
        >
          {label}
        </label>
      )}

      {/* Select Field */}
      {isSelect ? (
        <div className="relative">
          <select
            id={inputId}
            {...inputProps}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full input py-2 px-3 appearance-none border rounded bg-white text-black ${error ? "border-red-500" : ""}`}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-sm text-black"
              >
                {option.label}
              </option>
            ))}
          </select>
          {/* Custom arrow using icon*/}
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2 text-gray-600">
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.853a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      ) : isTextArea ? (
        <>
          <textarea
            id={inputId}
            placeholder={placeholder}
            {...inputProps}
            disabled={disabled}
            rows={4}
            className={`block w-full input resize-none p-2 ${
              error ? "border-red-500" : ""
            }`}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </>
      ) : isCheckboxOrRadio ? (
        <div className="flex items-center">
          <input
            type={type}
            id={inputId}
            {...inputProps}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="accent-red-500"
          />
          {label && (
            <label htmlFor={inputId} className="text-sm text-gray-800 ml-2">
              {label}
            </label>
          )}
        </div>
      ) : isFileField ? (
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id={inputId}
            {...inputProps}
            onChange={onChange}
          />
          <label
            htmlFor={inputId}
            className="border rounded-full w-[200px] h-[200px] flex items-center justify-center cursor-pointer"
          >
            <IoCameraOutline className="w-8 h-8 text-gray-500" />
          </label>
        </div>
      ) : (
        <>
          <div className="relative flex items-center">
            <input
              type={
                isPasswordField ? (showPassword ? "text" : "password") : type
              }
              id={inputId}
              autoComplete="off"
              placeholder={placeholder}
              {...inputProps}
              onChange={onChange}
              value={value}
              disabled={disabled}
              className={`block w-full input pe-10 ${
                error ? "border-red-500" : ""
              }`}
            />
            {isPasswordField && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute end-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <FiEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <FiEyeOff className="h-5 w-5 text-gray-500" />
                )}
              </button>
            )}
          </div>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </>
      )}
    </div>
  );
};

export default Input;
