import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Disbursement {
  id: string;
  app_id: string;
  status: "pending" | "approved" | "rejected" | "completed";
  amount: number;
  date: string;
  reference_id?: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export interface DisbursementFilters {
  status?: string;
  app_id?: string;
  search?: string;
  per_page?: number;
  page?: number;
}

export interface DisbursementResponse {
  success: boolean;
  message: string;
  data: Disbursement[];
  total?: number;
  per_page?: number;
  current_page?: number;
  last_page?: number;
}

export interface GetDisbursementsParams {
  status?: string;
  app_id?: string;
  search?: string;
  per_page?: number;
  page?: number;
}

export const disbursementApi = createApi({
  reducerPath: "disbursementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Disbursement"],
  endpoints: (builder) => ({
    // GET disbursements with filters
    getDisbursements: builder.query<Disbursement[], void>({
      query: () => "/muthoot-gold/disbursements",
      providesTags: ["Disbursement"],
      transformResponse: (response: DisbursementResponse) => {
        return response.data || [];
      },
    }),

    // GET disbursements with filters and pagination
    getDisbursementsFiltered: builder.query<
      { data: Disbursement[]; total: number; page: number; per_page: number },
      GetDisbursementsParams
    >({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.status) params.append("status", filters.status);
        if (filters.app_id) params.append("app_id", filters.app_id);
        if (filters.search) params.append("search", filters.search);
        if (filters.per_page) params.append("per_page", filters.per_page.toString());
        if (filters.page) params.append("page", filters.page.toString());

        return `/muthoot-gold/disbursements?${params.toString()}`;
      },
      providesTags: ["Disbursement"],
      transformResponse: (response: DisbursementResponse) => {
        return {
          data: response.data || [],
          total: response.total || 0,
          page: response.current_page || 1,
          per_page: response.per_page || 15,
        };
      },
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

    // SEARCH disbursements
    searchDisbursements: builder.query<Disbursement[], string>({
      query: (searchQuery) => `/muthoot-gold/disbursements?search=${searchQuery}`,
      providesTags: ["Disbursement"],
      transformResponse: (response: DisbursementResponse) => {
        return response.data || [];
      },
    }),

    // CREATE disbursement
    createDisbursement: builder.mutation<Disbursement, Partial<Disbursement>>({
      query: (body) => ({
        url: "/muthoot-gold/disbursements",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Disbursement"],
    }),

    // UPDATE disbursement
    updateDisbursement: builder.mutation<
      Disbursement,
      { id: string; body: Partial<Disbursement> }
    >({
      query: ({ id, body }) => ({
        url: `/muthoot-gold/disbursements/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Disbursement",
        { type: "Disbursement", id: arg.id },
      ],
    }),

    // PATCH disbursement (partial update)
    patchDisbursement: builder.mutation<
      Disbursement,
      { id: string; body: Partial<Disbursement> }
    >({
      query: ({ id, body }) => ({
        url: `/muthoot-gold/disbursements/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Disbursement",
        { type: "Disbursement", id: arg.id },
      ],
    }),

    // DELETE disbursement
    deleteDisbursement: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/muthoot-gold/disbursements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Disbursement"],
    }),

    // APPROVE disbursement
    approveDisbursement: builder.mutation<
      Disbursement,
      { id: string; remarks?: string }
    >({
      query: ({ id, remarks }) => ({
        url: `/muthoot-gold/disbursements/${id}/approve`,
        method: "PATCH",
        body: { remarks },
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Disbursement",
        { type: "Disbursement", id: arg.id },
      ],
    }),

    // REJECT disbursement
    rejectDisbursement: builder.mutation<
      Disbursement,
      { id: string; remarks?: string }
    >({
      query: ({ id, remarks }) => ({
        url: `/muthoot-gold/disbursements/${id}/reject`,
        method: "PATCH",
        body: { remarks },
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Disbursement",
        { type: "Disbursement", id: arg.id },
      ],
    }),
  }),
});

// Export hooks
export const {
  useGetDisbursementsQuery,
  useGetDisbursementsFilteredQuery,
  useGetDisbursementByIdQuery,
  useGetDisbursementsByStatusQuery,
  useGetDisbursementsByAppIdQuery,
  useSearchDisbursementsQuery,
  useCreateDisbursementMutation,
  useUpdateDisbursementMutation,
  usePatchDisbursementMutation,
  useDeleteDisbursementMutation,
  useApproveDisbursementMutation,
  useRejectDisbursementMutation,
} = disbursementApi;
