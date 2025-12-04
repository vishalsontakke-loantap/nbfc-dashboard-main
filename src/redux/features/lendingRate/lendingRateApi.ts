import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export interface UpdateLendingRateInput {
  tenor: string;
  value: number;
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
      transformResponse: (response: LendingRateResponse) => {
        return response.data.map(rate => ({
          ...rate,
          value: Number(rate.value)
        }));
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
