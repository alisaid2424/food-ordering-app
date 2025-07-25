"use server";

import {
  CreateProductSchema,
  CreateProductType,
  UpdateProductSchema,
  UpdateProductType,
} from "@/utils/validationShemas";
import { getImageUrl } from "./getImageUrl";
import { revalidatePath } from "next/cache";
import routes from "@/utils/routes";
import prisma from "@/utils/db";
import { ExtraIngredients, ProductSizes } from "@prisma/client";
import { getTranslations } from "next-intl/server";

// Add New Product
export const addNewProduct = async (
  data: CreateProductType,
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });
  const validation = await getTranslations({ locale, namespace: "validation" });
  const result = CreateProductSchema(validation).safeParse(data);

  if (!result.success) {
    return { message: t("unexpectedError"), status: 400 };
  }

  const fulldata = result.data;

  const basePrice = Number(fulldata.basePrice);

  const imageUrl =
    fulldata.image instanceof File && fulldata.image.size > 0
      ? await getImageUrl({
          imageFile: fulldata.image,
          publicId: fulldata.image.name,
          pathName: "product_images",
        })
      : undefined;

  try {
    await prisma.product.create({
      data: {
        name: fulldata.name,
        description: fulldata.description,
        image: imageUrl ?? "",
        basePrice,
        categoryId: fulldata.categoryId,
        ...(fulldata.sizes?.length && {
          sizes: {
            createMany: {
              data: fulldata.sizes.map((size) => ({
                name: size.name as ProductSizes,
                price: size.price,
              })),
            },
          },
        }),
        ...(fulldata.extras?.length && {
          extras: {
            createMany: {
              data: fulldata.extras.map((extra) => ({
                name: extra.name as ExtraIngredients,
                price: extra.price,
              })),
            },
          },
        }),
      },
    });

    revalidatePath(`/${locale}${routes.menu}`);
    revalidatePath(`/${locale}${routes.menuItems}`);
    revalidatePath(`/${locale}${routes.home}`);

    return {
      status: 201,
      message: t("productAdded"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

//Update Product
export const updateProduct = async (
  data: UpdateProductType,
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });
  const validation = await getTranslations({ locale, namespace: "validation" });

  const result = UpdateProductSchema(validation).safeParse(data);

  if (!result.success) {
    return { message: t("unexpectedError"), status: 400 };
  }

  const fulldata = result.data;

  const basePrice = Number(fulldata.basePrice);

  const imageUrl =
    typeof fulldata.image === "string"
      ? fulldata.image
      : fulldata.image instanceof File && fulldata.image.size > 0
        ? await getImageUrl({
            imageFile: fulldata.image,
            publicId: fulldata.image.name,
            pathName: "product_images",
          })
        : undefined;

  try {
    const product = await prisma.product.findUnique({
      where: { id: fulldata.id },
    });

    if (!product) {
      return {
        status: 400,
        message: t("unexpectedError"),
      };
    }

    // Delete existing sizes and extras
    await prisma.size.deleteMany({
      where: { productId: fulldata.id },
    });

    await prisma.extra.deleteMany({
      where: { productId: fulldata.id },
    });

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: fulldata.id },
      data: {
        name: fulldata.name,
        description: fulldata.description,
        image: imageUrl ?? product.image,
        basePrice,
        categoryId: fulldata.categoryId,
        ...(fulldata.sizes?.length && {
          sizes: {
            createMany: {
              data: fulldata.sizes.map((size) => ({
                name: size.name as ProductSizes,
                price: size.price,
              })),
            },
          },
        }),
        ...(fulldata.extras?.length && {
          extras: {
            createMany: {
              data: fulldata.extras.map((extra) => ({
                name: extra.name as ExtraIngredients,
                price: extra.price,
              })),
            },
          },
        }),
      },
    });

    revalidatePath(`/${locale}${routes.menu}`);
    revalidatePath(`/${locale}${routes.menuItems}`);
    revalidatePath(`/${locale}${routes.menuItems}/${updatedProduct.id}/edit`);
    revalidatePath(`/${locale}${routes.home}`);

    return {
      status: 200,
      message: t("updateProductSucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

//delete Product
export const deleteProduct = async (id: string, locale: string = "en") => {
  const t = await getTranslations({ locale, namespace: "messages" });

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${locale}${routes.menu}`);
    revalidatePath(`/${locale}${routes.menuItems}`);
    revalidatePath(`/${locale}${routes.home}`);

    return {
      status: 200,
      message: t("deleteProductSucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};
