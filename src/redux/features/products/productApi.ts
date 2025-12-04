// redux/features/products/productApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // Create product
    createProduct: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/products/create-with-rules",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) =>
        [
          { type: "Product", id: "LIST" },
          arg?.partner_id
            ? { type: "Product", id: `PARTNER_${arg.partner_id}` }
            : null,
        ].filter(Boolean) as any,
    }),

    // List all products
    getProducts: builder.query<any, void>({
      query: () => "/products",
      providesTags: (result) =>
        result && Array.isArray(result)
          ? [
              ...result.map((r: any) => ({
                type: "Product" as const,
                id: r.id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
      keepUnusedDataFor: 60,
    }),

    // Products by partner id (used on partner/nbfc pages)
    getProductsByPartnerId: builder.query<any, string>({
      query: (partnerId: string) => `/products/partner/${partnerId}`,
      providesTags: (result, error, partnerId) =>
        result && Array.isArray(result)
          ? [
              ...result.map((r: any) => ({
                type: "Product" as const,
                id: r.id,
              })),
              { type: "Product", id: `PARTNER_${partnerId}` },
            ]
          : [{ type: "Product", id: `PARTNER_${partnerId}` }],
      keepUnusedDataFor: 60,
    }),

    // Product details
    getProductDetails: builder.query<any, string>({
      query: (id: string) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
      keepUnusedDataFor: 60,
    }),

    // Update product (PUT or PATCH depending on backend)
    updateProduct: builder.mutation<any, { id: string | number; updates: any }>(
      {
        query: ({ id, updates }) => ({
          url: `/products/${id}`,
          method: "PUT",
          body: updates,
        }),

        invalidatesTags: (result, error, arg) => {
          const partnerId =
            result?.data?.partner_id ?? arg?.updates?.partner_id ?? null;

          const tags: Array<{ type: "Product"; id: string | number }> = [
            { type: "Product" as const, id: arg.id },
            { type: "Product" as const, id: "LIST" },
          ];

          if (partnerId) {
            tags.push({ type: "Product" as const, id: `PARTNER_${partnerId}` });
          }

          return tags;
        },
      }
    ),
  }),
  keepUnusedDataFor: 60,
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductsByPartnerIdQuery,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} = productApi;
