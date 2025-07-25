"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/forms/Input";
import ButtonSpinner from "@/components/ButtonSpinner";
import UploadImage from "@/components/UploadImage";
import {
  CreateProductSchema,
  CreateProductType,
} from "@/utils/validationShemas";
import routes from "@/utils/routes";
import { Category } from "@prisma/client";
import AccordionOptions from "../_components/AccordionOptions";
import { addNewProduct } from "@/server/actions/product";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export enum ItemOptionsKeys {
  SIZES,
  EXTRAS,
}

interface AddProductFormProps {
  categories: Category[];
}

const AddProductForm = ({ categories }: AddProductFormProps) => {
  const t = useTranslations("admin.menu-items.addProduct.form");
  const router = useRouter();
  const locale = useLocale();
  const validation = useTranslations("validation");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateProductType>({
    mode: "onBlur",
    resolver: zodResolver(CreateProductSchema(validation)),
    defaultValues: {
      categoryId: "",
      sizes: [],
      extras: [],
    },
  });

  const {
    fields: sizesFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: "sizes",
  });

  const {
    fields: extrasFields,
    append: appendExtra,
    remove: removeExtra,
  } = useFieldArray({
    control,
    name: "extras",
  });

  const formSubmitHandler: SubmitHandler<CreateProductType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      console.log(data);

      const res = await addNewProduct(data, locale);
      if (res.status && res.message) {
        if (res.status === 201) {
          toast.success(res.message);
          router.push(`${routes.menuItems}?pageNumber=1`);
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
      <UploadImage<CreateProductType>
        currentImage=""
        altImage="Product-img"
        setValue={setValue}
        errors={errors}
        name="image"
      />

      <div className="flex flex-col space-y-3 flex-1">
        <Input
          label={t("name.label")}
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
          disabled={isLoading}
          placeholder={t("name.placeholder")}
        />

        <Input
          label={t("description.label")}
          name="description"
          type="textarea"
          register={register}
          error={errors.description?.message}
          disabled={isLoading}
          placeholder={t("description.placeholder")}
          isTextArea={true}
        />

        <Input
          label={t("basePrice.label")}
          name="basePrice"
          type="number"
          register={register}
          error={errors.basePrice?.message}
          disabled={isLoading}
          placeholder={t("basePrice.placeholder")}
        />

        <div className="lg:w-96">
          <Input
            label={t("category.label")}
            name="categoryId"
            register={register}
            isSelect
            options={[
              { value: "", label: t("category.placeholder") },
              ...categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              })),
            ]}
            error={errors.categoryId?.message}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-start gap-5 flex-col lg:flex-row">
          <AccordionOptions<CreateProductType>
            control={control}
            name="sizes"
            fields={sizesFields}
            append={appendSize}
            remove={removeSize}
            optionKey={ItemOptionsKeys.SIZES}
          />

          <AccordionOptions<CreateProductType>
            control={control}
            name="extras"
            fields={extrasFields}
            append={appendExtra}
            remove={removeExtra}
            optionKey={ItemOptionsKeys.EXTRAS}
          />
        </div>

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

export default AddProductForm;
