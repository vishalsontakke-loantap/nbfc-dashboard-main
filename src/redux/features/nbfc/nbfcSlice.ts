import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Nbfc {
  partner_id: number;
  nbfc_name: string;
  contact_email?: string;
  is_active?: boolean;
  business_limit?: number;
  [key: string]: any;
}

interface NbfcState {
  list: Nbfc[];
  selectedNbfc: Nbfc | null;
  loading: boolean;
  error: string | null;
}

const initialState: NbfcState = {
  list: [],
  selectedNbfc: null,
  loading: false,
  error: null,
};

export const nbfcSlice = createSlice({
  name: "nbfc",
  initialState,
  reducers: {
    setNbfcs: (state, action: PayloadAction<Nbfc[]>) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedNbfc: (state, action: PayloadAction<Nbfc | null>) => {
      state.selectedNbfc = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearNbfcData: (state) => {
      state.list = [];
      state.selectedNbfc = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setNbfcs,
  setSelectedNbfc,
  setLoading,
  setError,
  clearNbfcData,
} = nbfcSlice.actions;

// ✅ Selector MUST be outside createSlice
export const getSelectedNbfcId = (state: any) =>
  state.nbfc.selectedNbfc?.partner_id ?? null;


export default nbfcSlice.reducer;
