// PaginationComponent.tsx
import { useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/pagination";

const DOTS = "DOTS" as const;

/**
 * Hook to compute pagination range including dots
 */
function usePagination({
  totalCount,
  siblingCount = 1,
  currentPage,
}: UsePaginationParams): PaginationRange {
  return useMemo(() => {
    const totalPageCount = totalCount;
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPageCount) {
      return Array.from({ length: totalPageCount }, (_, idx) => idx + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    const pages: PaginationRange = [];

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, idx) => idx + 1
      );
      pages.push(...leftRange, DOTS, lastPageIndex);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, idx) => totalPageCount - (3 + 2 * siblingCount) + idx + 1
      );
      pages.push(firstPageIndex, DOTS, ...rightRange);
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, idx) => leftSiblingIndex + idx
      );
      pages.push(firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex);
    }

    return pages;
  }, [totalCount, siblingCount, currentPage]);
}

/**
 * Generic pagination component for TanStack Table
 */
export default function PaginationComponent<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const paginationRange = usePagination({
    totalCount: totalPages,
    siblingCount: 1,
    currentPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className="flex items-center justify-center py-4 space-x-2 mr-24">
      <div className="min-w-[100px] text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                table.getCanPreviousPage()
                  ? "mr-2"
                  : "opacity-50 pointer-events-none mr-2"
              }
              onClick={() => table.previousPage()}
            />
          </PaginationItem>

          {paginationRange.map((page, idx) =>
            page === DOTS ? (
              <PaginationEllipsis
                key={`dots-${idx}`}
                className="page-inactive"
              />
            ) : (
              <PaginationLink
                key={page}
                onClick={() => table.setPageIndex(page - 1)}
                className={`
                  ${currentPage === page ? "page-active" : "page-inactive"}
                  ${idx === 0 ? "page-active1" : ""}
                  ${idx === paginationRange.length - 1 ? "page-active-last" : ""}`}
              >
                {page}
              </PaginationLink>
            )
          )}

          <PaginationItem>
            <PaginationNext
              className={
                table.getCanNextPage()
                  ? "ml-2"
                  : "opacity-50 pointer-events-none ml-2"
              }
              onClick={() => table.nextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
