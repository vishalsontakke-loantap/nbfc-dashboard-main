import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Search,
  UserPlus,
  Download,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Mail,
  Eye,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';
import { UserProfileView } from './UserProfileView';
import { UserRegistrationDialog } from './UserRegistrationDialog';
import type { User } from '../../lib/user-mocks';

interface UserListingScreenProps {
  users: User[];
  onEditUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onSuspendUser: (userId: string) => void;
  onActivateUser: (userId: string) => void;
  onAddUser: (userData: Partial<User>) => void;
  onUpdateUser: (userId: string, userData: Partial<User>) => void;
}

export function UserListingScreen({
  users,
  onEditUser,
  onDeleteUser,
  onSuspendUser,
  onActivateUser,
  onAddUser,
  onUpdateUser,
}: UserListingScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [profileViewOpen, setProfileViewOpen] = useState(false);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);

  // Get unique values for filters
  const roles = Array.from(new Set(users.map(u => u.role)));
  const departments = Array.from(new Set(users.map(u => u.department)));

  // Apply filters
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;

    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleExport = () => {
    toast.success('Exporting user list...');
  };

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setProfileViewOpen(true);
  };

  const handleEditFromProfile = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(user);
      setProfileViewOpen(false);
      setRegistrationDialogOpen(true);
    }
  };

  const handleInactivateUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      onUpdateUser(userId, { status: 'inactive' });
      toast.info(`User ${user.name} has been marked inactive`);
    }
  };

  const handleInviteUser = () => {
    setEditingUser(null);
    setRegistrationDialogOpen(true);
  };

  const handleSubmitUser = (userData: Partial<User>) => {
    if (editingUser) {
      onUpdateUser(editingUser.id, userData);
    } else {
      onAddUser(userData);
    }
    setEditingUser(null);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">User Management</h2>
          <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleInviteUser}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{users.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-3xl">
              {users.filter(u => u.status === 'active').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Suspended</CardDescription>
            <CardTitle className="text-3xl">
              {users.filter(u => u.status === 'suspended').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Inactive</CardDescription>
            <CardTitle className="text-3xl">
              {users.filter(u => u.status === 'inactive').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-2">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(user.lastLogin)}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu open={menuOpenFor === user.id} onOpenChange={(open) => setMenuOpenFor(open ? user.id : null)}>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label={`More for ${user.id}`}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setMenuOpenFor(null);
                                setEditingUser(user);
                                setRegistrationDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" /> Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setMenuOpenFor(null);
                              handleViewProfile(user)
                            }}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info(`Send email to ${user.email}`)}>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <>
                                <DropdownMenuItem
                                  onClick={() => onSuspendUser(user.id)}
                                  className="text-orange-600"
                                >
                                  <Lock className="h-4 w-4 mr-2" />
                                  Suspend User
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleInactivateUser(user.id)}
                                  className="text-gray-600"
                                >
                                  <Unlock className="h-4 w-4 mr-2" />
                                  Mark Inactive
                                </DropdownMenuItem>
                              </>
                            ) : user.status === 'suspended' ? (
                              <DropdownMenuItem
                                onClick={() => onActivateUser(user.id)}
                                className="text-green-600"
                              >
                                <Unlock className="h-4 w-4 mr-2" />
                                Activate User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => onActivateUser(user.id)}
                                className="text-green-600"
                              >
                                <Unlock className="h-4 w-4 mr-2" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onDeleteUser(user.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Profile View */}
      <UserProfileView
        user={selectedUser}
        open={profileViewOpen}
        onClose={() => {
          setProfileViewOpen(false);
          setSelectedUser(null);
        }}
        onActivate={onActivateUser}
        onSuspend={onSuspendUser}
        onInactivate={handleInactivateUser}
        onEdit={handleEditFromProfile}
      />

      {/* User Registration Dialog */}
      <UserRegistrationDialog
        open={registrationDialogOpen}
        onClose={() => {
          setRegistrationDialogOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleSubmitUser}
        existingUser={editingUser}
      />
    </div>
  );
}