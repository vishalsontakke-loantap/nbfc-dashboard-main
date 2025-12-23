const withBase = (path: string) => {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/*$/, "/");
  return `${base}${path.replace(/^\//, "")}`;
};

export type UserType = "nbfc" | "bank" | "admin";

export const getSidebarByUser = (userType: UserType): SidebarItem[] => {
  const common: SidebarItem[] = [
    {
      to: "/overview",
      label: "Overview",
      icon: withBase("/images/icons/overview_sidebar.svg"),
      match: ["/overview"],
    },
    {
      to: "/applications",
      label: "Applications",
      icon: withBase("/images/icons/history_sidebar.svg"),
      match: ["/applications"],
    },
    {
      to: "/loans",
      label: "Loans",
      icon: withBase("/images/icons/history_sidebar.svg"),
      match: ["/loans"],
    },
   
  ];

  const nbfcOnly: SidebarItem[] = [
    {
      to: "/onboarding",
      label: "NBFC Onboarding",
      icon: withBase("/images/icons/nbfc_sidebar.svg"),
      match: ["/onboarding"],
    },
    {
      to: "/collection",
      label: "Upload Collection File",
      icon: withBase("/images/icons/upload_pool_file_sidebar.svg"),
      match: ["/collection"],
    },
  ];

  const adminOnly: SidebarItem[] = [
    {
      to: "/nbfc-list",
      label: "NBFC List",
      icon: withBase("/images/icons/nbfc_sidebar.svg"),
      match: ["/nbfc", "/nbfc-list"],
    },
    {
      to: "/manage-user",
      label: "User Management",
      icon: withBase("/images/icons/manager_user_sidebar.svg"),
      match: ["/manage-user"],
    },
    {
      to: "/roles-management",
      label: "Roles Management",
      icon: withBase("/images/icons/nbfc_sidebar.svg"),
      match: ["/roles-management"],
    },
    {
      to: "/activity",
      label: "Activity",
      icon: withBase("/images/icons/reports_sidebar.svg"),
      match: ["/activity"],
    },
    {
      to: "/reports",
      label: "Reports & Analytics",
      icon: withBase("/images/icons/reports_sidebar.svg"),
      match: ["/reports"],
    },
    {
      to: "/rlr-config",
      label: "Lending Rate Config",
      icon: withBase("/images/icons/nbfc_sidebar.svg"),
      match: ["/rlr-config"],
    },
  ];

  switch (userType) {
    case "nbfc":
      return [...common, ...nbfcOnly, {
      to: "/api-documentation",
      label: "API Documentation",
      icon: withBase("/images/icons/nbfc_sidebar.svg"),
      match: ["/api-documentation"],
    },];

    case "bank":
      return [...common, {
      to: "/api-documentation",
      label: "API Documentation",
      icon: withBase("/images/icons/nbfc_sidebar.svg"),
      match: ["/api-documentation"],
    },];

    default: // admin
      return [...common, ...nbfcOnly, ...adminOnly, {
      to: "/api-documentation",
      label: "API Documentation",
      icon: withBase("/images/icons/nbfc_sidebar.svg"),
      match: ["/api-documentation"],
    },];
  }
};
