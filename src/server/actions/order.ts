"use server";

import prisma from "@/utils/db";
import routes from "@/utils/routes";
import { revalidatePath } from "next/cache";

//createNewOrder
export const createNewOrder = async ({
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
}) => {
  try {
    if (productItems.length === 0) {
      throw new Error("No product items provided");
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

    revalidatePath(routes.orders);
    revalidatePath(routes.home);

    return {
      status: 201,
      message: "Order added successfully",
      order: newOrder,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};

//delete Order
export const deleteOrder = async (id: string) => {
  try {
    await prisma.order.delete({
      where: {
        id,
      },
    });

    revalidatePath(routes.orders);
    revalidatePath(routes.home);

    return {
      status: 200,
      message: "Order deleted successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};
