import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

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
  selectedNbfc: Cookies.get("selectedNbfc")
    ? JSON.parse(Cookies.get("selectedNbfc")!)
    : null,
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

      if (action.payload) {
        Cookies.set("selectedNbfc", JSON.stringify(action.payload), { expires: 1 });
      } else {
        // Remove cookie if clearing selection
        Cookies.remove("selectedNbfc");
      }
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
      Cookies.remove("selectedNbfc");
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

export const getSelectedNbfcId = (state: any) =>
  state.nbfc.selectedNbfc?.partner_id ?? null;

export default nbfcSlice.reducer;
