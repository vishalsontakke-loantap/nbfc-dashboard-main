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
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/PaginationComponent";
import { useParams } from "react-router-dom";
import { useGetLoanAccountStatementQuery } from "@/redux/features/loan/loanApi";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { EmptyContentState, ErrorState } from "../Error";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { assetPath } from "@/lib/utils";

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

export default function LoanStatement(customer_name_prop: any) {
    const { id } = useParams();

    const [activeTab, setActiveTab] = React.useState<"nbfc" | "bank" | "total">("nbfc");

    const { data: loanStatementResponse, error, isLoading, isFetching, refetch } = useGetLoanAccountStatementQuery({
        loan_id: id || "",
        statement_type: activeTab
    });
    console.log("Loan Statement Data:", loanStatementResponse, error);
    
    // Extract customer name from API response
    const customer_name = customer_name_prop.customer_name_prop || "N/A";

    console.log("Customer Name for Statement:", customer_name);

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

    const handleDownloadPDF = () => {
        const doc = new jsPDF('landscape'); // Use landscape for better column spacing
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Prepare table data - use ALL data from API, not just paginated view
        const tableData = transformedData.map(row => [
            new Date(row.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
            row.description,
            row.debit > 0 ? row.debit.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-',
            row.credit > 0 ? row.credit.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-',
            Math.abs(row.osInterest).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Math.abs(row.osPrincipal).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            Math.abs(row.osBalance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        ]);

        console.log('Total rows for PDF:', tableData.length); // Debug log

        // Add Bank of Maharashtra logo in the center
        const logoImg = new Image();
        logoImg.src = assetPath('/images/bom_logo.png');
        
        logoImg.onload = () => {
            const logoWidth = 45;
            const logoHeight = 17;
            const logoX = (pageWidth - logoWidth) / 2;
            doc.addImage(logoImg, 'PNG', logoX, 10, logoWidth, logoHeight);

            // Add title
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            const title = `Loan Account Statement (${activeTab.toUpperCase()})`;
            doc.text(title, pageWidth / 2, 35, { align: 'center' });

            // Add loan ID
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`Customer Name: ${customer_name}`, pageWidth / 2, 43, { align: 'center' });
            doc.text(`Loan Account Number: ${id}`, pageWidth / 2, 50, { align: 'center' });

            // Add date
            const today = new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            doc.setFontSize(10);
            doc.text(`Generated on: ${today}`, pageWidth / 2, 75, { align: 'center' });

            // Generate table with ALL data and proper multi-page support
            autoTable(doc, {
                startY: 80,
                head: [['Date', 'Particulars', 'Debit (Rs.)', 'Credit (Rs.)', 'O/S Interest (Rs.)', 'O/S Principal (Rs.)', 'O/S Balance (Rs.)']],
                body: tableData,
                theme: 'grid',
                headStyles: {
                    fillColor: [27, 78, 155],
                    textColor: 255,
                    fontSize: 10,
                    fontStyle: 'bold',
                    halign: 'center',
                    valign: 'middle'
                },
                bodyStyles: {
                    fontSize: 9,
                    halign: 'center',
                    valign: 'middle'
                },
                alternateRowStyles: {
                    fillColor: [245, 247, 250]
                },
                columnStyles: {
                    0: { cellWidth: 30, halign: 'center' },  // Date
                    1: { cellWidth: 50, halign: 'left' },    // Particulars
                    2: { cellWidth: 35, halign: 'right' },   // Debit
                    3: { cellWidth: 35, halign: 'right' },   // Credit
                    4: { cellWidth: 40, halign: 'right' },   // O/S Interest
                    5: { cellWidth: 40, halign: 'right' },   // O/S Principal
                    6: { cellWidth: 40, halign: 'right' }    // O/S Balance
                },
                margin: { top: 56, left: 14, right: 14, bottom: 20 },
                styles: {
                    cellPadding: 3,
                    overflow: 'linebreak',
                    lineColor: [200, 200, 200],
                    lineWidth: 0.1
                },
                // Enable page break handling
                showHead: 'everyPage',
                // Add page numbers and headers on each page
                didDrawPage: function (data) {
                    // Footer with page number
                    doc.setFontSize(9);
                    doc.setTextColor(100);
                    const str = 'Page ' + doc.getCurrentPageInfo().pageNumber;
                    doc.text(str, pageWidth - 20, pageHeight - 10, { align: 'right' });

                    // Add header on subsequent pages
                    if (doc.getCurrentPageInfo().pageNumber > 1) {
                        doc.setFontSize(11);
                        doc.setTextColor(0);
                        doc.setFont('helvetica', 'bold');
                        doc.text('Bank of Maharashtra - Loan Statement', 14, 10);
                        doc.setFontSize(9);
                        doc.setFont('helvetica', 'normal');
                        doc.text(`Loan Account: ${id}`, 14, 16);
                    }
                }
            });

            // Save the PDF
            doc.save(`Loan_Statement_${id}_${activeTab}_${new Date().getTime()}.pdf`);
        };

        logoImg.onerror = () => {
            // If logo fails to load, generate PDF without logo
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Bank of Maharashtra', pageWidth / 2, 15, { align: 'center' });
            const title = `Loan Account Statement (${activeTab.toUpperCase()})`;
            doc.text(title, pageWidth / 2, 25, { align: 'center' });

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`Loan Account Number: ${id}`, pageWidth / 2, 33, { align: 'center' });

            const today = new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            doc.setFontSize(10);
            doc.text(`Generated on: ${today}`, pageWidth / 2, 39, { align: 'center' });

            // Generate table with ALL data and proper multi-page support
            autoTable(doc, {
                startY: 46,
                head: [['Date', 'Particulars', 'Debit (Rs.)', 'Credit (Rs.)', 'O/S Interest (Rs.)', 'O/S Principal (Rs.)', 'O/S Balance (Rs.)']],
                body: tableData,
                theme: 'grid',
                headStyles: {
                    fillColor: [27, 78, 155],
                    textColor: 255,
                    fontSize: 10,
                    fontStyle: 'bold',
                    halign: 'center',
                    valign: 'middle'
                },
                bodyStyles: {
                    fontSize: 9,
                    halign: 'center',
                    valign: 'middle'
                },
                alternateRowStyles: {
                    fillColor: [245, 247, 250]
                },
                columnStyles: {
                    0: { cellWidth: 30, halign: 'center' },  // Date
                    1: { cellWidth: 50, halign: 'left' },    // Particulars
                    2: { cellWidth: 35, halign: 'right' },   // Debit
                    3: { cellWidth: 35, halign: 'right' },   // Credit
                    4: { cellWidth: 40, halign: 'right' },   // O/S Interest
                    5: { cellWidth: 40, halign: 'right' },   // O/S Principal
                    6: { cellWidth: 40, halign: 'right' }    // O/S Balance
                },
                margin: { top: 46, left: 14, right: 14, bottom: 20 },
                styles: {
                    cellPadding: 3,
                    overflow: 'linebreak',
                    lineColor: [200, 200, 200],
                    lineWidth: 0.1
                },
                // Enable page break handling
                showHead: 'everyPage',
                // Add page numbers and headers on each page
                didDrawPage: function (data) {
                    // Footer with page number
                    doc.setFontSize(9);
                    doc.setTextColor(100);
                    const str = 'Page ' + doc.getCurrentPageInfo().pageNumber;
                    doc.text(str, pageWidth - 20, pageHeight - 10, { align: 'right' });

                    // Add header on subsequent pages
                    if (doc.getCurrentPageInfo().pageNumber > 1) {
                        doc.setFontSize(11);
                        doc.setTextColor(0);
                        doc.setFont('helvetica', 'bold');
                        doc.text('Bank of Maharashtra - Loan Statement', 14, 10);
                        doc.setFontSize(9);
                        doc.setFont('helvetica', 'normal');
                        doc.text(`Loan Account: ${id}`, 14, 16);
                    }
                }
            });

            doc.save(`Loan_Statement_${id}_${activeTab}_${new Date().getTime()}.pdf`);
        };
    };

    if (isLoading || isFetching) {
        return (
            <div className="w-full">
                <div className="bg-white shadow-sm border border-[#D1E9FF] p-4">
                    <SkeletonTable rows={10} columns={7} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full px-6 py-4 flex justify-center items-center min-h-[400px]">
                <ErrorState
                    title="Unable to Load Statement"
                    message="There was an error loading the loan statement. Please try again later."
                    onRetry={refetch}
                />
            </div>
        );
    }

    if (!transformedData.length) {
        return (
            <div className="w-full px-6 py-4 flex justify-center items-center min-h-[400px]">
                <EmptyContentState
                    title="No Statement Data"
                    message="There are no statement records available for this loan account."
                />
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
                    <div className="flex items-center justify-between gap-[16px]">
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
                        <Button 
                            onClick={handleDownloadPDF}
                            className="bg-[#1B4E9B] hover:bg-[#00ADEF] text-white h-[32px] px-4 flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download Statement
                        </Button>
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
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="border-b hover:bg-blue-50">
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="py-3">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
