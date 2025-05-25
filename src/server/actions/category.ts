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

// Add New Category
export const addCategory = async (data: CreateCategoryType) => {
  const result = CreateCategorySchema.safeParse(data);

  if (!result.success) {
    return { message: "Invalid data submitted", status: 400 };
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

    revalidatePath(`${routes.menuItems}/add`);
    revalidatePath(routes.menuItems);
    revalidatePath(routes.categories);
    revalidatePath(routes.menu);

    return {
      status: 201,
      message: "Category added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};

//Update Category
export const updateCategory = async (data: UpdateCategoryType) => {
  const result = UpdateCategorySchema.safeParse(data);

  if (!result.success) {
    return { message: "Invalid data submitted", status: 400 };
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

    revalidatePath(`${routes.menuItems}/add`);
    revalidatePath(routes.menuItems);
    revalidatePath(routes.categories);
    revalidatePath(routes.menu);

    return {
      status: 200,
      message: "Category updated successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};

//delete Category
export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    revalidatePath(`${routes.menuItems}/add`);
    revalidatePath(routes.menuItems);
    revalidatePath(routes.categories);
    revalidatePath(routes.menu);

    return {
      status: 200,
      message: "Category deleted successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};
