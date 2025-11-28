import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      any,
      { pf_no: string; password: string; login_with: string }
    >({
      query: (credentials: {
        pf_no: string;
        password: string;
        login_with: string;
      }) => ({
        url: "/auth/login-init",
        method: "POST",
        body: credentials,
      }),
    }),
    validateOTP: builder.mutation<
      any,
      { otp_reference_id: string; otp: string }
    >({
      query: (data) => ({
        url: "/auth/login-verify",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getCurrentUser: builder.query<any, void>({
      query: () => "/auth/user",
      providesTags: ["User"],
      keepUnusedDataFor: 60, // optional
    }),
  }),
  keepUnusedDataFor: 60,
});

export const { useLoginMutation, useValidateOTPMutation, useLogoutMutation, useLazyGetCurrentUserQuery  } =
  authApi;
