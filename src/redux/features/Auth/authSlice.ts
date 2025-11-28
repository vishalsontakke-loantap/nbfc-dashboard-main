// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  accessToken: string;
  initialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: '',
  initialized: false,   // <-- add this
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: any }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.initialized = true;   // <-- auth check done
    },

    clearCredentials(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = '';
      state.initialized = true;  // <-- check done but no auth
    }
  }
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
