import * as React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpDown, Funnel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import PaginationComponent from "@/components/PaginationComponent";

// Dummy Loan Data (replace later with API)
const loanApplications = [
  { sl: 1, nbfcId: "MFL301326297", appId: "APP7097165262", status: "Rejected", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 101249, posAmount: 64344 },
  { sl: 2, nbfcId: "MFL710143367", appId: "APP8321270706", status: "Approved", name: "Omega Funds", tenure: 18, nbfcDisbursedAmount: 358023, posAmount: 60492 },
  { sl: 3, nbfcId: "MFL196642848", appId: "APP4320467576", status: "Rejected", name: "Beta Credit", tenure: 18, nbfcDisbursedAmount: 459825, posAmount: 233960 },
  { sl: 4, nbfcId: "MFL832109634", appId: "APP2228515797", status: "Rejected", name: "Gamma Loans", tenure: 24, nbfcDisbursedAmount: 174579, posAmount: 96060 },
  { sl: 5, nbfcId: "MFL922515283", appId: "APP3964930142", status: "Rejected", name: "Beta Credit", tenure: 12, nbfcDisbursedAmount: 214928, posAmount: 137860 },
  { sl: 6, nbfcId: "MFL503518478", appId: "APP5098277352", status: "Approved", name: "Omega Funds", tenure: 30, nbfcDisbursedAmount: 151106, posAmount: 113345 },
  { sl: 7, nbfcId: "MFL670557635", appId: "APP3866440685", status: "Rejected", name: "Omega Funds", tenure: 24, nbfcDisbursedAmount: 456589, posAmount: 413285 },
  { sl: 8, nbfcId: "MFL556047868", appId: "APP6276205905", status: "Approved", name: "Omega Funds", tenure: 30, nbfcDisbursedAmount: 145772, posAmount: 139776 },
  { sl: 9, nbfcId: "MFL457077200", appId: "APP7763890533", status: "Rejected", name: "Titanium", tenure: 30, nbfcDisbursedAmount: 217714, posAmount: 42973 },
  { sl: 10, nbfcId: "MFL352719439", appId: "APP1939987780", status: "Approved", name: "Omega Funds", tenure: 30, nbfcDisbursedAmount: 396290, posAmount: 101423 },
  { sl: 11, nbfcId: "MFL271876512", appId: "APP1928706543", status: "Rejected", name: "Beta Credit", tenure: 24, nbfcDisbursedAmount: 185432, posAmount: 92560 },
  { sl: 12, nbfcId: "MFL812345678", appId: "APP3456712345", status: "Approved", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 298765, posAmount: 167890 },
  { sl: 13, nbfcId: "MFL134562789", appId: "APP9876534210", status: "Approved", name: "Omega Funds", tenure: 36, nbfcDisbursedAmount: 512340, posAmount: 309876 },
  { sl: 14, nbfcId: "MFL456789123", appId: "APP5678912345", status: "Rejected", name: "Titanium", tenure: 12, nbfcDisbursedAmount: 128450, posAmount: 65432 },
  { sl: 15, nbfcId: "MFL567891345", appId: "APP3456789123", status: "Approved", name: "Beta Credit", tenure: 30, nbfcDisbursedAmount: 398765, posAmount: 201123 },
  { sl: 16, nbfcId: "MFL678912456", appId: "APP6789123456", status: "Approved", name: "Omega Funds", tenure: 24, nbfcDisbursedAmount: 267890, posAmount: 124321 },
  { sl: 17, nbfcId: "MFL789123567", appId: "APP7891234567", status: "Rejected", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 187654, posAmount: 72345 },
  { sl: 18, nbfcId: "MFL891234678", appId: "APP8912345678", status: "Approved", name: "Titanium", tenure: 24, nbfcDisbursedAmount: 325678, posAmount: 167890 },
  { sl: 19, nbfcId: "MFL912345789", appId: "APP9123456789", status: "Rejected", name: "Beta Credit", tenure: 12, nbfcDisbursedAmount: 142345, posAmount: 80321 },
  { sl: 20, nbfcId: "MFL102345890", appId: "APP1023456789", status: "Approved", name: "Omega Funds", tenure: 30, nbfcDisbursedAmount: 512345, posAmount: 271234 },
  { sl: 21, nbfcId: "MFL112345901", appId: "APP1123456789", status: "Rejected", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 156780, posAmount: 60345 },
  { sl: 22, nbfcId: "MFL122345912", appId: "APP1223456789", status: "Approved", name: "Omega Funds", tenure: 24, nbfcDisbursedAmount: 329876, posAmount: 178934 },
  { sl: 23, nbfcId: "MFL132345923", appId: "APP1323456789", status: "Approved", name: "Beta Credit", tenure: 36, nbfcDisbursedAmount: 567890, posAmount: 345678 },
  { sl: 24, nbfcId: "MFL142345934", appId: "APP1423456789", status: "Rejected", name: "Gamma Loans", tenure: 12, nbfcDisbursedAmount: 125678, posAmount: 60345 },
  { sl: 25, nbfcId: "MFL152345945", appId: "APP1523456789", status: "Approved", name: "Omega Funds", tenure: 18, nbfcDisbursedAmount: 278901, posAmount: 120987 },
  { sl: 26, nbfcId: "MFL162345956", appId: "APP1623456789", status: "Rejected", name: "Beta Credit", tenure: 24, nbfcDisbursedAmount: 190876, posAmount: 90432 },
  { sl: 27, nbfcId: "MFL172345967", appId: "APP1723456789", status: "Approved", name: "Omega Funds", tenure: 30, nbfcDisbursedAmount: 398765, posAmount: 201123 },
  { sl: 28, nbfcId: "MFL182345978", appId: "APP1823456789", status: "Rejected", name: "Gamma Loans", tenure: 12, nbfcDisbursedAmount: 142345, posAmount: 65321 },
  { sl: 29, nbfcId: "MFL192345989", appId: "APP1923456789", status: "Approved", name: "Omega Funds", tenure: 24, nbfcDisbursedAmount: 398761, posAmount: 195432 },
  { sl: 30, nbfcId: "MFL202345990", appId: "APP2023456789", status: "Rejected", name: "Titanium", tenure: 18, nbfcDisbursedAmount: 178654, posAmount: 79345 },
  { sl: 31, nbfcId: "MFL212345001", appId: "APP2123456789", status: "Approved", name: "Omega Funds", tenure: 36, nbfcDisbursedAmount: 589012, posAmount: 321456 },
  { sl: 32, nbfcId: "MFL222345012", appId: "APP2223456789", status: "Rejected", name: "Beta Credit", tenure: 24, nbfcDisbursedAmount: 190876, posAmount: 95678 },
  { sl: 33, nbfcId: "MFL232345023", appId: "APP2323456789", status: "Approved", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 265432, posAmount: 132098 },
  { sl: 34, nbfcId: "MFL242345034", appId: "APP2423456789", status: "Rejected", name: "Titanium", tenure: 12, nbfcDisbursedAmount: 123456, posAmount: 65432 },
  { sl: 35, nbfcId: "MFL252345045", appId: "APP2523456789", status: "Approved", name: "Omega Funds", tenure: 24, nbfcDisbursedAmount: 310987, posAmount: 165432 },
  { sl: 36, nbfcId: "MFL262345056", appId: "APP2623456789", status: "Approved", name: "Beta Credit", tenure: 30, nbfcDisbursedAmount: 435678, posAmount: 209876 },
  { sl: 37, nbfcId: "MFL272345067", appId: "APP2723456789", status: "Rejected", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 156789, posAmount: 73456 },
  { sl: 38, nbfcId: "MFL282345078", appId: "APP2823456789", status: "Approved", name: "Omega Funds", tenure: 24, nbfcDisbursedAmount: 298765, posAmount: 167890 },
  { sl: 39, nbfcId: "MFL292345089", appId: "APP2923456789", status: "Rejected", name: "Beta Credit", tenure: 12, nbfcDisbursedAmount: 178654, posAmount: 85321 },
  { sl: 40, nbfcId: "MFL302345090", appId: "APP3023456789", status: "Approved", name: "Titanium", tenure: 30, nbfcDisbursedAmount: 512345, posAmount: 287654 },
  { sl: 41, nbfcId: "MFL312345101", appId: "APP3123456789", status: "Rejected", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 167890, posAmount: 65432 },
  { sl: 42, nbfcId: "MFL322345112", appId: "APP3223456789", status: "Approved", name: "Omega Funds", tenure: 24, nbfcDisbursedAmount: 345678, posAmount: 187654 },
  { sl: 43, nbfcId: "MFL332345123", appId: "APP3323456789", status: "Approved", name: "Beta Credit", tenure: 36, nbfcDisbursedAmount: 567890, posAmount: 321098 },
  { sl: 44, nbfcId: "MFL342345134", appId: "APP3423456789", status: "Rejected", name: "Titanium", tenure: 12, nbfcDisbursedAmount: 112345, posAmount: 55432 },
  { sl: 45, nbfcId: "MFL352345145", appId: "APP3523456789", status: "Approved", name: "Omega Funds", tenure: 18, nbfcDisbursedAmount: 278901, posAmount: 120987 },
  { sl: 46, nbfcId: "MFL362345156", appId: "APP3623456789", status: "Rejected", name: "Gamma Loans", tenure: 24, nbfcDisbursedAmount: 198765, posAmount: 98765 },
  { sl: 47, nbfcId: "MFL372345167", appId: "APP3723456789", status: "Approved", name: "Omega Funds", tenure: 30, nbfcDisbursedAmount: 423456, posAmount: 210987 },
  { sl: 48, nbfcId: "MFL382345178", appId: "APP3823456789", status: "Rejected", name: "Beta Credit", tenure: 12, nbfcDisbursedAmount: 145678, posAmount: 69876 },
  { sl: 49, nbfcId: "MFL392345189", appId: "APP3923456789", status: "Approved", name: "Omega Funds", tenure: 24, nbfcDisbursedAmount: 312345, posAmount: 156789 },
  { sl: 50, nbfcId: "MFL402345190", appId: "APP4023456789", status: "Rejected", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 176543, posAmount: 78965 },
];


