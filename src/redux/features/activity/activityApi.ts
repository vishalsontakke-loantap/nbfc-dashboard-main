import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ActivityDetail {
    key: string;
    value?: string | number;
    previousValue?: string | number;
}

export interface ActivityLog {
    id: string;
    user: string;
    activityType: "ADD" | "UPDATE" | "DELETE";
    details: ActivityDetail[];
    previousDetails?: ActivityDetail[];
    timestamp: string;
    module: "users" | "bre" | "roles" | "lending_rates";
    status?: "pending" | "approved" | "rejected";
}

export interface ActivityResponse {
    success: boolean;
    message: string;
    data: ActivityLog[];
    total?: number;
    page?: number;
    limit?: number;
}

export interface CreateActivityInput {
    user: string;
    activityType: "ADD" | "UPDATE" | "DELETE";
    details: ActivityDetail[];
    previousDetails?: ActivityDetail[];
    module: "users" | "bre" | "roles" | "lending_rates"|"nbfc";
}

export interface ApproveActivityInput {
    id: string;
    remarks?: string;
}

export interface RejectActivityInput {
    id: string;
    remarks?: string;
}

export const activityApi = createApi({
    reducerPath: "activityApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: "include",
    }),
    tagTypes: ["Activity"],
    endpoints: (builder) => ({
        // GET all activities
        getActivities: builder.query<ActivityLog[], void>({
            query: () => "/activities",
            providesTags: ["Activity"],
            transformResponse: (response: ActivityResponse) => {
                return response.data || [];
            },
        }),

        // GET activities by module
        getActivitiesByModule: builder.query<
            ActivityResponse,
            {
                module?: string;
                status?: "pending" | "approved" | "rejected";
                activity_type?: string;
                page?: number;
            }
        >({
            query: ({ module, status, activity_type, page = 1 }) => {
                const params = new URLSearchParams();
                if (module) params.append("module", module);
                if (status) params.append("status", status);
                if (activity_type) params.append("activity_type", activity_type);
                params.append("page", page.toString());
                
                return `/activity-requests?${params.toString()}`;
            },
            providesTags: (_res, _err, arg) => [
                { type: "Activity", id: arg.module || 'all' },
            ],
        }),


        // GET activity by ID
        getActivityById: builder.query<ActivityLog, string>({
            query: (id) => `/activities/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Activity", id }],
        }),

        // GET activity request by ID
        getActivityRequestById: builder.query<any, string>({
            query: (id) => `/activity-requests/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Activity", id }],
        }),

        // GET activities with pagination
        getActivitiesWithPagination: builder.query<
            { data: ActivityLog[]; total: number; page: number; limit: number },
            { page: number; limit: number; module?: string }
        >({
            query: ({ page, limit, module }) => {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                });
                if (module) params.append("module", module);
                return `/activities?${params.toString()}`;
            },
            providesTags: ["Activity"],
            transformResponse: (response: ActivityResponse) => {
                return {
                    data: response.data || [],
                    total: response.total || 0,
                    page: response.page || 1,
                    limit: response.limit || 10,
                };
            },
        }),

        // CREATE activity log
        createActivity: builder.mutation<ActivityLog, CreateActivityInput>({
            query: (body) => ({
                url: "/activities",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Activity"],
        }),

        // APPROVE activity
        approveActivity: builder.mutation<ActivityLog, ApproveActivityInput>({
            query: ({ id, remarks }) => ({
                url: `/activities/${id}/approve`,
                method: "PATCH",
                body: { remarks },
            }),
            invalidatesTags: (_result, _error, arg) => [
                "Activity",
                { type: "Activity", id: arg.id },
            ],
        }),

        // REJECT activity
        rejectActivity: builder.mutation<ActivityLog, RejectActivityInput>({
            query: ({ id, remarks }) => ({
                url: `/activities/${id}/reject`,
                method: "PATCH",
                body: { remarks },
            }),
            invalidatesTags: (_result, _error, arg) => [
                "Activity",
                { type: "Activity", id: arg.id },
            ],
        }),

        // DELETE activity
        deleteActivity: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/activities/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Activity"],
        }),

        // BULK DELETE activities
        bulkDeleteActivities: builder.mutation<
            { success: boolean },
            { ids: string[] }
        >({
            query: (body) => ({
                url: "/activities/bulk-delete",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Activity"],
        }),
    }),
});

export const {
    useGetActivitiesQuery,
    useGetActivitiesByModuleQuery,
    useGetActivityByIdQuery,
    useGetActivityRequestByIdQuery,
    useGetActivitiesWithPaginationQuery,
    useCreateActivityMutation,
    useApproveActivityMutation,
    useRejectActivityMutation,
    useDeleteActivityMutation,
    useBulkDeleteActivitiesMutation,
} = activityApi;
