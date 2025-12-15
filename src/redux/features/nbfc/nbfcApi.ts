// redux/features/nbfc/nbfcApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSelectedNbfcId } from "./nbfcSlice";

export const nbfcApi = createApi({
  reducerPath: "nbfcApi",
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
  tagTypes: ["Nbfc"],
  endpoints: (builder) => ({
    getAllNbfc: builder.query<any, { page?: number; pageSize?: number; q?: string } | void>({
      query: (args) => {
        const params: Record<string, any> = {};
        if (args?.page !== undefined) params.page = args.page;
        if (args?.pageSize !== undefined) params.per_page = args.pageSize;
        if (args?.q) params.q = args.q;
        return { url: "/nbfc/get-nbfc", method: "GET", params };
      },
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map((r: any) => ({ type: "Nbfc" as const, id: r.partner_id ?? r.id })),
              { type: "Nbfc", id: "LIST" },
            ]
          : [{ type: "Nbfc", id: "LIST" }],
    }),

    getNbfcDetails: builder.query<any, any>({
      query: (id: any) => ({ url: `/nbfc/get-nbfc/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Nbfc", id }],
    }),

    createNbfc: builder.mutation<any, any>({
      query: (newNbfc) => ({ url: "/nbfc/create-partner", method: "POST", body: newNbfc }),
      invalidatesTags: [{ type: "Nbfc", id: "LIST" }],
    }),

    updateNbfc: builder.mutation<any, { id: string | number; payload: any }>({
      query: ({ id, payload }) => ({
        url: `/nbfc/update-nbfc/${id}`,
        method: "PUT", 
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Nbfc", id: arg.id }, { type: "Nbfc", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllNbfcQuery,
  useGetNbfcDetailsQuery,
  useCreateNbfcMutation,
  useUpdateNbfcMutation,
} = nbfcApi;
