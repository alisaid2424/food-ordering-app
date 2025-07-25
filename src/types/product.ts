import { Extra, Order, Product, Size } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type productWithRelations = Product & {
  sizes: Size[];
  extras: Extra[];
};

export type OrderProductWithProduct = {
  id: string;
  quantity: number;
  sizeName: string | null;
  sizePrice: number | null;
  extras?: Prisma.JsonValue | null;
  product: Product & {
    sizes: Size[];
    extras: Extra[];
  };
};
export type orderWithProduct = Order & {
  products: OrderProductWithProduct[];
};

export type cartItem = {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};
