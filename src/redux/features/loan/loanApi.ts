import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSelectedNbfcId } from "../nbfc/nbfcSlice";

/* =========================
   Types
========================= */

export interface LoanAccount {
  id: number;
  app_id: string;
  loan_account_number: string;
  customer_name: string;
  mobilenumber: string;
  loan_amount: string;
  status: string;
  created_at: string;
}

export interface LoanPaginationResponse {
  data: LoanAccount[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export type LoanQueryArgs = {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  app_id?: string;
};

/* =========================
   API Slice
========================= */

export const loanApi = createApi({
  reducerPath: "loanApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state: any = getState();
      const nbfcId = getSelectedNbfcId(state);

      if (nbfcId) {
        headers.set("x-partner-id", nbfcId.toString());
      }
      return headers;
    },
  }),
  tagTypes: ["Loan"],
  endpoints: (builder) => ({

    getLoanAccountDetails: builder.query<
      LoanPaginationResponse,
      LoanQueryArgs
    >({
      query: ({ page = 1, per_page = 10, search, status }) => ({
        url: "/loan-account-details",
        method: "GET",
        params: {
          page,
          per_page,
          search,
          status,
        },
      }),
      providesTags: ["Loan"],
      transformResponse: (response: LoanPaginationResponse) => response,
    }),

    getLoanAccountAppDetails: builder.query<
      LoanAccount[],
      { app_id: string }
    >({
      query: ({ app_id }) => ({
        url: "/loan-account-app-details",
        method: "GET",
        params: { app_id },
      }),
      providesTags: (_result, _error, { app_id }) => [
        { type: "Loan", id: app_id },
      ],
    }),
  }),
});

/* =========================
   Hooks
========================= */

export const {
  useGetLoanAccountDetailsQuery,
  useGetLoanAccountAppDetailsQuery,
} = loanApi;
