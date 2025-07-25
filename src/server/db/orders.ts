import { cache } from "@/utils/cache";
import { ORDERS_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";

//getOrders
export const getOrders = cache(
  (pageNumber: number) => {
    return prisma.order.findMany({
      skip: ORDERS_PER_PAGE * (pageNumber - 1),
      take: ORDERS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  },
  ["orders"],
  { revalidate: 3600 }
);

// getOrder
export const getOrder = cache(
  async (orderId: string) => {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: {
            product: {
              include: {
                sizes: true,
                extras: true,
              },
            },
          },
        },
      },
    });
    return order;
  },
  [`order-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);
