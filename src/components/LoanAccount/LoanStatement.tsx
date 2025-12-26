import * as React from "react";
import { useEffect } from "react";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaginationComponent from "@/components/PaginationComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLoanAccountStatementQuery } from "@/redux/features/loan/loanApi";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

interface StatementRow {
    date: string;
    description: string;
    debit: number;
    credit: number;
    osInterest: number;
    osPrincipal: number;
    osBalance: number;
}

interface ApiStatementItem {
    date: string;
    particulars: string;
    debit: string | number;
    credit: number;
    balance: string | number;
    interest_balance: number | string;
    principal_balance: string | number;
    type: string;
}

const columns: ColumnDef<StatementRow>[] = [
    {
        accessorKey: "date",
        header: () => <p className="text-center font-bold">Date</p>,
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"));
            return (
                <p className="text-center text-sm">
                    {date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </p>
            );
        },
    },
    {
        accessorKey: "description",
        header: () => <p className="text-center font-bold">Particulars</p>,
        cell: ({ row }) => <p className="text-center text-sm">{row.getValue("description")}</p>,
    },
    {
        accessorKey: "debit",
        header: () => <p className="text-center font-bold">Debit (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("debit") as number;
            return (
                <p className="text-center text-sm text-red-600">
                    {value > 0 ? `₹ ${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-"}
                </p>
            );
        },
    },
    {
        accessorKey: "credit",
        header: () => <p className="text-center font-bold">Credit (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("credit") as number;
            return (
                <p className="text-center text-sm text-green-600">
                    {value > 0 ? `₹ ${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-"}
                </p>
            );
        },
    },
    {
        accessorKey: "osInterest",
        header: () => <p className="text-center font-bold">O/S Interest (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("osInterest") as number;
            return (
                <p className="text-center text-sm">
                    ₹ {Math.abs(value).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            );
        },
    },
    {
        accessorKey: "osPrincipal",
        header: () => <p className="text-center font-bold">O/S Principal (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("osPrincipal") as number;
            return (
                <p className="text-center text-sm">
                    ₹ {Math.abs(value).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            );
        },
    },
    {
        accessorKey: "osBalance",
        header: () => <p className="text-center font-bold">O/S Balance (₹)</p>,
        cell: ({ row }) => {
            const value = row.getValue("osBalance") as number;
            return (
                <p className="text-center text-sm font-semibold">
                    ₹ {Math.abs(value).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            );
        },
    },
];

export default function LoanStatement() {
    const navigate = useNavigate();
    const {id} = useParams();

    const [activeTab, setActiveTab] = React.useState<"nbfc" | "bank" | "total">("nbfc");

    const {data: loanStatementResponse, error, isLoading, isFetching, refetch} = useGetLoanAccountStatementQuery({ 
        loan_id: id || "",
        statement_type: activeTab 
    });
    console.log("Loan Statement Data:", loanStatementResponse, error);

    useEffect(() => {
        refetch();
    }, [activeTab, refetch]);

    // Transform API data to table format
    const transformedData: StatementRow[] = React.useMemo(() => {
        if (!loanStatementResponse?.data) return [];
        
        return loanStatementResponse.data.map((item: ApiStatementItem) => ({
            date: item.date,
            description: item.particulars,
            debit: typeof item.debit === "string" ? parseFloat(item.debit) : item.debit,
            credit: item.credit,
            osInterest: typeof item.interest_balance === "string" ? parseFloat(item.interest_balance) : item.interest_balance,
            osPrincipal: typeof item.principal_balance === "string" ? parseFloat(item.principal_balance) : item.principal_balance,
            osBalance: typeof item.balance === "string" ? parseFloat(item.balance) : item.balance,
        }));
    }, [loanStatementResponse]);

    const table = useReactTable({
        data: transformedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    if (isLoading || isFetching) {
        return (
            <div className="w-full">
                <div className="bg-white shadow-sm border border-[#D1E9FF] p-4">
                    <SkeletonTable rows={10} columns={7} />
                </div>
            </div>
        );
    }


    return (
        <div className="w-full">

            {/* <CardHeader className="mb-3">
                <CardTitle>Account Statement</CardTitle>
                <CardDescription>
                    Loan Account - {id}
                </CardDescription>
            </CardHeader> */}

            {/* Statement Table */}
            <div className="bg-white shadow-sm rounded-lg border border-[#D1E9FF]">
                <div className="bg-[#f8f9fa] border-b border-[#c3eeff] px-[40px] py-[16px]">
                    <div className="flex items-center gap-[16px]">
                        <p className="font-['Poppins:Bold',sans-serif] text-[16px] text-[#62748e]">
                           Loan Account Statement
                        </p>
                        <div className="w-[250px]">
                            <Select value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
                                <SelectTrigger className="bg-white border-[#cad5e2] h-[32px]">
                                    <SelectValue placeholder="Select Statement Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nbfc">Loan Statement (NBFC)</SelectItem>
                                    <SelectItem value="bank">Loan Statement (Bank)</SelectItem>
                                    <SelectItem value="total">Loan Statement (Total)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    {/* PDF View */}
                    {activeTab === "nbfc" && (
                        <>
                            <StatementTable table={table} columns={columns} />
                            <div className="mt-4"><PaginationComponent table={table} /></div>
                        </>
                    )}

                    {/* 20% Statement */}
                    {activeTab === "bank" && (
                        <>
                            <StatementTable table={table} columns={columns} />
                            <div className="mt-4"><PaginationComponent table={table} /></div>
                        </>
                    )}

                    {/* 100% Statement */}
                    {activeTab === "total" && (
                        <>
                            <StatementTable table={table} columns={columns} />
                            <div className="mt-4"><PaginationComponent table={table} /></div>
                        </>
                    )}
                </div>
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
