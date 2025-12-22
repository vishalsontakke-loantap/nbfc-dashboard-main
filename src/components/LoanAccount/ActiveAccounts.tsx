import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import useDebounce from "@/hooks/useDebounce";
import { getSelectedNbfcId } from "@/redux/features/nbfc/nbfcSlice";
import { Button as ActionButton } from "@/components/ui/button";
import { useGetLoanAccountDetailsQuery } from "@/redux/features/loan/loanApi";

/* ---------------- Types ---------------- */
type Disbursement = {
  id: number;
  lapp_id: string;
  loan_tenure: string;
  loan_id: string;
  bank_sanction_amount?: string | null;
  customer_name: string;
  mobile_number: string;
  sanction_limit: string;
  created_at: string;
};

export default function ActiveAccounts() {
  const navigate = useNavigate();

  /* ---------------- Redux ---------------- */
  const selectedNbfcId = useSelector(getSelectedNbfcId);

  /* ---------------- UI State ---------------- */
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery.trim(), 300);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  /* ---------------- API (NBFC INCLUDED) ---------------- */
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetLoanAccountDetailsQuery(
    {
      page: currentPage,
      per_page: pageSize,
      search: debouncedSearch || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  /* ---------------- Normalize API ---------------- */
  const disbursements: Disbursement[] =
    (data as any)?.data?.loans ?? [];

  const pagination = (data as any)?.data?.pagination ?? {
    current_page: currentPage,
    per_page: pageSize,
    total: disbursements.length,
    last_page: 1,
  };

  const totalItems = Number(pagination.total ?? 0);
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pagination.per_page)
  );

  /* ---------------- Preserve last good data on error ---------------- */
  const lastGoodDataRef = useRef<Disbursement[]>([]);

  useEffect(() => {
    if (!isError && disbursements.length > 0) {
      lastGoodDataRef.current = disbursements;
    }
  }, [disbursements, isError]);

  const displayData = isError
    ? lastGoodDataRef.current
    : disbursements;

  /* ---------------- Reset page on filter change ---------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedNbfcId]);

  /* ---------------- Refetch when NBFC changes ---------------- */
  useEffect(() => {
    if (selectedNbfcId) {
      refetch();
    }
  }, [selectedNbfcId, refetch]);

  /* ---------------- Pagination ---------------- */
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* ---------------- Render ---------------- */
  return (
    <div className=" space-y-6">
      {/* Header */}
      {/* Search */}
      <Card className="p-3">
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
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto ">
            <Table className="!text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">SL</TableHead>
                  <TableHead className="text-center">Lead ID</TableHead>
                  <TableHead className="text-center">Loan ID</TableHead>
                  <TableHead className="text-center">Customer</TableHead>
                  <TableHead className="text-center">Mobile</TableHead>
                  <TableHead className="text-center">Sanction</TableHead>
                  <TableHead className="text-center">Tenure</TableHead>
                  <TableHead className="text-center">Created At</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      loading...
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      No records found.
                    </TableCell>
                  </TableRow>
                ) : displayData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      No Records Found.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayData.map((d, idx) => {
                    const serial =
                      (pagination.current_page - 1) *
                      pagination.per_page +
                      idx +
                      1;

                    return (
                      <TableRow key={d.id}>
                        <TableCell className="text-center font-xs">
                          {serial}
                        </TableCell>
                        <TableCell className="text-center">
                          {d.lapp_id}
                        </TableCell>
                        <TableCell className="text-center">
                          {d.loan_id}
                        </TableCell>
                        <TableCell className="text-center capitalize">
                          {d.customer_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {d.mobile_number}
                        </TableCell>
                        <TableCell className="text-center">
                          ₹{" "}
                          {(Number(d.sanction_limit) || 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          {d.loan_tenure} months
                        </TableCell>
                        <TableCell className="text-center">
                          {new Date(d.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <ActionButton
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/loans/${d.loan_id}`)
                            }
                          >
                            View
                          </ActionButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>

            {totalPages <= 7 ? (
              [...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            ) : (
              <>
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {currentPage > 3 && <PaginationEllipsis />}

                {[currentPage - 1, currentPage, currentPage + 1]
                  .filter((p) => p > 1 && p < totalPages)
                  .map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={currentPage === p}
                        onClick={() => handlePageChange(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {currentPage < totalPages - 2 && <PaginationEllipsis />}

                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
