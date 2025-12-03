import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nbfcApi = createApi({
  reducerPath: "nbfcApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Nbfc"],
  endpoints: (builder) => ({
    getAllNbfc: builder.query<any, { page?: number; pageSize?: number; q?: string;} | void>({
      query: (args) => {
        const params: Record<string, any> = {};
        if (args?.page !== undefined) params.page = args.page;
        if (args?.pageSize !== undefined) params.per_page = args.pageSize; // change to per_page if backend expects that
        if (args?.q) params.q = args.q;

        return {
          url: "/get-nbfc",
          method: "GET",
          params,
        };
      },
      providesTags: (result) =>
        result && Array.isArray(result.data)
          ? [
              ...result.data.map((r: any) => ({ type: "Nbfc" as const, id: r.partner_id ?? r.id })),
              { type: "Nbfc", id: "LIST" },
            ]
          : [{ type: "Nbfc", id: "LIST" }],
    }),

    getNbfcDetails: builder.query<any, string>({
      query: (id: string) => ({
        url: `/nbfc/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Nbfc", id }],
    }),

    createNbfc: builder.mutation<any, any>({
      query: (newNbfc) => ({
        url: "/create-partner",
        method: "POST",
        body: newNbfc,
      }),
      // invalidate list so it refetches
      invalidatesTags: [{ type: "Nbfc", id: "LIST" }],
    }),
  }),
});

export const { useGetAllNbfcQuery, useGetNbfcDetailsQuery, useCreateNbfcMutation } = nbfcApi;
