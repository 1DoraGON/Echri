import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosClient from "../api/axios";

const initialState = {
  products: [],
  loading: true,
  filterPage: false,
  currentPage: 1,
};

const ProductsSlice = createSlice({
  initialState,
  name: 'products',
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false
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

  },
});

export const { setProducts, setFilterPage, setLoading, setCurrentPage } = ProductsSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectFilterPage = (state) => state.products.filterPage;
export const selectLoading = (state) => state.products.loading;
export const selectCurrentPage = (state) => state.products.currentPage;

export const fetchProducts = (params) => async (dispatch) => {
  try {
    const response = await axiosClient.get('/api/products', { params });
    dispatch(setProducts(response.data.data));
    console.log('products:', response);
    // Extract pagination information from headers
    const totalItems = parseInt(response.headers['x-total-count']);
    const itemsPerPage = parseInt(response.headers['x-per-page']);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Use totalPages as needed in your component
    console.log('Total Pages:', totalPages);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export default ProductsSlice.reducer;