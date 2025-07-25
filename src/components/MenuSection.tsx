import { productWithRelations } from "@/types/product";
import MenuItem from "./MenuItem";
import LottieHandler from "@/utils/LottieHandler";
import { getTranslations } from "next-intl/server";

type MenuSectionProps = {
  items: productWithRelations[];
};

const MenuSection = async ({ items }: MenuSectionProps) => {
  const t = await getTranslations();

  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <div className="flex justify-center items-center text-center">
      <LottieHandler type="empty" message={t("noProductsFound")} />
    </div>
  );
};

export default MenuSection;
