import { cache } from "@/utils/cache";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";

export const getProductsByCategory = cache(
  () => {
    const productsByCategory = prisma.category.findMany({
      include: {
        products: {
          include: {
            sizes: true,
            extras: true,
          },
        },
      },
    });
    return productsByCategory;
  },
  ["products-by-category"],
  { revalidate: 3600 }
);

export const getBestSellers = cache(
  (limit?: number | undefined) => {
    const bestSellers = prisma.product.findMany({
      where: {
        orders: {
          some: {},
        },
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      include: {
        sizes: true,
        extras: true,
      },
      take: limit,
    });

    return bestSellers;
  },
  ["best-sellers"],
  { revalidate: 3600 }
);

export const getProducts = cache(
  async (pageNumber: number) => {
    const products = await prisma.product.findMany({
      skip: PRODUCTS_PER_PAGE * (pageNumber - 1),
      take: PRODUCTS_PER_PAGE,
      orderBy: { createdAt: "desc" },
    });
    return products;
  },
  ["products"],
  { revalidate: 3600 }
);

export const getProduct = cache(
  (id: string) => {
    const product = prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        sizes: true,
        extras: true,
      },
    });
    return product;
  },
  [`product-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);
