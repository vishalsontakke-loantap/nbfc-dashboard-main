import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSelectedNbfcId } from "../nbfc/nbfcSlice";

/* =========================
   Types
========================= */

export interface LoanAccount {
  id: number;
  app_id: string;
  loan_id?: string;
  loan_account_number: string;
  customer_name: string;
  mobilenumber: string;
  loan_amount: string;
  status: string;
  created_at: string;
  nbfcName?: string;
  sanction_amount?: string;
  bank_sanction_amount?: string;
  nbfc_sanction_amount?: string;
  nbfcTenure?: number;
  loan_tenure?: number;
  bank_interest?: string;
  creditScore?: number;
  riskLevel?: string;
  debtToIncomeRatio?: number;
  loanToValueRatio?: number;
  breResult?: string;
  lastUpdated?: string;
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

    getLoanAccountAppDetails: builder.query<LoanAccount[], string>({
      query: (loan_id) => ({
        url: "/loan-account-app-details",
        method: "GET",
        params: { loan_id },
      }),
      providesTags: ["Loan"],
    }),

    getLoanAccountRpsDetails: builder.query<any, { loan_id: string }>({
      query: ({ loan_id }) => ({
        url: "/repayment-schedule",
        method: "GET",
        params: { loan_id },
      }),
      providesTags: ["Loan"],
    }),
    getLoanAccountStatement: builder.query<any, { loan_id: string; statement_type?: string }>({
      query: ({ loan_id, statement_type }) => ({
        url: `/loan-statement/${loan_id}`,
        method: "GET",
        params: statement_type ? { statement_type } : undefined,
      }),
      providesTags: ["Loan"],
    }),
  }),
});

export const {
  useGetLoanAccountDetailsQuery,
  useGetLoanAccountAppDetailsQuery,
  useGetLoanAccountRpsDetailsQuery,
  useGetLoanAccountStatementQuery,

} = loanApi;
