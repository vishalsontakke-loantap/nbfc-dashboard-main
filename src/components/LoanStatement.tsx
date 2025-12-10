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
import { ArrowLeft, ChevronDown, ChevronUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "@/components/PaginationComponent";

// Dummy Loan Account Details
const loanAccountDetails = {
    loanId: "LOAN-2024-001234",
    accountNumber: "ACC-789456123",
    borrowerName: "Rajesh Kumar",
    loanAmount: 500000,
    disbursedAmount: 500000,
    principalOutstanding: 450000,
    interestOutstanding: 12500,
    totalOutstanding: 462500,
    loanTerm: 36,
    loanType: "Personal Loan",
    interestRate: 9.5,
    startDate: "2023-01-15",
    endDate: "2026-01-15",
    status: "Active",
    nbfcName: "Omega Funds",
};

// Dummy Statement Data
const allStatementData = [
    { date: "2024-12-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 450000, osBalance: 462500 },
    { date: "2024-11-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 451250, osBalance: 460000 },
    { date: "2024-11-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 451250, osBalance: 463750 },
    { date: "2024-10-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 452500, osBalance: 461250 },
    { date: "2024-10-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 452500, osBalance: 465000 },
    { date: "2024-09-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 453750, osBalance: 462500 },
    { date: "2024-09-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 453750, osBalance: 466250 },
    { date: "2024-08-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 455000, osBalance: 463750 },
    { date: "2024-08-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 455000, osBalance: 467500 },
    { date: "2024-07-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 456250, osBalance: 465000 },
    { date: "2024-07-01", description: "Loan Disbursed", debit: 500000, credit: 0, osInterest: 0, osPrincipal: 500000, osBalance: 500000 },
    { date: "2024-12-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 450000, osBalance: 462500 },
    { date: "2024-11-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 451250, osBalance: 460000 },
    { date: "2024-11-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 451250, osBalance: 463750 },
    { date: "2024-10-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 452500, osBalance: 461250 },
    { date: "2024-10-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 452500, osBalance: 465000 },
    { date: "2024-09-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 453750, osBalance: 462500 },
    { date: "2024-09-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 453750, osBalance: 466250 },
    { date: "2024-08-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 455000, osBalance: 463750 },
    { date: "2024-08-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 455000, osBalance: 467500 },
    { date: "2024-07-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 456250, osBalance: 465000 },
    { date: "2024-07-01", description: "Loan Disbursed", debit: 500000, credit: 0, osInterest: 0, osPrincipal: 500000, osBalance: 500000 },
    { date: "2024-12-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 450000, osBalance: 462500 },
    { date: "2024-11-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 451250, osBalance: 460000 },
    { date: "2024-11-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 451250, osBalance: 463750 },
    { date: "2024-10-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 452500, osBalance: 461250 },
    { date: "2024-10-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 452500, osBalance: 465000 },
    { date: "2024-09-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 453750, osBalance: 462500 },
    { date: "2024-09-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 453750, osBalance: 466250 },
    { date: "2024-08-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 455000, osBalance: 463750 },
    { date: "2024-08-01", description: "Monthly Interest Accrual", debit: 0, credit: 3750, osInterest: 12500, osPrincipal: 455000, osBalance: 467500 },
    { date: "2024-07-15", description: "EMI Payment Received", debit: 15250, credit: 0, osInterest: 8750, osPrincipal: 456250, osBalance: 465000 },
    { date: "2024-07-01", description: "Loan Disbursed", debit: 500000, credit: 0, osInterest: 0, osPrincipal: 500000, osBalance: 500000 },
];

// Tab-specific data
const tab1Data = allStatementData.slice(0, Math.ceil(allStatementData.length * 0.70));
const tab2Data = allStatementData;
interface StatementRow {
    date: string;
    description: string;
    debit: number;
    credit: number;
    osInterest: number;
    osPrincipal: number;
    osBalance: number;
}

const columns: ColumnDef<StatementRow>[] = [
    {
        accessorKey: "date",
        header: () => <p className="text-center font-bold">Date</p>,
        cell: ({ row }) => <p className="text-center text-sm">{row.getValue("date") as string}</p>,
    },
    {
        accessorKey: "description",
        header: () => <p className="text-center font-bold">Description</p>,
        cell: ({ row }) => <p className="text-center text-sm">{row.getValue("description") as string}</p>,
    },
    {
        accessorKey: "debit",
        header: () => <p className="text-center font-bold">Debit (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("debit") as number;
            return <p className="text-center text-sm text-red-600 font-medium">{value > 0 ? value.toLocaleString() : "-"}</p>;
        },
    },
    {
        accessorKey: "credit",
        header: () => <p className="text-center font-bold">Credit (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("credit") as number;
            return <p className="text-center text-sm text-green-600 font-medium">{value > 0 ? value.toLocaleString() : "-"}</p>;
        },
    },
    {
        accessorKey: "osInterest",
        header: () => <p className="text-center font-bold">O/S Interest (₹)</p>,
        cell: ({ row }) => <p className="text-center text-sm">{(row.getValue("osInterest") as number).toLocaleString()}</p>,
    },
    {
        accessorKey: "osPrincipal",
        header: () => <p className="text-center font-bold">O/S Principal (₹)</p>,
        cell: ({ row }) => <p className="text-center text-sm">{(row.getValue("osPrincipal") as number).toLocaleString()}</p>,
    },
    {
        accessorKey: "osBalance",
        header: () => <p className="text-center font-bold">O/S Balance (₹)</p>,
        cell: ({ row }) => <p className="text-center text-sm font-semibold">{(row.getValue("osBalance") as number).toLocaleString()}</p>,
    },
];

export default function LoanStatement() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState<"tab1" | "tab2">("tab1");

    const currentData = activeTab === "tab1" ? tab1Data : tab2Data;

    const table = useReactTable({
        data: currentData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="w-full px-6 py-4">
            {/* Loan Account Details Card */}
            <div className="mb-6">
                <div className="bg-white shadow-sm rounded-lg border border-[#D1E9FF]">
                    <div className="flex items-center gap-3 p-4 border-b-2 border-[#C3EEFF]">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-[#0A4DA2]"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h2 className="text-lg font-bold text-[#0A4DA2]">Loan Statement</h2>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Loan ID */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                                <p className="text-xs text-gray-600 font-semibold uppercase">Loan ID</p>
                                <p className="text-lg font-bold text-[#0A4DA2] mt-1">{loanAccountDetails.loanId}</p>
                            </div>

                            {/* Borrower Name */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                                <p className="text-xs text-gray-600 font-semibold uppercase">Borrower Name</p>
                                <p className="text-lg font-bold text-[#0A4DA2] mt-1">{loanAccountDetails.borrowerName}</p>
                            </div>

                            {/* Loan Amount */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                                <p className="text-xs text-gray-600 font-semibold uppercase">Loan Amount</p>
                                <p className="text-lg font-bold text-[#0A4DA2] mt-1">₹ {loanAccountDetails.loanAmount.toLocaleString()}</p>
                            </div>

                            {/* Status */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                                <p className="text-xs text-gray-600 font-semibold uppercase">Status</p>
                                <p className="text-lg font-bold text-green-600 mt-1">{loanAccountDetails.status}</p>
                            </div>

                            {/* Interest Rate */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                                <p className="text-xs text-gray-600 font-semibold uppercase">Interest Rate</p>
                                <p className="text-lg font-bold text-[#0A4DA2] mt-1">{loanAccountDetails.interestRate}%</p>
                            </div>

                            {/* Loan Term */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                                <p className="text-xs text-gray-600 font-semibold uppercase">Loan Term</p>
                                <p className="text-lg font-bold text-[#0A4DA2] mt-1">{loanAccountDetails.loanTerm} months</p>
                            </div>

                            {/* Principal Outstanding */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                                <p className="text-xs text-gray-600 font-semibold uppercase">O/S Principal</p>
                                <p className="text-lg font-bold text-red-600 mt-1">₹ {loanAccountDetails.principalOutstanding.toLocaleString()}</p>
                            </div>

                            {/* Interest Outstanding */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                                <p className="text-xs text-gray-600 font-semibold uppercase">O/S Interest</p>
                                <p className="text-lg font-bold text-red-600 mt-1">₹ {loanAccountDetails.interestOutstanding.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Download Button */}
                        <div className="mt-6">
                            <Button
                                className="bg-[#0A4DA2] text-white hover:bg-[#0A4DA2]/90 flex items-center gap-2"
                                onClick={() => {
                                    // Placeholder for download functionality
                                    alert("Downloading loan statement...");
                                }}
                            >
                                <Download className="h-4 w-4" />
                                Download Loan Statement
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statement Tabs */}
            <div className="bg-white shadow-sm rounded-lg border border-[#D1E9FF]">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "tab1" | "tab2")} className="w-full">
                    <div className="border-b border-gray-200">
                        <TabsList className="w-full justify-start bg-transparent p-0 h-auto rounded-none">
                            <div className="flex w-full">
                                <TabsTrigger
                                    value="tab1"
                                    className={`flex-1 py-4 px-4 text-center font-semibold border-b-2 transition-all rounded-none ${activeTab === "tab1"
                                            ? "border-[#0A4DA2] text-[#0A4DA2]"
                                            : "border-transparent text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    Loan Statement (20%)
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tab2"
                                    className={`flex-1 py-4 px-4 text-center font-semibold border-b-2 transition-all rounded-none ${activeTab === "tab2"
                                            ? "border-[#0A4DA2] text-[#0A4DA2]"
                                            : "border-transparent text-gray-600 hover:text-gray-900"
                                        }`}
                                >
                                    Loan Statement (100%)
                                </TabsTrigger>
                            </div>
                        </TabsList>
                    </div>

                    <TabsContent value="tab1" className="p-4 mt-0">
                        <StatementTable table={table} columns={columns} />
                        <div className="mt-4">
                            <PaginationComponent table={table} />
                        </div>
                    </TabsContent>

                    <TabsContent value="tab2" className="p-4 mt-0">
                        <StatementTable table={table} columns={columns} />
                        <div className="mt-4">
                            <PaginationComponent table={table} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

interface StatementTableProps {
    table: ReturnType<typeof useReactTable>;
    columns: ColumnDef<StatementRow>[];
}

function StatementTable({ table, columns }: StatementTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-gray-50 border-b-2 border-gray-200">
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="text-sm font-bold py-3">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="border-b border-gray-100 hover:bg-blue-50">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                                No statements found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
