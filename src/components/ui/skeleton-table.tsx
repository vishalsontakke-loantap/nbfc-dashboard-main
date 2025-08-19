import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  cellClassName?: string;
  rowClassName?: string;
  headerClassName?: string;
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  showHeader = true,
  cellClassName,
  rowClassName,
  headerClassName,
  className,
  ...props
}: SkeletonTableProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <Table>
        {showHeader && (
          <TableHeader>
            <TableRow className={headerClassName}>
              {Array(columns)
                .fill(0)
                .map((_, index) => (
                  <TableHead key={`skeleton-header-${index}`}>
                    <div className="h-5 w-full rounded-md bg-gray-300 animate-pulse" />
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {Array(rows)
            .fill(0)
            .map((_, rowIndex) => (
              <TableRow
                key={`skeleton-row-${rowIndex}`}
                className={rowClassName}
              >
                {Array(columns)
                  .fill(0)
                  .map((_, colIndex) => (
                    <TableCell
                      key={`skeleton-cell-${rowIndex}-${colIndex}`}
                      className={cellClassName}
                    >
                      <div className="h-4 w-full rounded-md bg-gray-300/80 animate-pulse overflow-hidden relative" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Shimmer effect alternative
export function SkeletonTableShimmer({
  rows = 5,
  columns = 4,
  showHeader = true,
  cellClassName,
  rowClassName,
  headerClassName,
  className,
  ...props
}: SkeletonTableProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="relative overflow-hidden">
        <Table>
          {showHeader && (
            <TableHeader>
              <TableRow className={headerClassName}>
                {Array(columns)
                  .fill(0)
                  .map((_, index) => (
                    <TableHead key={`skeleton-header-${index}`}>
                      <div className="h-5 w-full rounded-md bg-gray-300/70" />
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {Array(rows)
              .fill(0)
              .map((_, rowIndex) => (
                <TableRow
                  key={`skeleton-row-${rowIndex}`}
                  className={rowClassName}
                >
                  {Array(columns)
                    .fill(0)
                    .map((_, colIndex) => (
                      <TableCell
                        key={`skeleton-cell-${rowIndex}-${colIndex}`}
                        className={cellClassName}
                      >
                        <div className="h-4 w-full rounded-md bg-gray-300/60" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
