import { productWithRelations } from "@/types/product";
import MenuItem from "./MenuItem";
import LottieHandler from "@/utils/LottieHandler";

type MenuSectionProps = {
  items: productWithRelations[];
};

const MenuSection = ({ items }: MenuSectionProps) => {
  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <div className="flex justify-center items-center text-center">
      <LottieHandler type="empty" message="No products found" />
    </div>
  );
};

export default MenuSection;
