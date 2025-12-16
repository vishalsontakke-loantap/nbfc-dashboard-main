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
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaginationComponent from "@/components/PaginationComponent";
import { useNavigate } from "react-router-dom";

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

// Dummy full statement data (you already had)
const allStatementData = [ /* YOUR DATA ARRAY HERE */ ];

// 20% = first 70% of rows
const tab20Data = allStatementData.slice(0, Math.ceil(allStatementData.length * 0.70));

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
        cell: ({ row }) => <p className="text-center text-sm">{row.getValue("date")}</p>,
    },
    {
        accessorKey: "description",
        header: () => <p className="text-center font-bold">Description</p>,
        cell: ({ row }) => <p className="text-center text-sm">{row.getValue("description")}</p>,
    },
    {
        accessorKey: "debit",
        header: () => <p className="text-center font-bold">Debit (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("debit") as number;
            return <p className="text-center text-sm text-red-600">{value > 0 ? value.toLocaleString() : "-"}</p>;
        },
    },
    {
        accessorKey: "credit",
        header: () => <p className="text-center font-bold">Credit (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("credit") as number;
            return <p className="text-center text-sm text-green-600">{value > 0 ? value.toLocaleString() : "-"}</p>;
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

    const [activeTab, setActiveTab] = React.useState<"tab80" | "tab20" | "tab100">("tab80");

    const currentData =
        activeTab === "tab20" ? tab20Data :
        activeTab === "tab100" ? allStatementData :
        []; // tab80 uses PDF

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
            
            {/* Header */}
            <div className="mb-6 bg-white shadow-sm rounded-lg border border-[#D1E9FF]">
                <div className="flex items-center gap-3 p-4 border-b-2 border-[#C3EEFF]">
                    <Button variant="ghost" size="icon" className="text-[#0A4DA2]" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h2 className="text-lg font-bold text-[#0A4DA2]">Loan Statement</h2>
                </div>

                <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        <InfoCard title="Loan ID" value={loanAccountDetails.loanId} />
                        <InfoCard title="Borrower Name" value={loanAccountDetails.borrowerName} />
                        <InfoCard title="Loan Amount" value={`₹ ${loanAccountDetails.loanAmount.toLocaleString()}`} />
                        <InfoCard title="Status" value={loanAccountDetails.status} valueClass="text-green-600" />
                        <InfoCard title="Interest Rate" value={`${loanAccountDetails.interestRate}%`} />
                        <InfoCard title="Loan Term" value={`${loanAccountDetails.loanTerm} months`} />
                        <InfoCard title="O/S Principal" value={`₹ ${loanAccountDetails.principalOutstanding.toLocaleString()}`} valueClass="text-red-600" />
                        <InfoCard title="O/S Interest" value={`₹ ${loanAccountDetails.interestOutstanding.toLocaleString()}`} valueClass="text-red-600" />

                    </div>

                    <div className="mt-6">
                        <Button className="bg-[#0A4DA2] text-white flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Download Loan Statement
                        </Button>
                    </div>

                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white shadow-sm rounded-lg border border-[#D1E9FF]">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">

                    <div className="border-b border-gray-200">
                        <TabsList className="w-full flex bg-transparent p-0 h-auto rounded-none">
                            
                            <TabButton label="Loan Statement (80%) PDF" value="tab80" active={activeTab} />
                            <TabButton label="Loan Statement (20%)" value="tab20" active={activeTab} />
                            <TabButton label="Loan Statement (100%)" value="tab100" active={activeTab} />

                        </TabsList>
                    </div>

                    {/* PDF TAB */}
                    <TabsContent value="tab80" className="p-4">
                        <div className="w-full h-[750px] border rounded-lg overflow-hidden shadow-md">
                            <iframe
                                src="/loan-statement-80.pdf"
                                className="w-full h-full"
                                title="Loan Statement PDF"
                            />
                        </div>
                    </TabsContent>

                    {/* 20% TAB */}
                    <TabsContent value="tab20" className="p-4">
                        <StatementTable table={table} columns={columns} />
                        <div className="mt-4"><PaginationComponent table={table} /></div>
                    </TabsContent>

                    {/* 100% TAB */}
                    <TabsContent value="tab100" className="p-4">
                        <StatementTable table={table} columns={columns} />
                        <div className="mt-4"><PaginationComponent table={table} /></div>
                    </TabsContent>

                </Tabs>
            </div>

        </div>
    );
}

function InfoCard({ title, value, valueClass = "" }: any) {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
            <p className="text-xs text-gray-600 font-semibold uppercase">{title}</p>
            <p className={`text-lg font-bold mt-1 ${valueClass}`}>{value}</p>
        </div>
    );
}

function TabButton({ label, value, active }: any) {
    return (
        <TabsTrigger
            value={value}
            className={`flex-1 py-4 px-4 text-center font-semibold border-b-2 transition-all rounded-none ${
                active === value
                    ? "border-[#0A4DA2] text-[#0A4DA2]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
        >
            {label}
        </TabsTrigger>
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
                        <TableRow key={headerGroup.id} className="bg-gray-50">
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="text-sm font-bold py-3">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} className="border-b hover:bg-blue-50">
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center h-24 text-gray-500">
                                No statements found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
