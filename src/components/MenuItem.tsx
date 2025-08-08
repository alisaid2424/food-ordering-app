"use client";

import { formatCurrency } from "@/utils/formatters";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { productWithRelations } from "@/types/product";
import { motion } from "framer-motion";

type MenuItemProps = {
  item: productWithRelations;
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: "easeOut",
    },
  },
} as const;

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <motion.li
      variants={itemVariants}
      className="p-6 rounded-lg text-center group bg-gray-50 hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all cursor-pointer"
    >
      <div className="relative w-48 h-48 mx-auto">
        <Image
          src={item.image}
          className="object-cover rounded-full"
          alt={item.name}
          fill
        />
      </div>
      <div className="flex items-center justify-between gap-5 mb-4">
        <h4 className="font-semibold text-lg my-3 line-clamp-1">{item.name}</h4>
        <strong className="text-gray-600">
          {formatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-1">{item.description}</p>
      <AddToCartButton item={item} />
    </motion.li>
  );
};

export default MenuItem;
