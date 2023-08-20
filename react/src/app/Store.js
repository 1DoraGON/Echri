import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import UserSlice from "./UserSlice";
import ThemeSlice from "./ThemeSlice";
import ProductsSlice from "./ProductsSlice";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    user: UserSlice,
    theme: ThemeSlice,
    products: ProductsSlice
  }
})

export default Store;