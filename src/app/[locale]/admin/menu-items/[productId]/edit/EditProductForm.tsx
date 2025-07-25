"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Product } from "@prisma/client";
import { useState } from "react";
import {
  UpdateProductSchema,
  UpdateProductType,
} from "@/utils/validationShemas";
import ButtonSpinner from "@/components/ButtonSpinner";
import { ItemOptionsKeys } from "../../add/AddProductForm";
import AccordionOptions from "../../_components/AccordionOptions";
import UploadImage from "@/components/UploadImage";
import Input from "@/components/forms/Input";
import { updateProduct } from "@/server/actions/product";
import { toast } from "react-toastify";
import routes from "@/utils/routes";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface EditProductFormProps {
  product: Product & {
    sizes: { name: string; price: number }[];
    extras: { name: string; price: number }[];
  };
  categories: Category[];
}

const EditProductForm = ({ product, categories }: EditProductFormProps) => {
  const router = useRouter();
  const locale = useLocale();
  const validation = useTranslations("validation");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("admin.menu-items.editProduct.form");

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateProductType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateProductSchema(validation)),
    defaultValues: {
      ...product,
      basePrice: product.basePrice.toString(),
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

  const formSubmitHandler: SubmitHandler<UpdateProductType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      console.log(data);

      const res = await updateProduct(data, locale);
      if (res.status && res.message) {
        if (res.status === 200) {
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
      <UploadImage<UpdateProductType>
        currentImage={product.image ?? ""}
        altImage={product.name ?? "Product-img"}
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
          <AccordionOptions<UpdateProductType>
            control={control}
            name="sizes"
            fields={sizesFields}
            append={appendSize}
            remove={removeSize}
            optionKey={ItemOptionsKeys.SIZES}
          />

          <AccordionOptions<UpdateProductType>
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

export default EditProductForm;
