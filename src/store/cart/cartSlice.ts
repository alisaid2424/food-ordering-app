import { cartItem } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

type TProductsCart = {
  items: cartItem[];
};

let initialCartItems;

if (typeof window !== "undefined") {
  initialCartItems = localStorage.getItem("cartItems");
}

const initialState: TProductsCart = {
  items: initialCartItems ? JSON.parse(initialCartItems) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      const existingItem = state.items.find(
        (el) => el.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.size = action.payload.size;
        existingItem.extras = action.payload.extras;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.items.find((el) => el.id === action.payload.id);

      if (item) {
        if (item?.quantity === 1) {
          state.items = state.items.filter((el) => el.id !== action.payload.id);
        } else {
          item.quantity! -= 1;
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((el) => el.id !== action.payload.id);
    },
    cleanUpCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeCartItem, removeItemFromCart, cleanUpCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
