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
    match: ["/"],
  },
  {
    to: "/nbfc-list",
    label: "NBFC List",
    icon: withBase("/images/icons/nbfc_sidebar.svg"),
    match: ["/nbfc"],
  },
  {
    to: "/loan-products",
    label: "Loan Products",
    icon: withBase("/images/icons/nbfc_sidebar.svg"),
    match: ["/loan-products"],
  },
  {
    to: "/bre",
    label: "BRE",
    icon: withBase("/images/icons/nbfc_sidebar.svg"),
    match: ["/bre"],
  },
  {
    to: "/upload-pool-file",
    label: "Upload Pool File",
    icon: withBase("/images/icons/upload_pool_file_sidebar.svg"),
    match: ["/upload-pool-file"],
  },
  // {
  //   to: "/history",
  //   label: "History",
  //   icon: withBase("/images/icons/history_sidebar.svg"),
  //   match: ["/history"],
  // },
  {
    to: "/manage-user",
    label: "User Managaement",
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
