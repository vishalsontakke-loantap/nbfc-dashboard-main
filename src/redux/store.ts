// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './features/auth/authSlice'; // adjust path
import { authApi } from './features/auth/authApi';     

export const store = configureStore({
  reducer: {
    // your regular reducers
    auth: authReducer,
    

    // RTK Query reducer must be mounted at authApi.reducerPath
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// optional: helpers for useSelector/useDispatch typings
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional: enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
