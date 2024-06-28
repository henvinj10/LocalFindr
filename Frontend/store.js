import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import WishlistReducer from "./redux/WishlistReducer";
import OrdersReducer from "./redux/OrdersReducer";

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    wishlist: WishlistReducer,
    orders: OrdersReducer,
  },
});
