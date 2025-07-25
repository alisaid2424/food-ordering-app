"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/forms/Input";
import ButtonSpinner from "@/components/ButtonSpinner";
import UploadImage from "@/components/UploadImage";
import {
  CreateCategorySchema,
  CreateCategoryType,
} from "@/utils/validationShemas";
import { addCategory } from "@/server/actions/category";
import routes from "@/utils/routes";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const AddCategoryForm = () => {
  const t = useTranslations("admin.categories.addCategory.form");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();
  const validation = useTranslations("validation");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCategoryType>({
    mode: "onBlur",
    resolver: zodResolver(CreateCategorySchema(validation)),
  });

  const formSubmitHandler: SubmitHandler<CreateCategoryType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await addCategory(data, locale);
      if (res.status && res.message) {
        if (res.status === 201) {
          toast.success(res.message);
          router.push(`${routes.categories}?pageNumber=1`);
        } else {
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="flex flex-col md:flex-row gap-10"
    >
      <UploadImage<CreateCategoryType>
        currentImage=""
        altImage="Category-img"
        setValue={setValue}
        errors={errors}
        name="image"
      />

      <div className="flex flex-col space-y-3 flex-1">
        <Input
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
          disabled={isLoading}
          placeholder={t("name.placeholder")}
          label={t("name.label")}
        />

        <Input
          name="description"
          type="textarea"
          register={register}
          error={errors.description?.message}
          disabled={isLoading}
          placeholder={t("description.placeholder")}
          label={t("description.label")}
          isTextArea={true}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="text-lg italic text-white bg-red-500 hover:bg-red-600 p-2 rounded-lg font-bold transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? <ButtonSpinner /> : t("submit")}
        </button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
