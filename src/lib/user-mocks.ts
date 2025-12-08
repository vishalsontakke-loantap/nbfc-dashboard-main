// Mock data for User and Role Management

export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  pf_no: string;
  role: any;
  department?: string;
  user_type: string;
  designation?: string;
  partner_id: Array<string>;
  dob?:string;
  gender?:string;
  status?:string;
  is_active?:any;
  created_at?:string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: RolePermission[];
  createdAt: string;
  updatedAt: string;
}

export interface RolePermission {
  module: string;
  actions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
  };
}

export const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "Deepak Prakash",
    email: "deepak.prakash@fintech.com",
    phone: "+91-9899-XXX-767",
    role: "Admin",
    department: "Technology",
    status: "active",
    lastLogin: "2025-11-24T10:30:00Z",
    createdAt: "2024-01-15T09:00:00Z",
    permissions: ["*"],
    location: "Mumbai",
  },
  {
    id: "USR-002",
    name: "Priya Sharma",
    email: "priya.sharma@fintech.com",
    phone: "+91-9876-XXX-321",
    role: "Maker",
    department: "Credit",
    status: "active",
    lastLogin: "2025-11-24T09:15:00Z",
    createdAt: "2024-02-20T10:30:00Z",
    permissions: ["pool_buyout.create", "pool_buyout.edit", "loans.view"],
    reportingTo: "USR-003",
    location: "Mumbai",
  },
  {
    id: "USR-003",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@fintech.com",
    phone: "+91-9845-XXX-654",
    role: "Checker",
    department: "Credit",
    status: "active",
    lastLogin: "2025-11-24T08:45:00Z",
    createdAt: "2024-01-10T11:00:00Z",
    permissions: [
      "pool_buyout.approve",
      "pool_buyout.reject",
      "loans.view",
      "pii.view",
    ],
    reportingTo: "USR-005",
    location: "Mumbai",
  },
  {
    id: "USR-004",
    name: "Anita Desai",
    email: "anita.desai@fintech.com",
    phone: "+91-9823-XXX-987",
    role: "Auditor",
    department: "Compliance",
    status: "active",
    lastLogin: "2025-11-23T16:20:00Z",
    createdAt: "2024-03-05T14:15:00Z",
    permissions: ["audit_trail.view", "reports.view", "pii.view"],
    reportingTo: "USR-006",
    location: "Delhi",
  },
  {
    id: "USR-005",
    name: "Vikram Singh",
    email: "vikram.singh@fintech.com",
    phone: "+91-9812-XXX-456",
    role: "Checker",
    department: "Risk",
    status: "active",
    lastLogin: "2025-11-24T07:30:00Z",
    createdAt: "2024-01-08T10:00:00Z",
    permissions: [
      "pool_buyout.approve",
      "pool_buyout.reject",
      "loans.view",
      "risk.view",
    ],
    location: "Bangalore",
  },
  {
    id: "USR-006",
    name: "Meera Patel",
    email: "meera.patel@fintech.com",
    phone: "+91-9834-XXX-789",
    role: "Viewer",
    department: "Finance",
    status: "active",
    lastLogin: "2025-11-24T11:00:00Z",
    createdAt: "2024-04-12T09:30:00Z",
    permissions: ["loans.view", "reports.view"],
    reportingTo: "USR-001",
    location: "Mumbai",
  },
  {
    id: "USR-007",
    name: "Suresh Reddy",
    email: "suresh.reddy@fintech.com",
    phone: "+91-9856-XXX-234",
    role: "Maker",
    department: "Operations",
    status: "active",
    lastLogin: "2025-11-23T18:45:00Z",
    createdAt: "2024-05-20T11:30:00Z",
    permissions: ["pool_buyout.create", "pool_buyout.edit", "loans.view"],
    reportingTo: "USR-003",
    location: "Hyderabad",
  },
  {
    id: "USR-008",
    name: "Kavita Joshi",
    email: "kavita.joshi@fintech.com",
    phone: "+91-9867-XXX-456",
    role: "Maker",
    department: "Credit",
    status: "inactive",
    lastLogin: "2025-11-15T14:20:00Z",
    createdAt: "2024-02-28T10:00:00Z",
    permissions: ["pool_buyout.create", "pool_buyout.edit", "loans.view"],
    reportingTo: "USR-003",
    location: "Pune",
  },
  {
    id: "USR-009",
    name: "Amit Verma",
    email: "amit.verma@fintech.com",
    phone: "+91-9878-XXX-678",
    role: "Auditor",
    department: "Compliance",
    status: "suspended",
    lastLogin: "2025-11-10T09:30:00Z",
    createdAt: "2024-06-15T13:45:00Z",
    permissions: ["audit_trail.view", "reports.view"],
    reportingTo: "USR-004",
    location: "Delhi",
  },
  {
    id: "USR-010",
    name: "Neha Kapoor",
    email: "neha.kapoor@fintech.com",
    phone: "+91-9889-XXX-890",
    role: "Viewer",
    department: "Finance",
    status: "active",
    lastLogin: "2025-11-24T10:15:00Z",
    createdAt: "2024-07-01T12:00:00Z",
    permissions: ["loans.view", "reports.view"],
    reportingTo: "USR-006",
    location: "Chennai",
  },
];

export const mockRoles: Role[] = [
  {
    id: "ROLE-001",
    name: "Admin",
    description: "Full system access with all permissions",
    userCount: 1,
    permissions: [
      {
        module: "User Management",
        actions: {
          view: true,
          create: true,
          edit: true,
          delete: true,
          approve: true,
        },
      },
      {
        module: "Pool Buyout",
        actions: {
          view: true,
          create: true,
          edit: true,
          delete: true,
          approve: true,
        },
      },
      {
        module: "Loans",
        actions: {
          view: true,
          create: true,
          edit: true,
          delete: true,
          approve: true,
        },
      },
      {
        module: "Reports",
        actions: {
          view: true,
          create: true,
          edit: true,
          delete: true,
          approve: false,
        },
      },
      {
        module: "Audit Trail",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "PII Data",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "ROLE-002",
    name: "Maker",
    description: "Can create and edit pool buyout transactions",
    userCount: 3,
    permissions: [
      {
        module: "User Management",
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Pool Buyout",
        actions: {
          view: true,
          create: true,
          edit: true,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Loans",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Reports",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Audit Trail",
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "PII Data",
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-08-15T10:30:00Z",
  },
  {
    id: "ROLE-003",
    name: "Checker",
    description: "Can approve or reject pool buyout transactions",
    userCount: 2,
    permissions: [
      {
        module: "User Management",
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Pool Buyout",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: true,
        },
      },
      {
        module: "Loans",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Reports",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Audit Trail",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "PII Data",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-09-20T14:00:00Z",
  },
  {
    id: "ROLE-004",
    name: "Auditor",
    description: "View-only access with audit trail and compliance reports",
    userCount: 2,
    permissions: [
      {
        module: "User Management",
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Pool Buyout",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Loans",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Reports",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Audit Trail",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "PII Data",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-07-10T09:15:00Z",
  },
  {
    id: "ROLE-005",
    name: "Viewer",
    description: "Basic view-only access to loans and reports",
    userCount: 2,
    permissions: [
      {
        module: "User Management",
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Pool Buyout",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Loans",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Reports",
        actions: {
          view: true,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "Audit Trail",
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
      {
        module: "PII Data",
        actions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
          approve: false,
        },
      },
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-06-05T11:45:00Z",
  },
];
