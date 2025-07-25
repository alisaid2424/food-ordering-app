"use client";

import Loading from "@/components/Loading";
import UpdateItemQuantity from "@/components/UpdateItemQuantity";
import { Link } from "@/i18n/navigation";
import { removeItemFromCart, selectCartItems } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { formatCurrency } from "@/utils/formatters";
import { getDeliveryFee, getSubtotal } from "@/utils/helpers";
import LottieHandler from "@/utils/LottieHandler";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CartItemsProps {
  emptyMessage: string;
}

const CartItems = ({ emptyMessage }: CartItemsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const subtotal = getSubtotal(cart);
  const deliveryFee = getDeliveryFee(cart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cartItems", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div>
      {cart && cart.length > 0 ? (
        <div className="lg:w-4/6 mx-auto">
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-3">
                <div className="flex gap-6 justify-between flex-wrap">
                  <div className="flex items-center gap-4 sm:gap-10 basis-2/3 sm:basis-2/4 ">
                    <div className="relative w-24 h-24">
                      <Image
                        src={item.image}
                        className="object-contain"
                        alt={item.name}
                        fill
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold md:text-lg">{item.name}</h4>
                      <div className="relative">
                        {item.size && (
                          <span className="text-sm text-accent">
                            Size: {item.size.name}
                          </span>
                        )}
                        {item.extras && item.extras.length > 0 && (
                          <div className="flex gap-1">
                            <span>Extras:</span>
                            <ul>
                              {item.extras.map((extra) => (
                                <li key={extra.id}>
                                  <span className="text-sm text-accent">
                                    {extra.name} {formatCurrency(extra.price)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <span className="absolute end-0 top-0 text-sm text-black flex gap-2">
                          x <span>{item.quantity}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <UpdateItemQuantity cartItem={item} />

                  <div className=" flex items-center justify-end gap-5 sm:gap-10 ">
                    <strong className="text-black text-lg">
                      {formatCurrency(item.basePrice)}
                    </strong>

                    <button
                      onClick={() =>
                        dispatch(removeItemFromCart({ id: item?.id }))
                      }
                      className="text-gray-600 transition hover:text-red-600"
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col justify-end gap-5 items-end mt-6">
            <span className="text-accent font-medium">
              Subtotal:
              <strong className="text-black">{formatCurrency(subtotal)}</strong>
            </span>
            <span className="text-accent font-medium">
              Delivery:
              <strong className="text-black">
                {formatCurrency(deliveryFee)}
              </strong>
            </span>
            <span className="text-accent font-medium">
              Total:
              <strong className="text-black">
                {formatCurrency(subtotal + deliveryFee)}
              </strong>
            </span>
          </div>
          <div className="flex justify-end">
            <Link
              href={`/checkout?amount=${formatCurrency(
                subtotal + deliveryFee
              )}`}
              className="block mt-10 rounded-full bg-red-500 px-4 py-2 text-base text-gray-100 ring ring-offset-2 ring-red-500 transition-colors hover:bg-red-600 hover:ring-red-600"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <LottieHandler type="empty" message={emptyMessage} />
          <Link
            href="/"
            className="p-2 mt-6 text-white rounded-md bg-red-500 block text-center"
          >
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItems;
