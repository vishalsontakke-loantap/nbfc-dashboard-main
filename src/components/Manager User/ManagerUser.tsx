import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Edit, Shield, Clock } from "lucide-react";
import CardHeadline from "../CardHeadline";

// ----------------- MOCK DATA -----------------
const users = [
  { id: 1, name: "Amit Shah", email: "amit.shah@bom.in", role: "SuperAdmin", accessLevel: "Full Access", lastLogin: "2024-10-23 09:15 AM", status: "active" },
  { id: 2, name: "Priya Desai", email: "priya.desai@bom.in", role: "Admin", accessLevel: "Bank Operations", lastLogin: "2024-10-23 08:45 AM", status: "active" },
  { id: 3, name: "Rahul Mehta", email: "rahul.mehta@bom.in", role: "Bank User", accessLevel: "Read & Write", lastLogin: "2024-10-22 05:30 PM", status: "active" },
  { id: 4, name: "Suresh Kumar", email: "suresh@muthoot.com", role: "NBFC User", accessLevel: "Partner Portal", lastLogin: "2024-10-23 10:00 AM", status: "active", nbfc: "Muthoot Finance" },
  { id: 5, name: "Kavita Joshi", email: "kavita@masfinance.com", role: "NBFC User", accessLevel: "Partner Portal", lastLogin: "2024-10-22 02:15 PM", status: "active", nbfc: "MAS Financial" },
  { id: 6, name: "Dr. Anjali Rao", email: "anjali.rao@audit.bom.in", role: "Auditor", accessLevel: "Read Only", lastLogin: "2024-10-21 11:20 AM", status: "active" },
  { id: 7, name: "Vikram Patel", email: "vikram.patel@gmail.com", role: "Borrower", accessLevel: "Self Service", lastLogin: "2024-10-20 03:45 PM", status: "inactive" },
];

const auditLogs = [
  { timestamp: "2024-10-23 09:15:32", user: "Amit Shah", action: "Approved Lead LD005", ip: "192.168.1.100" },
  { timestamp: "2024-10-23 09:10:15", user: "Priya Desai", action: "Modified BRE Rule #12", ip: "192.168.1.101" },
  { timestamp: "2024-10-23 08:45:22", user: "Suresh Kumar", action: "Viewed Lead LD003", ip: "103.45.67.89" },
  { timestamp: "2024-10-22 05:30:11", user: "Rahul Mehta", action: "Exported Collection Report", ip: "192.168.1.102" },
];

const rolePermissions = {
  SuperAdmin: ["Full System Access", "User Management", "Configuration", "Reports"],
  Admin: ["Lead Management", "NBFC Management", "Reports", "Document Verification"],
  "Bank User": ["View Leads", "Process Applications", "Generate Reports"],
  "NBFC User": ["View Partner Leads", "Submit Applications", "Track Status"],
  Auditor: ["View All Data", "Access Audit Logs", "Generate Compliance Reports"],
  Borrower: ["View Application Status", "Upload Documents", "Track EMI"],
};

// ----------------- COMPONENT -----------------
const ManagerUser = () => {
  const [selectedRole, setSelectedRole] = useState("Admin");

  return (
    <div className="grid place-items-center min-h-[89.5dvh] p-5">
      <Card className="scale-95 w-full h-full flex flex-col items-start p-10 space-y-6 overflow-y-auto">
        {/* <CardHeadline title="Manager User" /> */}

        {/* Header Actions */}
        <div className="flex justify-end w-full">
          <Button className="bg-[#0B5FFF] hover:bg-[#0B5FFF]/90">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Role Distribution */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {Object.keys(rolePermissions).map((role, idx) => {
            const count = users.filter((u) => u.role === role).length;
            const colors = ["#0B5FFF", "#00A676", "#FFB020", "#8B5CF6", "#F472B6", "#64748B"];
            return (
              <Card key={idx} className="p-4 text-center" style={{ borderTop: `4px solid ${colors[idx]}` }}>
                <div className="p-3 rounded-lg mx-auto mb-2 w-fit" style={{ backgroundColor: `${colors[idx]}20` }}>
                  <Shield className="h-6 w-6" style={{ color: colors[idx] }} />
                </div>
                <p className="text-muted-foreground">{role}</p>
                <h3 className="text-lg font-semibold">{count}</h3>
              </Card>
            );
          })}
        </div>

        {/* Users Table */}
        <Card className="w-full p-6">
          <h3 className="mb-4 font-semibold">System Users</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center font-semibold text-[#0B5FFF]">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p>{user.name}</p>
                          {user.nbfc && <p className="text-muted-foreground">{user.nbfc}</p>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.accessLevel}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {user.lastLogin}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={user.status === "active" ? "bg-green-100 text-green-700 border-0" : "bg-gray-100 text-gray-700 border-0"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User - {user.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="block mb-2 text-sm font-medium">Role</label>
                              <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5FFF]"
                                defaultValue={user.role}
                                onChange={(e) => setSelectedRole(e.target.value)}
                              >
                                {Object.keys(rolePermissions).map((role) => (
                                  <option key={role} value={role}>
                                    {role}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block mb-2 text-sm font-medium">Status</label>
                              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5FFF]">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="mb-2 font-semibold">Permissions for {selectedRole}</h4>
                              <ul className="space-y-1">
                                {rolePermissions[selectedRole as keyof typeof rolePermissions].map((perm, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#0B5FFF]"></div>
                                    {perm}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Button className="bg-[#0B5FFF] hover:bg-[#0B5FFF]/90 w-full">Save Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Audit Log */}
        <Card className="w-full p-6">
          <h3 className="mb-4 font-semibold">Audit Log</h3>
          <div className="space-y-3">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p>{log.action}</p>
                  <p className="text-muted-foreground text-sm">by {log.user}</p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>{log.timestamp}</p>
                  <p>IP: {log.ip}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default ManagerUser;
