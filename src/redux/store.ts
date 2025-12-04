// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './features/auth/authSlice'; // adjust path
import { authApi } from './features/auth/authApi';     
import productReducer from "./features/products/productSlice";
import { productApi } from './features/products/productApi';
import { breApi } from './features/bre/breApi';
import { nbfcApi } from './features/nbfc/nbfcApi';
import { roleApi } from './features/roles/roleApi';
import nbfcReducer from './features/nbfc/nbfcSlice';
import breReducer from './features/bre/breSlice';

export const store = configureStore({
  reducer: {
    // your regular reducers
    auth: authReducer,
    products: productReducer,
    nbfc: nbfcReducer,
    bre:breReducer,

    // RTK Query reducer must be mounted at authApi.reducerPath
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [breApi.reducerPath]: breApi.reducer,
    [nbfcApi.reducerPath]: nbfcApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productApi.middleware)
      .concat(breApi.middleware)
      .concat(nbfcApi.middleware)
      .concat(roleApi.middleware),
});

// optional: helpers for useSelector/useDispatch typings
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional: enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
