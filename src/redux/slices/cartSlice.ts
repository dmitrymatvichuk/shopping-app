import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

type CartState = {
  cartItems: Product[];
};

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const existingItem = state.cartItems[existingItemIndex];
        state.cartItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    changeCartItems: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex > -1) {
        state.cartItems[itemIndex] = {
          ...state.cartItems[itemIndex],
          quantity: action.payload.quantity,
        };
      } else {
        state.cartItems.push({
          id: action.payload.id,
          name: "",
          price: 0,
          discount: 0,
          imageUrl: "",
          type: "",
          quantity: action.payload.quantity,
        });
      }
    },

    removeCartItem: (state, action: PayloadAction<{ id: number }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToCart, changeCartItems, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
