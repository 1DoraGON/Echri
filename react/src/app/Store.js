import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import UserSlice from "./UserSlice";
import ThemeSlice from "./ThemeSlice";

const Store = configureStore({
  reducer: {
    cart: CartSlice,
    user: UserSlice,
    theme: ThemeSlice
  }
})

export default Store;