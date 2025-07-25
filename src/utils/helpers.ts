import { cartItem } from "@/types/product";

export const getSubtotal = (cart: cartItem[]) =>
  cart.reduce((total, cartItem) => {
    const extrasTotal = cartItem?.extras?.reduce((sum, extra) => {
      return sum + (extra?.price || 0);
    }, 0);

    const itemTotal =
      cartItem.basePrice + (extrasTotal || 0) + (cartItem.size?.price || 0);

    return total + itemTotal * cartItem.quantity!;
  }, 0);

export const getDeliveryFee = (cart: cartItem[]) => getSubtotal(cart) * 0.14;
