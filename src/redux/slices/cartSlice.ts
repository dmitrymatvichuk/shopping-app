import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

type CartState = {
  cartItems: (Product & { quantity: number })[];
};

const initialState: CartState = {
  cartItems: [],
};

const findCartItem = (state: CartState, id: number) =>
  state.cartItems.find((item) => item.id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = findCartItem(state, action.payload.id);

      if (!existingItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    changeCartItems: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = findCartItem(state, action.payload.id);

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      } else {
        state.cartItems.push({
          id: action.payload.id,
          title: "",
          price: 0,
          category: "",
          image: "",
          quantity: action.payload.quantity,
        });
      }
    },
  },
});

export const { addToCart, changeCartItems, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