export const columns: ColumnDef<typeof loanApplications[number]>[] = [
  {
    accessorKey: "sl",
    header: () => <p className="text-center">SL</p>,
    cell: ({ row }) => (
      <p className="text-center font-bold">{row.getValue("sl") as number}</p>
    ),
  },
  {
    accessorKey: "nbfcId",
    header: () => <p className="text-center">NBFC ID</p>,
    cell: ({ row }) => (
      <p className="text-center uppercase">{row.getValue("nbfcId") as string}</p>
    ),
  },
  {
    accessorKey: "appId",
    header: () => <p className="text-center">App ID</p>,
    cell: ({ row }) => (
      <p className="text-center uppercase">{row.getValue("appId") as string}</p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "Approved"
          ? "text-green-600 font-semibold"
          : "text-red-500 font-semibold";
      return <p className={`text-center ${color}`}>{status}</p>;
    },
  },
  {
    accessorKey: "name",
    header: () => <p className="text-center">Name</p>,
    cell: ({ row }) => (
      <p className="text-center capitalize">{row.getValue("name") as string}</p>
    ),
  },
  {
    accessorKey: "tenure",
    header: () => <p className="text-center">Tenure</p>,
    cell: ({ row }) => <p className="text-center">{row.getValue("tenure") as number}</p>,
  },
  {
    accessorKey: "nbfcDisbursedAmount",
    header: () => <p className="text-center">NBFC Disbursed Amount</p>,
    cell: ({ row }) => {
      const value = row.getValue("nbfcDisbursedAmount") as number;
      return <p className="text-center">₹ {value.toLocaleString()}</p>;
    },
  },
  {
    accessorKey: "posAmount",
    header: () => <p className="text-center">POS Amount</p>,
    cell: ({ row }) => {
      const value = row.getValue("posAmount") as number;
      return <p className="text-center">₹ {value.toLocaleString()}</p>;
    },
  },

   {
    id: "actions",
    header: () => <p className="text-center">Actions</p>,
    cell: ({ row }) => {
      const navigate = useNavigate();
      const handleViewMore = () => {
        // optionally pass an ID if needed, e.g. /details/:id
        navigate("/history/loan-applications/details");
      };
      return (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewMore}
            className="text-blue-600 hover:bg-blue-50"
          >
            View More
          </Button>
        </div>
      );
    },
  },
];


export default function LoanApplicationsPage() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: loanApplications,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full px-6 py-4"> {/* ✅ added left & right padding */}
      <div className="bg-white shadow-sm rounded-lg mb-6 border border-[#D1E9FF]">
        <div className="flex items-center justify-between p-4 border-b-2 border-[#C3EEFF]">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#0A4DA2]"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-bold text-[#0A4DA2]">
              Loan Application List – {batchId}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Search…"
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

        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-sm font-bold">
                      {flexRender(
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
                  <TableRow key={row.id}>
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
                    No applications found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <PaginationComponent table={table} />
    </div>
  );
}

