import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Funnel, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import PaginationComponent from "../PaginationComponent";

// ======================
// 🧩 Dummy Pool Batch Data
// ======================
const poolBatchList = [
  { sl: 1, poolBatchId: "POL100000001", totalApps: 42, approvedApps: 31, rejectedApps: 6, totalDisbursedAmount: 1180000, createdOn: "2025-09-25" },
  { sl: 2, poolBatchId: "POL100000002", totalApps: 57, approvedApps: 48, rejectedApps: 7, totalDisbursedAmount: 1590000, createdOn: "2025-09-26" },
  { sl: 3, poolBatchId: "POL100000003", totalApps: 33, approvedApps: 28, rejectedApps: 3, totalDisbursedAmount: 940000, createdOn: "2025-09-27" },
  { sl: 4, poolBatchId: "POL100000004", totalApps: 64, approvedApps: 59, rejectedApps: 3, totalDisbursedAmount: 1820000, createdOn: "2025-09-28" },
  { sl: 5, poolBatchId: "POL100000005", totalApps: 28, approvedApps: 22, rejectedApps: 5, totalDisbursedAmount: 720000, createdOn: "2025-09-29" },
  { sl: 6, poolBatchId: "POL100000006", totalApps: 51, approvedApps: 44, rejectedApps: 5, totalDisbursedAmount: 1470000, createdOn: "2025-09-30" },
  { sl: 7, poolBatchId: "POL100000007", totalApps: 37, approvedApps: 31, rejectedApps: 4, totalDisbursedAmount: 1120000, createdOn: "2025-10-01" },
  { sl: 8, poolBatchId: "POL100000008", totalApps: 68, approvedApps: 63, rejectedApps: 4, totalDisbursedAmount: 1920000, createdOn: "2025-10-02" },
  { sl: 9, poolBatchId: "POL100000009", totalApps: 43, approvedApps: 39, rejectedApps: 3, totalDisbursedAmount: 1240000, createdOn: "2025-10-03" },
  { sl: 10, poolBatchId: "POL100000010", totalApps: 60, approvedApps: 55, rejectedApps: 4, totalDisbursedAmount: 1750000, createdOn: "2025-10-04" },
  { sl: 11, poolBatchId: "POL100000011", totalApps: 36, approvedApps: 30, rejectedApps: 5, totalDisbursedAmount: 980000, createdOn: "2025-10-05" },
  { sl: 12, poolBatchId: "POL100000012", totalApps: 48, approvedApps: 42, rejectedApps: 4, totalDisbursedAmount: 1310000, createdOn: "2025-10-06" },
  { sl: 13, poolBatchId: "POL100000013", totalApps: 53, approvedApps: 46, rejectedApps: 6, totalDisbursedAmount: 1540000, createdOn: "2025-10-07" },
  { sl: 14, poolBatchId: "POL100000014", totalApps: 39, approvedApps: 34, rejectedApps: 4, totalDisbursedAmount: 1100000, createdOn: "2025-10-08" },
  { sl: 15, poolBatchId: "POL100000015", totalApps: 72, approvedApps: 65, rejectedApps: 5, totalDisbursedAmount: 2080000, createdOn: "2025-10-09" },
  { sl: 16, poolBatchId: "POL100000016", totalApps: 46, approvedApps: 38, rejectedApps: 6, totalDisbursedAmount: 1270000, createdOn: "2025-10-10" },
  { sl: 17, poolBatchId: "POL100000017", totalApps: 52, approvedApps: 48, rejectedApps: 3, totalDisbursedAmount: 1580000, createdOn: "2025-10-11" },
  { sl: 18, poolBatchId: "POL100000018", totalApps: 40, approvedApps: 33, rejectedApps: 5, totalDisbursedAmount: 1000000, createdOn: "2025-10-12" },
  { sl: 19, poolBatchId: "POL100000019", totalApps: 31, approvedApps: 26, rejectedApps: 3, totalDisbursedAmount: 820000, createdOn: "2025-10-13" },
  { sl: 20, poolBatchId: "POL100000020", totalApps: 65, approvedApps: 59, rejectedApps: 4, totalDisbursedAmount: 1900000, createdOn: "2025-10-14" },
  { sl: 21, poolBatchId: "POL100000021", totalApps: 56, approvedApps: 50, rejectedApps: 4, totalDisbursedAmount: 1670000, createdOn: "2025-10-15" },
  { sl: 22, poolBatchId: "POL100000022", totalApps: 38, approvedApps: 32, rejectedApps: 5, totalDisbursedAmount: 990000, createdOn: "2025-10-16" },
  { sl: 23, poolBatchId: "POL100000023", totalApps: 48, approvedApps: 41, rejectedApps: 5, totalDisbursedAmount: 1280000, createdOn: "2025-10-17" },
  { sl: 24, poolBatchId: "POL100000024", totalApps: 58, approvedApps: 52, rejectedApps: 4, totalDisbursedAmount: 1720000, createdOn: "2025-10-18" },
  { sl: 25, poolBatchId: "POL100000025", totalApps: 35, approvedApps: 30, rejectedApps: 3, totalDisbursedAmount: 910000, createdOn: "2025-10-19" },
  { sl: 26, poolBatchId: "POL100000026", totalApps: 47, approvedApps: 42, rejectedApps: 4, totalDisbursedAmount: 1360000, createdOn: "2025-10-20" },
  { sl: 27, poolBatchId: "POL100000027", totalApps: 63, approvedApps: 58, rejectedApps: 3, totalDisbursedAmount: 1830000, createdOn: "2025-10-21" },
  { sl: 28, poolBatchId: "POL100000028", totalApps: 30, approvedApps: 25, rejectedApps: 3, totalDisbursedAmount: 760000, createdOn: "2025-10-22" },
  { sl: 29, poolBatchId: "POL100000029", totalApps: 42, approvedApps: 37, rejectedApps: 4, totalDisbursedAmount: 1190000, createdOn: "2025-10-23" },
  { sl: 30, poolBatchId: "POL100000030", totalApps: 66, approvedApps: 61, rejectedApps: 4, totalDisbursedAmount: 1960000, createdOn: "2025-10-24" },
  { sl: 31, poolBatchId: "POL100000031", totalApps: 41, approvedApps: 35, rejectedApps: 5, totalDisbursedAmount: 1020000, createdOn: "2025-10-25" },
  { sl: 32, poolBatchId: "POL100000032", totalApps: 60, approvedApps: 55, rejectedApps: 3, totalDisbursedAmount: 1710000, createdOn: "2025-10-26" },
  { sl: 33, poolBatchId: "POL100000033", totalApps: 53, approvedApps: 46, rejectedApps: 4, totalDisbursedAmount: 1520000, createdOn: "2025-10-27" },
  { sl: 34, poolBatchId: "POL100000034", totalApps: 49, approvedApps: 42, rejectedApps: 5, totalDisbursedAmount: 1310000, createdOn: "2025-10-28" },
  { sl: 35, poolBatchId: "POL100000035", totalApps: 68, approvedApps: 63, rejectedApps: 3, totalDisbursedAmount: 1980000, createdOn: "2025-10-29" },
  { sl: 36, poolBatchId: "POL100000036", totalApps: 45, approvedApps: 38, rejectedApps: 5, totalDisbursedAmount: 1170000, createdOn: "2025-10-30" },
  { sl: 37, poolBatchId: "POL100000037", totalApps: 51, approvedApps: 44, rejectedApps: 5, totalDisbursedAmount: 1410000, createdOn: "2025-10-31" },
  { sl: 38, poolBatchId: "POL100000038", totalApps: 35, approvedApps: 29, rejectedApps: 4, totalDisbursedAmount: 860000, createdOn: "2025-11-01" },
  { sl: 39, poolBatchId: "POL100000039", totalApps: 59, approvedApps: 53, rejectedApps: 4, totalDisbursedAmount: 1740000, createdOn: "2025-11-02" },
  { sl: 40, poolBatchId: "POL100000040", totalApps: 48, approvedApps: 43, rejectedApps: 4, totalDisbursedAmount: 1290000, createdOn: "2025-11-03" },
  { sl: 41, poolBatchId: "POL100000041", totalApps: 39, approvedApps: 34, rejectedApps: 3, totalDisbursedAmount: 980000, createdOn: "2025-11-04" },
  { sl: 42, poolBatchId: "POL100000042", totalApps: 50, approvedApps: 44, rejectedApps: 5, totalDisbursedAmount: 1390000, createdOn: "2025-11-05" },
  { sl: 43, poolBatchId: "POL100000043", totalApps: 54, approvedApps: 47, rejectedApps: 5, totalDisbursedAmount: 1490000, createdOn: "2025-11-06" },
  { sl: 44, poolBatchId: "POL100000044", totalApps: 62, approvedApps: 56, rejectedApps: 4, totalDisbursedAmount: 1800000, createdOn: "2025-11-07" },
  { sl: 45, poolBatchId: "POL100000045", totalApps: 40, approvedApps: 34, rejectedApps: 4, totalDisbursedAmount: 1010000, createdOn: "2025-11-08" },
  { sl: 46, poolBatchId: "POL100000046", totalApps: 36, approvedApps: 30, rejectedApps: 3, totalDisbursedAmount: 940000, createdOn: "2025-11-09" },
  { sl: 47, poolBatchId: "POL100000047", totalApps: 58, approvedApps: 53, rejectedApps: 4, totalDisbursedAmount: 1710000, createdOn: "2025-11-10" },
  { sl: 48, poolBatchId: "POL100000048", totalApps: 32, approvedApps: 27, rejectedApps: 3, totalDisbursedAmount: 880000, createdOn: "2025-11-11" },
  { sl: 49, poolBatchId: "POL100000049", totalApps: 55, approvedApps: 49, rejectedApps: 4, totalDisbursedAmount: 1600000, createdOn: "2025-11-12" },
  { sl: 50, poolBatchId: "POL100000050", totalApps: 61, approvedApps: 57, rejectedApps: 3, totalDisbursedAmount: 1850000, createdOn: "2025-11-13" },
];




