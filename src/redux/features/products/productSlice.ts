// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products?: Array<any>;
  product: any;
  
}

const initialState: ProductState = {
  products: [],
  product: null,
  
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<{ products: Array<any> }>) {
      state.products = action.payload.products;
    },
    setProduct(state, action: PayloadAction<{ product: any }>) {
      state.product = action.payload.product;
    },
    clearProducts(state) {
      state.products = [];
      state.product = null;
    }
  }
});

export const { setProducts, setProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;