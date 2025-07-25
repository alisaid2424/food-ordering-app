import { formatCurrency } from "@/utils/formatters";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { productWithRelations } from "@/types/product";

type MenuItemProps = {
  item: productWithRelations;
};

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <li className="p-6 rounded-lg text-center group bg-gray-50 hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all cursor-pointer">
      <div className="relative w-48 h-48 mx-auto  ">
        <Image
          src={item.image}
          className="object-cover rounded-full
        "
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
    </li>
  );
};

export default MenuItem;
