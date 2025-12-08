// src/utils/permissions.ts
export type ClmPermission = {
  id: number;
  role_id: number;
  module_name: string;
  route_pattern?: string | null;
  view?: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  approve?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type PermissionMap = Record<
  string,
  { view: boolean; create: boolean; edit: boolean; delete: boolean; approve: boolean }
>;

/**
 * Build a safe permission map. If `perms` is falsy returns an empty object.
 */
export function buildPermissionMap(perms?: ClmPermission[] | null): PermissionMap {
  if (!Array.isArray(perms) || perms.length === 0) return {};
  return perms.reduce((acc, p) => {
    const key = p.module_name || "";
    if (!key) return acc;
    acc[key] = {
      view: !!p.view,
      create: !!p.create,
      edit: !!p.edit,
      delete: !!p.delete,
      approve: !!p.approve,
    };
    return acc;
  }, {} as PermissionMap);
}

/**
 * Check permission for a module. `action` defaults to 'view'.
 * If `is_super_admin` is true, grant access immediately.
 * If permissionMap is empty or module is missing, returns false (unless moduleName is undefined).
 */
export function hasPermission(
  pm: PermissionMap | undefined | null,
  moduleName: string | undefined,
  action: "view" | "create" | "edit" | "delete" | "approve" | "any" = "view",
  is_super_admin?: boolean
) {
  // super admin bypass
  if (is_super_admin) return true;

  // if route doesn't belong to any module, allow it
  if (!moduleName) return true;

  // if pm is falsy, treat as no permissions
  if (!pm) return false;

  const p = pm[moduleName];
  if (!p) return false;

  if (action === "any") return p.view || p.create || p.edit || p.delete || p.approve;
  return !!(p as any)[action];
}
