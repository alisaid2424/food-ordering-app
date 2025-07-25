"use server";

import prisma from "@/utils/db";
import routes from "@/utils/routes";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

//createNewOrder
export const createNewOrder = async (
  {
    userName,
    email,
    phone,
    streetAddress,
    postalCode,
    city,
    country,
    amount,
    productItems,
  }: {
    userName: string;
    email: string;
    phone?: string;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    amount: number;
    productItems: {
      productId: string;
      quantity: number;
      size?: { id: string; name: string; price: number };
      extras?: { id: string; name: string; price: number; productId: string }[];
      userId: string;
    }[];
  },
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });

  try {
    if (productItems.length === 0) {
      throw new Error(t("noProductItems"));
    }

    const userId = productItems[0].userId;

    const newOrder = await prisma.order.create({
      data: {
        paid: true,
        userName,
        email,
        phone,
        streetAddress,
        postalCode,
        city,
        country,
        amount,
        user: { connect: { id: userId } },
        products: {
          create: productItems.map((item) => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            sizeName: item.size?.name ?? null,
            sizePrice: item.size?.price ?? 0,
            extras: item.extras ?? [],
          })),
        },
      },
      include: {
        products: {
          include: { product: true },
        },
      },
    });

    revalidatePath(`/${locale}${routes.orders}`);
    revalidatePath(`/${locale}${routes.home}`);

    return {
      status: 201,
      message: t("orderAddedSuccess"),
      order: newOrder,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

//delete Order
export const deleteOrder = async (id: string, locale: string = "en") => {
  const t = await getTranslations({ locale, namespace: "messages" });

  try {
    await prisma.order.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${locale}${routes.orders}`);
    revalidatePath(`/${locale}${routes.home}`);

    return {
      status: 200,
      message: t("orderDeletedSuccess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};
