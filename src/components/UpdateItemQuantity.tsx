import { addToCart, removeCartItem } from "@/store/cart/cartSlice";
import { cartItem } from "@/types/product";
import { useDispatch } from "react-redux";

type UpdateItemQuantityProps = {
  cartItem: cartItem;
};

const UpdateItemQuantity = ({ cartItem }: UpdateItemQuantityProps) => {
  const dispatch = useDispatch();
  const btnStyle = `bg-red-500 w-6 h-6 text-white rounded-full md:text-xl ring ring-red-500 ring-offset-2 
    flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50`;

  return (
    <div className="flex items-center justify-center  gap-3 md:gap-5 ">
      <button
        className={btnStyle}
        onClick={() => dispatch(removeCartItem({ id: cartItem?.id }))}
      >
        -
      </button>
      <span className="text-sm font-medium">{cartItem?.quantity}</span>
      <button
        className={btnStyle}
        onClick={() => dispatch(addToCart(cartItem))}
      >
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
