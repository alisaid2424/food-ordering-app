"use server";

import {
  CreateCategorySchema,
  CreateCategoryType,
  UpdateCategorySchema,
  UpdateCategoryType,
} from "@/utils/validationShemas";
import { getImageUrl } from "./getImageUrl";
import { revalidatePath } from "next/cache";
import routes from "@/utils/routes";
import prisma from "@/utils/db";
import { getTranslations } from "next-intl/server";

// Add New Category
export const addCategory = async (
  data: CreateCategoryType,
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });
  const validation = await getTranslations({ locale, namespace: "validation" });
  const result = CreateCategorySchema(validation).safeParse(data);

  if (!result.success) {
    return { message: t("unexpectedError"), status: 400 };
  }

  const fulldata = result.data;

  const imageUrl =
    typeof fulldata.image === "string"
      ? fulldata.image
      : fulldata.image instanceof File && fulldata.image.size > 0
        ? await getImageUrl({
            imageFile: fulldata.image,
            publicId: fulldata.image.name,
            pathName: "categories_image",
          })
        : undefined;

  try {
    await prisma.category.create({
      data: {
        name: fulldata.name,
        description: fulldata.description,
        image: imageUrl,
      },
    });

    revalidatePath(`/${locale}${routes.menuItems}/add`);
    revalidatePath(`/${locale}${routes.menuItems}`);
    revalidatePath(`/${locale}${routes.categories}`);
    revalidatePath(`/${locale}${routes.menu}`);

    return {
      status: 201,
      message: t("categoryAdded"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

//Update Category
export const updateCategory = async (
  data: UpdateCategoryType,
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });
  const validation = await getTranslations({ locale, namespace: "validation" });
  const result = UpdateCategorySchema(validation).safeParse(data);

  if (!result.success) {
    return { message: t("unexpectedError"), status: 400 };
  }

  const fulldata = result.data;

  const imageUrl =
    typeof fulldata.image === "string"
      ? fulldata.image
      : fulldata.image instanceof File && fulldata.image.size > 0
        ? await getImageUrl({
            imageFile: fulldata.image,
            publicId: fulldata.image.name,
            pathName: "categories_image",
          })
        : undefined;

  try {
    await prisma.category.update({
      where: {
        id: fulldata.id,
      },
      data: {
        name: fulldata.name,
        description: fulldata.description,
        image: imageUrl,
      },
    });

    revalidatePath(`/${locale}${routes.menuItems}/add`);
    revalidatePath(`/${locale}${routes.menuItems}`);
    revalidatePath(`/${locale}${routes.categories}`);
    revalidatePath(`/${locale}${routes.menu}`);

    return {
      status: 200,
      message: t("updatecategorySucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

//delete Category
export const deleteCategory = async (id: string, locale: string = "en") => {
  const t = await getTranslations({ locale, namespace: "messages" });

  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${locale}${routes.menuItems}/add`);
    revalidatePath(`/${locale}${routes.menuItems}`);
    revalidatePath(`/${locale}${routes.categories}`);
    revalidatePath(`/${locale}${routes.menu}`);

    return {
      status: 200,
      message: t("deleteCategorySucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};
