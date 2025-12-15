import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSelectedNbfcId } from "../nbfc/nbfcSlice";

export interface DisbursementFilters {
  status?: string;
  app_id?: string;
  search?: string;
  per_page?: number;
  page?: number;
}

export interface GetDisbursementsParams {
  status?: string;
  app_id?: string;
  search?: string;
  per_page?: number;
  page?: number;
}

export type Disbursement = {
  id: number;
  app_id: string;
  lead_id: string;
  customer_name: string;
  mobilenumber: string;
  sanction_limit: string;
  bank_sanction_amount?: string | null;
  nbfc_sanction_amount?: string | null;
  created_at: string;
};

export type DisbursementResponse = {
  disbursements: Disbursement[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
};

type DisbursementQueryArgs = {
  page?: number;
  per_page?: number;
  search?: string;
  nbfc?: string;
  status?: string;
};

export const disbursementApi = createApi({
  reducerPath: "disbursementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state: any = getState();
      const nbfcId = getSelectedNbfcId(state);
      console.log("Selected NBFC ID in collectionApi:", nbfcId);
      if (nbfcId) {
        headers.set("x-partner-id", nbfcId.toString());
      }
      return headers;
    },
  }),
  tagTypes: ["Disbursement"],
  endpoints: (builder) => ({
    // GET disbursements with filters
    getDisbursements: builder.query<
      DisbursementResponse,
      DisbursementQueryArgs
    >({
      query: ({ page = 1, per_page = 10, search, nbfc, status }) => ({
        url: "/muthoot-gold/disbursements",
        method: "GET",
        params: {
          page,
          per_page,
          search,
          nbfc,
          status,
        },
        headers: {
          "client-id": "CLIENT12345",
          "client-secret":
            "7dacf9c63bcfb108c2e298e9a53c0e75681866d5041a73cba714cf250ce6a212",
        },
      }),
      providesTags: ["Disbursement"],
      transformResponse: (response: DisbursementResponse) => response, // no reshape, just pass through
    }),

    // GET disbursement by ID
    getDisbursementById: builder.query<Disbursement, string>({
      query: (id) => `/muthoot-gold/disbursements/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Disbursement", id }],
    }),

    // GET disbursements by status
    getDisbursementsByStatus: builder.query<Disbursement[], string>({
      query: (status) => `/muthoot-gold/disbursements?status=${status}`,
      providesTags: (_result, _error, status) => [
        { type: "Disbursement", id: status },
      ],
      transformResponse: (response: DisbursementResponse) => {
        return response.data || [];
      },
    }),

    // GET disbursements by app_id
    getDisbursementsByAppId: builder.query<Disbursement[], string>({
      query: (app_id) => `/muthoot-gold/disbursements?app_id=${app_id}`,
      providesTags: (_result, _error, app_id) => [
        { type: "Disbursement", id: app_id },
      ],
      transformResponse: (response: DisbursementResponse) => {
        return response.data || [];
      },
    }),
  }),
});

// Export hooks
export const {
  useGetDisbursementsQuery,
  useGetDisbursementByIdQuery,
  useGetDisbursementsByStatusQuery,
  useGetDisbursementsByAppIdQuery,
} = disbursementApi;
