"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonSpinner from "@/components/ButtonSpinner";
import Input from "@/components/forms/Input";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UpdateCategorySchema,
  UpdateCategoryType,
} from "@/utils/validationShemas";
import UploadImage from "@/components/UploadImage";
import { toast } from "react-toastify";
import { updateCategory } from "@/server/actions/category";
import routes from "@/utils/routes";

interface EditCategoryFormProps {
  category: Category;
}
const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateCategoryType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      id: category.id ?? "",
      name: category.name ?? "",
      description: category.description ?? "",
      image: category.image ?? "",
    },
  });

  const formSubmitHandler: SubmitHandler<UpdateCategoryType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await updateCategory(data);
      if (res.status && res.message) {
        if (res.status === 200) {
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
      <UploadImage<UpdateCategoryType>
        currentImage={category.image ?? ""}
        altImage={category.name ?? "Category-img"}
        setValue={setValue}
        errors={errors}
        name="image"
      />

      <div className="flex flex-col space-y-3 flex-1">
        <Input
          name="id"
          value={category.id}
          type="hidden"
          register={register}
        />

        <Input
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
          disabled={isLoading}
          placeholder="Enter Category Title"
        />

        <Input
          name="description"
          type="textarea"
          register={register}
          error={errors.description?.message}
          disabled={isLoading}
          placeholder="Enter Category Description"
          isTextArea={true}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="text-lg italic text-white bg-red-500 hover:bg-red-600 p-2 rounded-lg font-bold transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? <ButtonSpinner /> : "Edit Category"}
        </button>
      </div>
    </form>
  );
};

export default EditCategoryForm;
