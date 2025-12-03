import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const createProductProps = {

};
const updateProductProps = {

};
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<any,any>({
      query: (payload) => ({
        url: "/products/create-with-rules",
        method: "POST",
        body: payload,
      }),
    }),
    getProducts: builder.query<any, void>({
      query: () => "/products",
      providesTags: ["Product"],
      keepUnusedDataFor: 60, // keep user data for 60 seconds after last use
    }),
    getProductsByPartnerId: builder.query<any, string>({
      query: (partnerId: string) => `/products/${partnerId}`,
      providesTags: ["Product"],
        keepUnusedDataFor: 60, // keep user data for 60 seconds after last use
    }),
    getProductDetails: builder.query<any, string>({
      query: (id: string) => `/products/${id}`,
      providesTags: ["Product"],
        keepUnusedDataFor: 60, // keep user data for 60 seconds after last use
    }),
    updateProduct: builder.mutation<any, { id: string; updates: typeof updateProductProps }>({
      query: ({ id, updates }) => ({
        url: `/products/update/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
  keepUnusedDataFor: 60,
});

export const { useCreateProductMutation, useGetProductsQuery, useGetProductsByPartnerIdQuery, useGetProductDetailsQuery, useUpdateProductMutation,  } = productApi;
