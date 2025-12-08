// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  users?: Array<any>;
  user: any;
  
}

const initialState: userState = {
  users: [],
  user: null,
  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<{ users: Array<any> }>) {
      state.users = action.payload.users;
    },
    setUser(state, action: PayloadAction<{ user: any }>) {
      state.user = action.payload.user;
    },
    clearUsers(state) {
      state.users = [];
      state.user = null;
    }
  }
});

export const { setUsers, setUser, clearUsers } = userSlice.actions;
export default userSlice.reducer;