import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BreState {
  data: Record<string, any[]> | null;
  loading: boolean;
  error: string | null;
}

const initialState: BreState = {
  data: null,
  loading: false,
  error: null
};

export const breSlice = createSlice({
  name: "bre",
  initialState,
  reducers: {
    setBreData(state, action: PayloadAction<Record<string, any[]>>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetBre(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setBreData, setLoading, setError, resetBre } = breSlice.actions;

export default breSlice.reducer;
