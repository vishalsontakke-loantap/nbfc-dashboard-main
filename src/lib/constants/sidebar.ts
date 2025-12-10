const withBase = (path: string) => {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/*$/, "/");
  return `${base}${path.replace(/^\//, "")}`;
};

export const sidebar: SidebarItem[] = [
  {
    to: "/overview",
    label: "Overview",
    icon: withBase("/images/icons/overview_sidebar.svg"),
    match: ["/overview"],
  },
  {
    to: "/onboarding",
    label: "NBFC Onboarding",
    icon: withBase("/images/icons/nbfc_sidebar.svg"),
    match: ["/onboarding"],
  },
  {
    to: "/nbfc-list",
    label: "NBFC List",
    icon: withBase("/images/icons/nbfc_sidebar.svg"),
    match: ["/nbfc","/nbfc-list"],
  },
  // {
  //   to: "/bre",
  //   label: "BRE",
  //   icon: withBase("/images/icons/nbfc_sidebar.svg"),
  //   match: ["/bre"],
  // },
  {
    to: "/collection",
    label: "Upload Collection File",
    icon: withBase("/images/icons/upload_pool_file_sidebar.svg"),
    match: ["/collection"],
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
  // {
  //   to: "/help",
  //   label: "Help",
  //   icon: withBase("/images/icons/help_sidebar.svg"),
  //   match: ["/help"],
  // },
   {
    to: "/rlr-config",
    label: "Lending Rate Config",
    icon: withBase("/images/icons/nbfc_sidebar.svg"),
    match: ["/rlr-config"],
  },
  {
    to: "/api-documentation",
    label: "API Documentation",
    icon: withBase("/images/icons/nbfc_sidebar.svg"),
    match: ["/api-documentation"],
  },

];
