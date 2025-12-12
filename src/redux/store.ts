// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice"; // adjust path
import { authApi } from "./features/auth/authApi";
import productReducer from "./features/products/productSlice";
import { productApi } from "./features/products/productApi";
import { breApi } from "./features/bre/breApi";
import { nbfcApi } from "./features/nbfc/nbfcApi";
import { roleApi } from './features/roles/roleApi';
import { lendingRateApi } from './features/lendingRate/lendingRateApi';
import { activityApi } from './features/activity/activityApi';
import { disbursementApi } from './features/disbursement/disbursementApi';
import nbfcReducer from "./features/nbfc/nbfcSlice";
import breReducer from "./features/bre/breSlice";
import { userApi } from "./features/user/userApi";
import userReducer from "./features/user/userSlice";
import { collectionApi } from "./features/collection/collectionApi";
export const store = configureStore({
  reducer: {
    // your regular reducers
    auth: authReducer,
    products: productReducer,
    nbfc: nbfcReducer,
    bre: breReducer,
    user: userReducer,

    // RTK Query reducer must be mounted at authApi.reducerPath
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [breApi.reducerPath]: breApi.reducer,
    [nbfcApi.reducerPath]: nbfcApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [lendingRateApi.reducerPath]: lendingRateApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [disbursementApi.reducerPath]: disbursementApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      
      .concat(authApi.middleware)
      
      .concat(productApi.middleware)
      
      .concat(breApi.middleware)
      
      .concat(nbfcApi.middleware)
      .concat(userApi.middleware)
      .concat(roleApi.middleware)
      .concat(lendingRateApi.middleware)
      .concat(activityApi.middleware)
      .concat(disbursementApi.middleware)
      .concat(collectionApi.middleware),
});

// optional: helpers for useSelector/useDispatch typings
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional: enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
