    // redux/features/products/productApi.ts
    import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

    export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: "include",
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        // Create product
        createUser: builder.mutation<any, any>({
        query: (payload) => ({
            url: "/create-user",
            method: "POST",
            body: payload,
        }),
        invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        getUserDetails: builder.query<any, string>({
        query: (id: string) => `/user/${id}`,
        providesTags: (result, error, id) => [{ type: "User", id }],
        keepUnusedDataFor: 60,
        }),

        // List all users
        getUsers: builder.query<any, { page?: number; pageSize?: number; q?: string; partner_id?:string; role_id?:string;} | void>({
        query: (args) => {
            const params: Record<string, any> = {};
            if (args?.page !== undefined) params.page = args.page;
            if (args?.pageSize !== undefined) params.per_page = args.pageSize;
            if (args?.q) params.search = args.q;
            if (args?.partner_id) params.partner_id = args.partner_id;
            if (args?.role_id) params.role_id = args.role_id;
            
            // if (args?.start_date) params.from = args.start_date;
            // if (args?.end_date) params.to = args.end_date;

            console.log(args,params)
            return { url: "/users", method: "GET", params };
        },
        providesTags: (result) =>
            result && Array.isArray(result)
            ? [
                ...result.map((r: any) => ({ type: "User" as const, id: r.id })),
                { type: "User", id: "LIST" },
                ]
            : [{ type: "User", id: "LIST" }],
        keepUnusedDataFor: 60,
        }),

        // Update product (PUT or PATCH depending on backend)
        updateUser: builder.mutation<any, { id: string | number; updates: any }>({
        query: ({ id, updates }) => ({
            url: `/update-user/${id}`,
            method: "PUT",
            body: updates,
        }),
        invalidatesTags: (result, error, arg) => [
            { type: "User", id: arg.id },
            { type: "User", id: "LIST" },
        ],
        }),
        updateUserStatus: builder.mutation<any, { id: string | number; updates: any }>({
        query: ({ id, updates }) => ({
            url: `/update-user-status/${id}`,
            method: "PUT",
            body: updates,
        }),
        invalidatesTags: (result, error, arg) => [
            { type: "User", id: arg.id },
            { type: "User", id: "LIST" },
        ],
        }),
    }),
    keepUnusedDataFor: 60,
    });

    export const {
    useCreateUserMutation,
    useGetUsersQuery,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useUpdateUserStatusMutation
    } = userApi;
