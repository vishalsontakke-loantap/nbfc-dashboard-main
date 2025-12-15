import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSelectedNbfcId } from "../nbfc/nbfcSlice";

export interface LendingRate {
  id: number;
  tenor: string;
  value: string | number;
  effective_from: string;
  circular_path: string | null;
  remark: string | null;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface LendingRateResponse {
  success: boolean;
  message: string;
  data: LendingRate[];
}

export interface RllrRate {
  id: number;
  repo_rate: string | number;
  bank_spread: string | number;
  credit_risk_premium: string | number;
  final_lending_rate: string | number;
  effective_from: string;
  circular_path: string | null;
  remark: string | null;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
}

export interface RllrRateResponse {
  success: boolean;
  message: string;
  data: RllrRate[];
}

export interface UpdateLendingRateInput {
  tenor: string;
  value: number;
  effective_from: string;
}

export interface UpdateRllrRateInput {
  repo_rate: number;
  bank_spread: number;
  credit_risk_premium: number;
  final_lending_rate: number;
  effective_from: string;
}

export interface UpdateLendingRatePayload {
  type: "mclr" | "rllr";
  rates: LendingRate[];
}

export const lendingRateApi = createApi({
  reducerPath: "lendingRateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state: any = getState();
      const nbfcId = getSelectedNbfcId(state);
      console.log("Selected NBFC ID in lendingRateApi:", nbfcId);
      if (nbfcId) {
        headers.set("x-partner-id", nbfcId.toString());
      }
      return headers;
    },
  }),
  tagTypes: ["LendingRate"],
  endpoints: (builder) => ({
    getMclrRates: builder.query<LendingRate[], void>({
      query: () => "/lending-rate/mclr",
      transformResponse: (response: LendingRateResponse) => {
        return response.data.map(rate => ({
          ...rate,
          value: Number(rate.value)
        }));
      },
      providesTags: ["LendingRate"],
    }),
    getRllrRates: builder.query<LendingRate[], void>({
      query: () => "/lending-rate/rllr",
      transformResponse: (response: RllrRateResponse) => {
        // Transform RLLR structure to array of LendingRate items
        if (response.data.length === 0) return [];
        
        // Use the most recent record (first one in the array)
        const rllrData = response.data[0];
        return [
          { tenor: "RBI Repo Rate", value: Number(rllrData.repo_rate), effective_from: rllrData.effective_from },
          { tenor: "Bank Spread (%)", value: Number(rllrData.bank_spread), effective_from: rllrData.effective_from },
          { tenor: "Credit Risk Premium (%)", value: Number(rllrData.credit_risk_premium), effective_from: rllrData.effective_from },
          { tenor: "Final Lending Rate", value: Number(rllrData.final_lending_rate), effective_from: rllrData.effective_from },
        ] as LendingRate[];
      },
      providesTags: ["LendingRate"],
    }),
    updateMclrRates: builder.mutation<void, UpdateLendingRateInput[]>({
      query: (rates) => ({
        url: "/lending-rate/mclr",
        method: "PUT",
        body: rates,
      }),
      invalidatesTags: ["LendingRate"],
    }),
    updateRllrRates: builder.mutation<void, UpdateLendingRateInput[]>({
      query: (rates) => ({
        url: "/lending-rate/rllr",
        method: "PUT",
        body: rates,
      }),
      invalidatesTags: ["LendingRate"],
    }),
  }),
});

export const {
  useGetMclrRatesQuery,
  useGetRllrRatesQuery,
  useUpdateMclrRatesMutation,
  useUpdateRllrRatesMutation,
} = lendingRateApi;
