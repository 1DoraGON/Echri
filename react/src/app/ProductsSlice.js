import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosClient from "../api/axios";

const initialState = {
  products: [],
  params: {},
  filterPage: true,
};

const ProductsSlice = createSlice({
  initialState,
  name: 'products',
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilterPage: (state, action) => {
      state.filterPage = action.payload;
    },
  },
});

export const { setProducts, setFilterPage } = ProductsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectFilterPage = (state) => state.products.filterPage;

export const fetchProducts = (params) => async (dispatch) => {
  try {
    const response = await axiosClient.get('/api/products', { params });
    dispatch(setProducts(response.data.data));
    console.log('products:', response);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export default ProductsSlice.reducer;