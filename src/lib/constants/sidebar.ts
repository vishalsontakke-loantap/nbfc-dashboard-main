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
    match: ["/", "/nbfc"],
  },
  {
    to: "/nbfc-list",
    label: "NBFC List",
    icon: withBase("/images/icons/nbfc_sidebar.svg"),
    match: ["/nbfc-list","/nbfc-details"],
  },
  {
    to: "/upload-pool-file",
    label: "Upload Pool File",
    icon: withBase("/images/icons/upload_pool_file_sidebar.svg"),
    match: ["/upload-pool-file"],
  },
  {
    to: "/history",
    label: "History",
    icon: withBase("/images/icons/history_sidebar.svg"),
    match: ["/history"],
  },
  {
    to: "/manager-user",
    label: "Manager User",
    icon: withBase("/images/icons/manager_user_sidebar.svg"),
    match: ["/manager-user"],
  },
  {
    to: "/reports",
    label: "Reports & Analytics",
    icon: withBase("/images/icons/reports_sidebar.svg"),
    match: ["/reports"],
  },
  {
    to: "/help",
    label: "Help",
    icon: withBase("/images/icons/help_sidebar.svg"),
    match: ["/help"],
  },

];
