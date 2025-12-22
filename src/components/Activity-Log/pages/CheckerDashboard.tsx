import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../StatusBadge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetActivitiesByModuleQuery } from '@/redux/features/activity/activityApi';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

export function CheckerDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterActivityType, setFilterActivityType] = useState<string>('all');
  const [page, setPage] = useState(1);

  const { data: apiData, isLoading, isError } = useGetActivitiesByModuleQuery({
    page,
    module: filterModule !== 'all' ? filterModule : undefined,
    status: filterStatus !== 'all' ? filterStatus as "pending" | "approved" | "rejected" : undefined,
    activity_type: filterActivityType !== 'all' ? filterActivityType : undefined,
  });

  const requests = apiData?.data?.data || [];
  const totalPages = apiData?.data?.last_page || 1;
  const currentPage = apiData?.data?.current_page || 1;
  const totalRecords = apiData?.data?.total || 0;

  // Only filter by search term locally, as module, status, and activity_type are handled by API
  const filteredRequests = requests.filter(req => {
    const matchesSearch = searchTerm === '' || 
                         String(req.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (req.user || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Reset to page 1 when filters change
  const handleModuleChange = (value: string) => {
    setFilterModule(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
    setPage(1);
  };

  const handleActivityTypeChange = (value: string) => {
    setFilterActivityType(value);
    setPage(1);
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  if (isLoading) {
    return (
      <div className="space-y-6 py-3 px-3">
        <Card className="py-4 px-6">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-gray-600">Loading activities...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6 py-3 px-3">
        <Card className="py-4 px-6">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-red-600">Error loading activities. Please try again.</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-3 px-3">
      {/* Filters */}
      <Card className="py-4 px-6">
        <CardHeader>
          <CardTitle>Approval Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search by ID or Maker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Select value={filterModule} onValueChange={handleModuleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Modules" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="nbfc">NBFC</SelectItem>
                <SelectItem value="bre">BRE</SelectItem>
                <SelectItem value="lendingRates">Lending Rates</SelectItem>
                <SelectItem value="roles">Roles</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterActivityType} onValueChange={handleActivityTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Activities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="insert">Insert</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead>Request ID</TableHead> */}
                  <TableHead>Module</TableHead>
                  <TableHead>Activity Type</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Submitted On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request: any) => (
                    <TableRow key={request.id}>
                      {/* <TableCell className="font-mono font-medium">
                        {request.id}
                      </TableCell> */}
                      <TableCell className="capitalize">{request.module_name?.replace('_', ' ')}</TableCell>
                      <TableCell className="capitalize">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${request.activity_type === 'insert' ? 'bg-blue-100 text-blue-800' : ''}
                          ${request.activity_type === 'update' ? 'bg-purple-100 text-purple-800' : ''}
                          ${request.activity_type === 'delete' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                          {request.activity_type}
                        </span>
                      </TableCell>
                      <TableCell>
                        {request.creator ? `${request.creator.first_name} ${request.creator.last_name}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {request.created_at && format(new Date(request.created_at), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={request.status || 'pending'} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/activity/${request.id}`)}
                        >
                          <Eye className="size-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between py-4 px-2">
              <div className="text-sm text-gray-600">
                Showing {apiData?.data?.from || 0} to {apiData?.data?.to || 0} of {totalRecords} results
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={
                          currentPage === 1
                            ? "opacity-50 pointer-events-none cursor-not-allowed"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            onClick={() => setPage(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className="cursor-pointer"
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className={
                          currentPage === totalPages
                            ? "opacity-50 pointer-events-none cursor-not-allowed"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
