"use client";

import { useState } from "react";
import CartListOverview from "./CartListOverview";
import { productWithRelations } from "@/types/product";
import { useTranslations } from "next-intl";

type AddToCartButtonProps = {
  item: productWithRelations;
};

const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const trans = useTranslations("menuItem");
  const [openCartList, setOpenCartList] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpenCartList(true)}
        className="py-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors mt-7"
      >
        {trans("addToCart")}
      </button>

      {openCartList && (
        <CartListOverview item={item} onSetOpen={setOpenCartList} />
      )}
    </>
  );
};

export default AddToCartButton;
