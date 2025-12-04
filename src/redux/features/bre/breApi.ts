import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const breApi = createApi({
    reducerPath: "breApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: "include",
    }),
    tagTypes: ["Bre"],
    endpoints: (builder) => ({
        // GET all BRE
        getBre: builder.query<any[], void>({
            query: () => "/bre-rules",
            providesTags: ["Bre"],
        }),

        // 
        getBreById: builder.query<any, number>({
            query: (id) => `/bre-rules/product/${id}`,
            providesTags: ["Bre"],
        }),

        // CREATE BRE
        createBre: builder.mutation<
            any,
            {
                partner_id: number;
                product_id: number;
                key: string;
                values: { min: number; max: number };
                is_mandatory: boolean;
                waitage: number;
                created_by: number;
            }
        >({
            query: (body) => ({
                url: "/bre-rules",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Bre"], // refresh the BRE list after creation
        }),

        // UPDATE BRE
        updateBre: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/bre-rules/product/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Bre"], // refresh BRE list after update
        }),

        // DELETE BRE
        deleteBre: builder.mutation<void, string>({
            query: (id) => ({
                url: `/bre-rules/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Bre"], // refresh BRE list after deletion
        }),

        createBreBulk: builder.mutation<
            any,
            {
                rules: Array<{
                    partner_id: number;
                    product_id: number;
                    key: string;
                    values: any; // can be number-object or array
                    is_mandatory: boolean;
                    waitage: number;
                    created_by: number;
                }>;
            }
        >({
            query: (body) => ({
                url: "/bre-rules/bulk-insert", // assuming backend endpoint for bulk insert
                method: "POST",
                body,
            }),
            invalidatesTags: ["Bre"], // refresh BRE list after bulk insert
        }),
    }),
    keepUnusedDataFor: 60,
});

export const {
    useGetBreQuery,
    useGetBreByIdQuery,
    useCreateBreMutation,
    useUpdateBreMutation,
    useDeleteBreMutation,
} = breApi;
