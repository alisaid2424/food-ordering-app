"use client";

import { productWithRelations } from "@/types/product";
import MenuItem from "./MenuItem";
import LottieHandler from "@/utils/LottieHandler";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type MenuSectionProps = {
  items: productWithRelations[];
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const MenuSection = ({ items }: MenuSectionProps) => {
  const t = useTranslations();

  return items.length > 0 ? (
    <motion.ul
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </motion.ul>
  ) : (
    <div className="flex justify-center items-center text-center">
      <LottieHandler type="empty" message={t("noProductsFound")} />
    </div>
  );
};

export default MenuSection;
