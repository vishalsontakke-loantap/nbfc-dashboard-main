// FilteredRoutes.tsx
import React, { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routeConfig, AppRoute } from "./appRoutes";
import { buildPermissionMap, PermissionMap } from "./permissionUtils";

type Props = {
  clmPermissions: any[]; // backend payload: clm_permissions array
  fallbackPath?: string; // where to send user with no access (e.g. /overview)
};

export default function FilteredRoutes({ clmPermissions, fallbackPath = "/overview" }: Props) {
  const permissionMap: PermissionMap = useMemo(() => buildPermissionMap(clmPermissions), [clmPermissions]);

  function isAllowed(route: AppRoute) {
    // if route has no moduleName, allow it (like NotFound or public)
    if (!route.moduleName) return true;

    const perm = permissionMap[route.moduleName];
    if (!perm) return false;

    // If requiredAction is 'any' accept any true permission; otherwise check specific action
    const action = route.requiredAction ?? "view";
    if (action === "any") {
      return perm.view || perm.create || perm.edit || perm.delete || perm.approve;
    }
    return !!(perm as any)[action];
  }

  // Build <Route> elements for allowed routes
  return (
    <Routes>
      {routeConfig.map((r) =>
        isAllowed(r) ? (
          <Route key={r.path} path={r.path} element={r.element} />
        ) : null
      )}

      {/* if user has no route that matches root, redirect to fallback */}
      <Route path="/" element={<Navigate to={fallbackPath} replace />} />
      {/* optional: a catch-all NotFound if you prefer */}
    </Routes>
  );
}
