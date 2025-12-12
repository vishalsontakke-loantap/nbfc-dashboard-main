import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, Filter } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useGetDisbursementsQuery } from "@/redux/features/disbursement/disbursementApi";
import useDebounce from "@/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { Button as ActionButton } from "@/components/ui/button"; // keep original Button alias if needed

type Disbursement = {
  id: number;
  app_id: string;
  lead_id: string;
  customer_name: string;
  mobilenumber: string;
  sanction_limit: string;
  bank_sanction_amount?: string | null;
  nbfc_sanction_amount?: string | null;
  created_at: string;
};

export default function DisbursementListScreen() {
  const navigate = useNavigate();

  // UI + filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch = useDebounce(searchQuery.trim(), 300);
  const [nbfcFilter, setNbfcFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1); // 1-based for API
  const [pageSize, setPageSize] = useState<number>(10);

  // Fetch disbursements from API (assumes hook accepts params object)
  const { data, isLoading, isFetching, error, refetch } = useGetDisbursementsQuery(
    {
      page: currentPage,
      per_page: pageSize,
      search: debouncedSearch || undefined,
      nbfc: nbfcFilter !== "all" ? nbfcFilter : undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Normalize API shape: expects { disbursements: [...], pagination: {...} }
  const disbursements: Disbursement[] = Array.isArray(data?.disbursements)
    ? data.disbursements
    : Array.isArray(data?.data?.disbursements)
    ? data.data.disbursements
    : [];

  const pagination = data?.pagination ?? data?.data?.pagination ?? {
    current_page: currentPage,
    per_page: pageSize,
    total: disbursements.length,
    last_page: 1,
  };

  const totalItems = Number(pagination.total ?? 0);
  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / (pagination.per_page || pageSize)));
  const apiPage = Number(pagination.current_page ?? currentPage);

  // Keep local currentPage in sync with server-provided page
  useEffect(() => {
    if (apiPage && !Number.isNaN(apiPage) && apiPage !== currentPage) {
      setCurrentPage(apiPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPage]);

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, nbfcFilter, statusFilter, pageSize]);

  // Derive NBFC options from current page results (or fetch separately if you have endpoint)
  const nbfcOptions = useMemo(() => {
    if (!disbursements || disbursements.length === 0) return [];
    const uniq = Array.from(new Map(disbursements.map((d) => [d.customer_name, d.customer_name])).values());
    return uniq;
  }, [disbursements]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Disbursements</h2>
          <p className="text-gray-600 mt-1">List of disbursement requests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => refetch()} disabled={isFetching || isLoading}>Refresh</Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by Lead ID, App ID, or Customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled={isLoading || isFetching}
              />
            </div>

            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={nbfcFilter} onValueChange={(v) => setNbfcFilter(v)}>
              <SelectTrigger className="w-[220px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by NBFC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All NBFCs</SelectItem>
                {nbfcOptions.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {disbursements.length} results — Page {pagination.current_page} of {totalPages} (Total: {totalItems})
            {isFetching && <span className="ml-2 text-xs text-gray-400">Updating...</span>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">SL</TableHead>
                  <TableHead className="text-center">Lead ID</TableHead>
                  <TableHead className="text-center">App ID</TableHead>
                  <TableHead className="text-center">Customer</TableHead>
                  <TableHead className="text-center">Mobile</TableHead>
                  <TableHead className="text-center">Sanction</TableHead>
                  <TableHead className="text-center">Created At</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {disbursements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      {isLoading ? "Loading disbursements..." : "No disbursements found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  disbursements.map((d, idx) => {
                    const serial = (pagination.current_page - 1) * (pagination.per_page || pageSize) + idx + 1;
                    return (
                      <TableRow key={d.id}>
                        <TableCell className="text-center font-semibold">{serial}</TableCell>
                        <TableCell className="text-center">{d.lead_id}</TableCell>
                        <TableCell className="text-center">{d.app_id}</TableCell>
                        <TableCell className="text-center capitalize">{d.customer_name}</TableCell>
                        <TableCell className="text-center">{d.mobilenumber}</TableCell>
                        <TableCell className="text-center">₹ {(Number(d.sanction_limit) || 0).toLocaleString()}</TableCell>
                        <TableCell className="text-center">{new Date(d.created_at).toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <ActionButton variant="outline" size="sm" onClick={() => navigate(`/applications/${d.app_id}`)}>
                              View
                            </ActionButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination at bottom */}
          <div className="flex justify-end mt-4 items-center gap-3">

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
    </div>
  );
}
