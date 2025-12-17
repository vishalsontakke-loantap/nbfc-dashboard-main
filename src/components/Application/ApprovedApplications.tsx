import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { Search } from "lucide-react";
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
import { Button as ActionButton } from "@/components/ui/button";
import { getSelectedNbfcId } from "@/redux/features/nbfc/nbfcSlice";
import { useSelector } from "react-redux";

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

  /* ----------------------------- UI state ----------------------------- */
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery.trim(), 300);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const selectedNbfcId = useSelector(getSelectedNbfcId);

  /* ----------------------------- API ----------------------------- */
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetDisbursementsQuery(
    {
      page: currentPage,
      per_page: pageSize,
      search: debouncedSearch || undefined,
      nbfc: selectedNbfcId || undefined,
      status: "pending",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  /* ----------------------------- Normalize API ----------------------------- */
  const disbursements: Disbursement[] =
    data?.data?.disbursements ?? data?.disbursements ?? [];

  const pagination = data?.data?.pagination ?? {
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

  /* ----------------------------- Preserve last good data ----------------------------- */
  const lastGoodDataRef = useRef<Disbursement[]>([]);

  useEffect(() => {
    if (!isError && disbursements.length > 0) {
      lastGoodDataRef.current = disbursements;
    }
  }, [disbursements, isError]);

  const displayData = isError
    ? lastGoodDataRef.current
    : disbursements;

  /* ----------------------------- Effects ----------------------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedNbfcId]);

  /* ----------------------------- Pagination handler ----------------------------- */
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  /* ----------------------------- Render ----------------------------- */
  return (
    <div className="p-3 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Disbursements</h2>
          <p className="text-gray-600 mt-1">
            List of pending disbursement requests
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by Lead ID, App ID, or Customer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            {isFetching && !isLoading && "Updating results..."}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
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
                {/* Loading */}
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading disbursements...
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  /* Error */
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-red-500"
                    >
                       No disbursements found.
                    </TableCell>
                  </TableRow>
                ) : displayData.length === 0 ? (
                  /* Empty success */
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      No disbursements found
                    </TableCell>
                  </TableRow>
                ) : (
                  /* Success */
                  displayData.map((d, idx) => {
                    const serial =
                      (pagination.current_page - 1) *
                        pagination.per_page +
                      idx +
                      1;

                    return (
                      <TableRow key={d.id}>
                        <TableCell className="text-center font-semibold">
                          {serial}
                        </TableCell>
                        <TableCell className="text-center">
                          {d.lead_id}
                        </TableCell>
                        <TableCell className="text-center">
                          {d.app_id}
                        </TableCell>
                        <TableCell className="text-center capitalize">
                          {d.customer_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {d.mobilenumber}
                        </TableCell>
                        <TableCell className="text-center">
                          ₹{" "}
                          {(Number(d.sanction_limit) || 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Date(d.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          <ActionButton
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              navigate(`/applications/${d.app_id}`)
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
        </CardContent>
      </Card>
    </div>
  );
}
