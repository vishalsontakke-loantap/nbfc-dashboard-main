import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Role", "RolePermissions"],
  endpoints: (builder) => ({
    // GET all roles with permissions
    getRolesWithPermissions: builder.query<any, void>({
      query: () => "/roles/with-permissions",
      providesTags: ["Role"],
      transformResponse: (response: any) => {
        // Transform API response to match frontend Role structure
        if (response?.data) {
          return response.data.map((role: any) => ({
            id: role.id?.toString() || `ROLE-${role.id}`,
            name: role.name,
            description: role.description || '',
            userCount: role.users_count || 0,
            createdAt: role.created_at,
            updatedAt: role.updated_at,
            permissions: (role.clm_permissions || []).map((perm: any) => ({
              module: perm.module_name
                .split('_')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
              actions: {
                view: !!perm.view,
                create: !!perm.create,
                edit: !!perm.edit,
                delete: !!perm.delete,
                approve: !!perm.approve,
              },
            })),
          }));
        }
        return [];
      },
    }),

    // GET all roles
    getRoles: builder.query<any, void>({
      query: () => "/roles",
      providesTags: ["Role"],
    }),

    // GET role by ID
    getRoleById: builder.query<any, number>({
      query: (id) => `/roles/${id}`,
      providesTags: ["Role"],
    }),

    // GET role permissions by ID
    getRolePermissions: builder.query<any, number>({
      query: (id) => `/roles/${id}/permissions`,
      providesTags: (_result, _error, id) => [{ type: "RolePermissions", id }],
    }),

    // CREATE role
    createRole: builder.mutation<any, any>({
      query: (body) => ({
        url: "/create-role",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"], // refresh roles list after creation
    }),

    // ASSIGN/UPDATE permissions to role
    assignPermissions: builder.mutation<any, any>({
      query: (body) => ({
        url: "/roles/assign-permissions",
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        "Role",
        { type: "RolePermissions", id: arg.role_id },
      ],
    }),

    // UPDATE role details
    updateRole: builder.mutation<any, any>({
      query: ({ id, ...body }) => ({
        url: `roles/${id}/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Role"],
    }),

    // DELETE role
    deleteRole: builder.mutation<any, number>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    // role List
    getAllRoles: builder.query<any, void>({
      query: (id) => ({
        url: '/roles/list',
        method: 'GET'
      }),
    })
  }),
  keepUnusedDataFor: 60,
});

export const {
  useGetRolesWithPermissionsQuery,
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useGetRolePermissionsQuery,
  useCreateRoleMutation,
  useAssignPermissionsMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetAllRolesQuery
} = roleApi;
