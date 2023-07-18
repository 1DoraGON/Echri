import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { calculateCartTotals } from './utils'
const initialState = {
  cartState: false,
  cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  cartTotalAmount: 0,
  cartTotalQantity: 0,
}

const CartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState
    },
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`${action.payload.title} quantity increased to ${state.cartItems[itemIndex].cartQuantity}`)
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.title} added to Cart`)
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
      const { totalAmount, totalQuantity } = calculateCartTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQuantity;
    },
    setRemoveItemFromCart: (state, action) => {
      const filteredItems = state.cartItems.filter((item) => item.id !== action.payload.id)

      state.cartItems = filteredItems
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
      toast.success(`${action.payload.title} removed from Cart`)
      const { totalAmount, totalQuantity } = calculateCartTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQuantity;
    },
    setDecreaseQTY: (state, action) => {
      const indexItem = state.cartItems.findIndex((item) => item.id === action.payload.id)
      if (action.payload.cartQuantity > 0) {
        state.cartItems[indexItem].cartQuantity -= 1;
      } else {
        const filteredItems = state.cartItems.filter((item) => item.id !== action.payload.id)

        state.cartItems = filteredItems
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
      const { totalAmount, totalQuantity } = calculateCartTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQuantity;
    },
    setIncreaseQTY: (state, action) => {
      const indexItem = state.cartItems.findIndex((item) => item.id === action.payload.id)
      state.cartItems[indexItem].cartQuantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
      const { totalAmount, totalQuantity } = calculateCartTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQuantity;
    },
    setClearCart: (state, action) => {
      state.cartItems = []
      toast.success(`Cart Cleared`);
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
      const { totalAmount, totalQuantity } = calculateCartTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQuantity;
    },
    setTotals: (state, action) => {
      const { totalAmount, totalQuantity } = calculateCartTotals(state.cartItems);
      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQuantity;
    }

  }
})

export const { setOpenCart, setCloseCart, setAddItemToCart, setRemoveItemFromCart, setIncreaseQTY, setDecreaseQTY, setClearCart, setTotals } = CartSlice.actions

export const selectCartState = (state) => state.cart.cartState

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount
export const selectCartTotalQantity = (state) => state.cart.cartTotalQantity

export default CartSlice.reducer
