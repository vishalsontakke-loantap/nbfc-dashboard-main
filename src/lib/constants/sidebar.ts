export const sidebar: SidebarItem[] = [
  {
    to: "/overview",
    label: "Overview",
    icon: "/images/icons/overview_sidebar.svg",
    match: ["/overview"],
  },
  {
    to: "/",
    label: "NBFC Onboarding",
    icon: "/images/icons/nbfc_sidebar.svg",
    match: ["/", "/nbfc"],
  },
  {
    to: "/nbfc-list",
    label: "NBFC List",
    icon: "/images/icons/nbfc_sidebar.svg",
    match: ["/nbfc-list","/nbfc-details"],
  },
  {
    to: "/upload-pool-file",
    label: "Upload Pool File",
    icon: "/images/icons/upload_pool_file_sidebar.svg",
    match: ["/upload-pool-file"],
  },
  {
    to: "/history",
    label: "History",
    icon: "/images/icons/history_sidebar.svg",
    match: ["/history"],
  },
  {
    to: "/manager-user",
    label: "Manager User",
    icon: "/images/icons/manager_user_sidebar.svg",
    match: ["/manager-user"],
  },
  {
    to: "/reports",
    label: "Reports",
    icon: "/images/icons/reports_sidebar.svg",
    match: ["/reports"],
  },
  {
    to: "/help",
    label: "Help",
    icon: "/images/icons/help_sidebar.svg",
    match: ["/help"],
  },

];
