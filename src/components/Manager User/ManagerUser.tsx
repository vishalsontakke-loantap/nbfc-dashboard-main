// components/users/UserListingScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { toast } from "sonner";
import { UserProfileView } from "./UserProfileView";
import UserRegistrationDialog from "./UserRegistrationDialog";
import type { User } from "../../lib/user-mocks";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import useDebounce from "../../hooks/UseDebounce";
import { useGetAllNbfcQuery } from "@/redux/features/nbfc/nbfcApi";

// NOTE: import your NBFC RTK Query hook. Adjust the path/name if different.

interface UserListingScreenProps {
  onEditUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onSuspendUser: (userId: string) => void;
  onActivateUser: (userId: string) => void;
  onAddUser: (userData: Partial<User>) => void;
  onUpdateUser: (userId: string, userData: Partial<User>) => void;
}

export function UserListingScreen({
  onEditUser,
  onDeleteUser,
  onSuspendUser,
  onActivateUser,
  onAddUser,
  onUpdateUser,
}: UserListingScreenProps) {
  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 300); // debounced version used for API

  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [nbfcFilter, setNbfcFilter] = useState<string>("all");

  // date range filter (string in yyyy-mm-dd for input type=date)
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [profileViewOpen, setProfileViewOpen] = useState(false);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);

  // NBFC list - fetched from NBFC API
  const {
    data: nbfcData,
    isLoading: nbfcLoading,
    isFetching: nbfcFetching,
    error: nbfcError,
  } = useGetAllNbfcQuery(undefined, { refetchOnMountOrArgChange: true });

  // Extract NBFC options (adapt to your API shape)
  const nbfcArray: { id: string | number; name: string }[] = Array.isArray(nbfcData?.data?.items)
    ? nbfcData!.data.items
    : [];

  // RTK Query - include date filters and nbfc filter (if your backend supports them)
  const { data, isLoading, isFetching, error, refetch } = useGetUsersQuery(
    {
      page: currentPage,
      pageSize,
      q: debouncedSearchQuery ? debouncedSearchQuery : undefined,
      // pass these along if your API supports filtering by them
      partner_id: nbfcFilter && nbfcFilter !== "all" ? nbfcFilter : undefined,
    },
    { refetchOnMountOrArgChange: true }
  );
  // ====== Adapt to your API shape: { success, data: { users: [...], pagination: {...} } } ======
  const usersArray: User[] = Array.isArray(data?.data?.users)
    ? data!.data.users
    : Array.isArray(data?.data)
      ? (data!.data as any)
      : [];

  const pagination = data?.data?.pagination ?? {};
  const totalItems = Number(pagination.total ?? pagination.total_items ?? usersArray.length ?? 0);
  const perPage = Number(pagination.per_page ?? pagination.perPage ?? pageSize);
  const apiPage = Number(pagination.current_page ?? pagination.page ?? currentPage);

  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / (perPage || pageSize)));

  // keep local page in sync with server-driven page (if server sets it)
  useEffect(() => {
    if (apiPage && !Number.isNaN(apiPage) && apiPage !== currentPage) {
      setCurrentPage(apiPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPage]);

  // When debounced search or filters change, reset to page 1 so user sees start of results
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, roleFilter, statusFilter, nbfcFilter, pageSize, startDate, endDate]);

  // derive roles from current page items
  const roles = useMemo(() => Array.from(new Set(usersArray.map((u) => u.role).filter(Boolean))), [usersArray]);

  // client-side extra filtering on top of server page results
  // We use immediate `searchQuery` here so the table filters locally while user types,
  // but the server query uses debouncedSearchQuery.
  const filteredUsers = usersArray;

  const getStatusBadge = (isActive: number | boolean) => {
    const status = isActive ? "active" : "inactive";
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleExport = () => {
    toast.success("Exporting user list...");
    // implement CSV export if desired
  };

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
    setProfileViewOpen(true);
  };

  const handleEditFromProfile = (userId: string) => {
    const user = usersArray.find((u) => String(u.id) === String(userId));
    if (user) {
      setEditingUser(user);
      setProfileViewOpen(false);
      setRegistrationDialogOpen(true);
    }
  };

  const handleInactivateUser = (userId: string) => {
    const user = usersArray.find((u) => String(u.id) === String(userId));
    if (user) {
      onUpdateUser(String(userId), { is_active: "0" });
      toast.info(`User ${user.first_name} ${user.last_name} has been marked inactive`);
      // refetch to reflect change
      refetch();
    }
  };

  const handleInviteUser = () => {
    setEditingUser(null);
    setRegistrationDialogOpen(true);
  };

  const handleSubmitUser = (userData: Partial<User>) => {
    if (editingUser) {
      onUpdateUser(String(editingUser.id), userData);
    } else {
      onAddUser(userData);
    }
    setEditingUser(null);
    setRegistrationDialogOpen(false);
    refetch();
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // useGetUsersQuery will refetch automatically when args change
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
          <Button variant="outline" onClick={handleExport} disabled={isLoading || isFetching}>
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
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{totalItems}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-3xl">
              {usersArray.filter((u) => u.is_active).length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Inactive</CardDescription>
            <CardTitle className="text-3xl">
              {usersArray.filter((u) => !u.is_active).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-2">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 relative min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value); // do not set page here, debounced effect will reset
                }}
                className="pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); }}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* NBFC select */}
            <Select value={nbfcFilter} onValueChange={(v) => { setNbfcFilter(v); }}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="NBFC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All NBFCs</SelectItem>
                {nbfcArray.map((nbfc) => (
                  <SelectItem key={nbfc.partner_id} value={String(nbfc.partner_id)}>
                    {nbfc.nbfc_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

           
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredUsers.length} of {totalItems} users (page {currentPage} of {totalPages}){" "}
            {isFetching && <span className="ml-2 text-xs text-gray-500">Updating...</span>}
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
                  <TableHead>NBFC</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {isLoading ? "Loading users..." : "No users found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => {
                    // display NBFC name if available
                    const nbfcName = (user as any).nbfc?.name ?? (user as any).nbfc_name ?? "-";
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.first_name} {user.last_name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400">ID: {user.id}</div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>

                        <TableCell>{nbfcName}</TableCell>
                        <TableCell>{(user as any).location ?? "-"}</TableCell>
                        <TableCell>{getStatusBadge(user.is_active)}</TableCell>
                        <TableCell>{formatDate(user.created_at)}</TableCell>

                        <TableCell className="text-right">
                          <DropdownMenu open={menuOpenFor === String(user.id)} onOpenChange={(open) => setMenuOpenFor(open ? String(user.id) : null)}>
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

                              <DropdownMenuItem
                                onClick={() => {
                                  setMenuOpenFor(null);
                                  handleViewProfile(user);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>

                              <DropdownMenuItem onClick={() => toast.info(`Send email to ${user.email}`)}>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              {user.is_active ? (
                                <>
                                  <DropdownMenuItem onClick={() => onSuspendUser(String(user.id))} className="text-orange-600">
                                    <Lock className="h-4 w-4 mr-2" />
                                    Suspend User
                                  </DropdownMenuItem>

                                  <DropdownMenuItem onClick={() => handleInactivateUser(String(user.id))} className="text-gray-600">
                                    <Unlock className="h-4 w-4 mr-2" />
                                    Mark Inactive
                                  </DropdownMenuItem>
                                </>
                              ) : (
                                <DropdownMenuItem onClick={() => onActivateUser(String(user.id))} className="text-green-600">
                                  <Unlock className="h-4 w-4 mr-2" />
                                  Activate User
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />

                              <DropdownMenuItem onClick={() => onDeleteUser(String(user.id))} className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4 mr-2 items-center gap-3">
            <div className="text-xs text-gray-500">{isFetching ? "Updating..." : `Page ${currentPage} of ${totalPages}`}</div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""} />
                </PaginationItem>

                {totalPages <= 7 ? (
                  [...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))
                ) : (
                  <>
                    <PaginationItem>
                      <PaginationLink href="#" isActive={currentPage === 1} onClick={(e) => { e.preventDefault(); handlePageChange(1); }}>
                        1
                      </PaginationLink>
                    </PaginationItem>

                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {[currentPage - 1, currentPage, currentPage + 1]
                      .filter((p) => p > 1 && p < totalPages)
                      .map((p) => (
                        <PaginationItem key={p}>
                          <PaginationLink href="#" isActive={currentPage === p} onClick={(e) => { e.preventDefault(); handlePageChange(p); }}>
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationLink href="#" isActive={currentPage === totalPages} onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(currentPage + 1)} className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
        onActivate={(id) => {
          onActivateUser(String(id));
          refetch();
        }}
        onSuspend={(id) => {
          onSuspendUser(String(id));
          refetch();
        }}
        onInactivate={(id) => {
          handleInactivateUser(String(id));
        }}
        onEdit={handleEditFromProfile}
      />

      {/* User Registration Dialog */}
      <UserRegistrationDialog
        open={registrationDialogOpen}
        onClose={() => {
          setRegistrationDialogOpen(false);
          setEditingUser(null);
        }}
        existingUser={editingUser}
      />
    </div>
  );
}

export default UserListingScreen;
