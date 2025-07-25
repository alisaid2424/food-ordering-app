import {
  addToCart,
  removeItemFromCart,
  selectCartItems,
} from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { productWithRelations } from "@/types/product";
import { formatCurrency } from "@/utils/formatters";
import { Extra, Size } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import UpdateItemQuantity from "./UpdateItemQuantity";
import Input from "./forms/Input";
import { useSession } from "next-auth/react";
import routes from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface CartListOverviewProps {
  item: productWithRelations;
  onSetOpen: Dispatch<SetStateAction<boolean>>;
}

const CartListOverview = ({ onSetOpen, item }: CartListOverviewProps) => {
  const dispatch = useAppDispatch();
  const trans = useTranslations("menuItem");
  const session = useSession();
  const router = useRouter();
  const cart = useAppSelector(selectCartItems);
  const existingItem = cart.find((el) => el.id === item.id);

  const defaultSize =
    cart.find((el) => el.id === item.id)?.size ||
    item.sizes.find((size) => size.name === "SMALL");
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);

  const defaultExtras = cart.find((el) => el.id === item.id)?.extras || [];
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((el) => el.id === extra.id)) {
      const filterSelectedExtras = selectedExtras.filter(
        (el) => el.id !== extra.id
      );
      setSelectedExtras(filterSelectedExtras);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };

  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }

  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  const handleAddToCart = () => {
    if (!session.data?.user) {
      router.replace(routes.login);
    } else {
      dispatch(
        addToCart({
          id: item.id,
          basePrice: item.basePrice,
          name: item.name,
          image: item.image,
          size: selectedSize,
          extras: selectedExtras,
        })
      );

      onSetOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-30">
      <div className="h-[600px] w-[90%] max-w-[425px] bg-white rounded-md border shadow-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 z-40 overflow-y-auto">
        <button
          onClick={() => onSetOpen(false)}
          className="absolute top-4 end-4 text-3xl text-gray-600 transition hover:scale-110 hover:text-red-600 font-medium w-7 h-7"
        >
          &times;
        </button>

        <div className="mt-4 space-y-6">
          <Image
            src={item.image}
            width={150}
            height={150}
            alt={item.name}
            className="rounded-full object-cover mx-auto w-[150px] h-[150px]"
          />

          <div className="header">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
              {item.name}
            </h2>

            <p className="text-gray-500 text-sm mt-2">{item.description}</p>
          </div>

          <div className="space-y-10">
            <div className="space-y-4 text-center">
              <h3 className="font-semibold">Pick your size</h3>
              <div className="space-y-2">
                {item.sizes.map((size) => (
                  <div key={size.id}>
                    <Input
                      name="size"
                      type="radio"
                      className="radio-item"
                      id={size.id}
                      value={selectedSize.name}
                      checked={selectedSize.id === size.id}
                      onChange={() => setSelectedSize(size)}
                      label={`${size.name} ${formatCurrency(
                        item.basePrice + size.price
                      )}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 text-center">
              <h3 className="font-semibold">Any extras?</h3>
              <div className="space-y-2">
                {item.extras.map((extra) => (
                  <div key={extra.id}>
                    <Input
                      name="extras"
                      type="checkbox"
                      className="control-checkbox"
                      id={extra.id}
                      checked={Boolean(
                        selectedExtras.find((el) => el.id === extra.id)
                      )}
                      onChange={() => handleExtra(extra)}
                      label={`${extra.name} ${formatCurrency(extra.price)}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {existingItem?.quantity ? (
            <>
              <UpdateItemQuantity cartItem={existingItem} />
              <button
                onClick={() =>
                  dispatch(removeItemFromCart({ id: existingItem?.id }))
                }
                className="w-fit h-8 bg-red-500 text-white rounded-md text-sm px-3"
              >
                Remove
              </button>
            </>
          ) : (
            <button
              type="submit"
              onClick={handleAddToCart}
              className="w-full h-10 bg-red-500 text-white rounded-md flex items-center 
              justify-center gap-2"
            >
              <span>{trans("addToCart")}</span> {formatCurrency(totalPrice)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartListOverview;
