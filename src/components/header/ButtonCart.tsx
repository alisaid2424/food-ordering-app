"use client";

import { Link } from "@/i18n/navigation";
import { selectCartItems } from "@/store/cart/cartSlice";
import { useAppSelector } from "@/store/hook";
import routes from "@/utils/routes";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const ButtonCart = () => {
  const [quantity, setQuantity] = useState(0);
  const [isAnimateCart, setIsAnimateCart] = useState(false);
  const cartItems = useAppSelector(selectCartItems);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity!, 0);
    setQuantity(total);
  }, [cartItems]);

  useEffect(() => {
    if (!quantity) {
      return;
    }
    setIsAnimateCart(true);

    const deponceCart = setTimeout(() => {
      setIsAnimateCart(false);
    }, 300);

    return () => clearTimeout(deponceCart);
  }, [quantity]);

  return (
    <Link href={routes.cart} className="flex relative">
      <IoCartOutline className="text-3xl font-bold" />

      <span
        className={`absolute w-6 h-6 -right-5 -top-3 rounded-full bg-red-500 flex items-center justify-center text-white text-sm  ${
          isAnimateCart ? "animate-pumping" : ""
        } `}
      >
        {quantity}
      </span>
    </Link>
  );
};

export default ButtonCart;