export const columns: ColumnDef<typeof poolBatchList[0]>[] = [
  {
    accessorKey: "sl",
    header: () => <p className="text-center">SL</p>,
    cell: ({ row }) => (
      <p className="text-center font-bold">{row.getValue("sl")}</p>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "poolBatchId",
    header: () => <p className="text-center">Pool Batch ID</p>,
    cell: ({ row }) => (
      <div className="text-center font-semibold text-[#0A4DA2]">
        {row.getValue("poolBatchId")}
      </div>
    ),
  },
  {
    accessorKey: "totalApps",
    header: () => <p className="text-center">Total Apps</p>,
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("totalApps")}
      </div>
    ),
  },
  {
    accessorKey: "approvedApps",
    header: () => <p className="text-center">Approved Apps</p>,
    cell: ({ row }) => (
      <div className="text-center text-green-600 font-semibold">
        {row.getValue("approvedApps")}
      </div>
    ),
  },
  {
    accessorKey: "rejectedApps",
    header: () => <p className="text-center">Rejected Apps</p>,
    cell: ({ row }) => (
      <div className="text-center text-red-500 font-semibold">
        {row.getValue("rejectedApps")}
      </div>
    ),
  },
  {
    accessorKey: "totalDisbursedAmount",
    header: () => <p className="text-center">Total Disbursed Amount</p>,
    cell: ({ row }) => (
      <div className="text-center text-[#333] font-medium">
        ₹ {Number(row.getValue("totalDisbursedAmount")).toLocaleString("en-IN")}
      </div>
    ),
  },
  {
    accessorKey: "createdOn",
    header: () => <p className="text-center">Created On</p>,
    cell: ({ row }) => (
      <div className="text-center text-gray-500">{row.getValue("createdOn")}</div>
    ),
  },
  {
    id: "actions",
    header: () => <p className="text-center">Action</p>,
    cell: ({  }) => {
      const navigate = useNavigate();
      return (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            className="text-[#0A4DA2] border border-[#BBDFFF] hover:bg-[#E3F5FF]"
            onClick={() =>
              navigate(`/history/pool-batch/details`)
            }
          >
            <Eye className="h-4 w-4 mr-1" />
            View More
          </Button>
        </div>
      );
    },
  },
];

// ======================
// 🧮 Main Table Component
// ======================
export default function PoolBatchListTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: poolBatchList,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _colId, filterValue) => {
      const search = filterValue.toLowerCase();
      return row
        .getAllCells()
        .some((cell) => String(cell.getValue()).toLowerCase().includes(search));
    },
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg mb-4">
        <div className="flex items-center justify-between p-3 border-b border-[#C3EEFF]">
          <h2 className="text-lg font-bold text-[#0A4DA2]">
            Pool Batch History
          </h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search batch…"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="bg-[#C3EEFF] border border-[#BBDFFF] text-sm w-[240px] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              variant="outline"
              className="text-[#0A4DA2] border-none p-0 hover:text-[#0A4DA2]/80 hover:bg-white"
            >
              <ArrowUpDown />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-[#0A4DA2] border-none p-0 hover:text-[#0A4DA2]/80 hover:bg-white"
                >
                  <Funnel />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(val) => column.toggleVisibility(!!val)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#D1E9FF]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-sm font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-sm text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No batches found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <PaginationComponent table={table} />
    </div>
  );
}
