import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosClient from "../api/axios";

const initialState = {
  products: [],
  loading: true,
  filterPage: false,
  currentPage: null,
  lastPage:null,
  params:{}

};

const ProductsSlice = createSlice({
  initialState,
  name: 'products',
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false
    },
    setParams: (state, action) => {
      state.params = action.payload;
    },
    setFilterPage: (state, action) => {
      state.filterPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },

  },
});

export const { setProducts, setFilterPage, setLoading, setCurrentPage, setLastPage, setParams } = ProductsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectParams = (state) => state.products.params;
export const selectFilterPage = (state) => state.products.filterPage;
export const selectLoading = (state) => state.products.loading;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectLastPage = (state) => state.products.lastPage;

export const fetchProducts = (params) => async (dispatch) => {
  try {
    const response = await axiosClient.get('/api/products', { params });
    dispatch(setCurrentPage(response.data.meta.current_page))
    dispatch(setLastPage(response.data.meta.last_page))
    dispatch(setProducts(response.data.data));
    //console.log('products:', 25%7);

  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export default ProductsSlice.reducer;