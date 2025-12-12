import { useRef } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";
import { assetPath } from "@/lib/utils";

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
import { ArrowLeft, ArrowUpDown, Funnel, ChevronDown } from "lucide-react";
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

const formSchema = z.object({
    file: z
        .instanceof(File, { message: "File is required" })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Max file size is 5MB",
        })
        .refine(
            (file) => {
                const allowedTypes = [
                    // "image/jpeg", // jpg, jpeg
                    // "image/png", // png
                    // "image/gif", // gif
                    // "application/pdf", // pdf
                    "text/csv", // csv
                    "application/vnd.ms-excel", // xls
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
                    "application/vnd.ms-excel.sheet.macroenabled.12", // xlsm
                ];
                return allowedTypes.includes(file.type);
            },
            {
                message:
                    "Only the following file types are accepted: csv, xls, xlsx, xlsm",
            }
        )
        .optional(),
});

const loanApplications = [
    { sl: 1, nbfcId: "MFL301326297", appId: "APP7097165262", status: "Rejected", total_collection: "1212121", bank_collection: 101249, nbfc_collection: 64344 },
    { sl: 2, nbfcId: "MFL710143367", appId: "APP8321270706", status: "Approved", total_collection: "3123131", bank_collection: 358023, nbfc_collection: 60492 },
    { sl: 3, nbfcId: "MFL196642848", appId: "APP4320467576", status: "Rejected", total_collection: "3423413", bank_collection: 459825, nbfc_collection: 233960 },
    { sl: 4, nbfcId: "MFL832109634", appId: "APP2228515797", status: "Rejected", total_collection: "1212121", bank_collection: 174579, nbfc_collection: 96060 },
    { sl: 5, nbfcId: "MFL922515283", appId: "APP3964930142", status: "Rejected", total_collection: "3423413", bank_collection: 214928, nbfc_collection: 137860 },
    { sl: 6, nbfcId: "MFL503518478", appId: "APP5098277352", status: "Approved", total_collection: "3123131", bank_collection: 151106, nbfc_collection: 113345 },
    { sl: 7, nbfcId: "MFL670557635", appId: "APP3866440685", status: "Rejected", total_collection: "3123131", bank_collection: 456589, nbfc_collection: 413285 },
    { sl: 8, nbfcId: "MFL556047868", appId: "APP6276205905", status: "Approved", total_collection: "3123131", bank_collection: 145772, nbfc_collection: 139776 },
    { sl: 9, nbfcId: "MFL457077200", appId: "APP7763890533", status: "Rejected", total_collection: "31231212", bank_collection: 217714, nbfc_collection: 42973 },
    { sl: 10, nbfcId: "MFL352719439", appId: "APP1939987780", status: "Approved", total_collection: "3123131", bank_collection: 396290, nbfc_collection: 101423 },
    { sl: 11, nbfcId: "MFL271876512", appId: "APP1928706543", status: "Rejected", total_collection: "3423413", bank_collection: 185432, nbfc_collection: 92560 },
    { sl: 12, nbfcId: "MFL812345678", appId: "APP3456712345", status: "Approved", total_collection: "1212121", bank_collection: 298765, nbfc_collection: 167890 },
    { sl: 13, nbfcId: "MFL134562789", appId: "APP9876534210", status: "Approved", total_collection: "3123131", bank_collection: 512340, nbfc_collection: 309876 },
    { sl: 14, nbfcId: "MFL456789123", appId: "APP5678912345", status: "Rejected", total_collection: "31231212", bank_collection: 128450, nbfc_collection: 65432 },
    { sl: 15, nbfcId: "MFL567891345", appId: "APP3456789123", status: "Approved", total_collection: "3423413", bank_collection: 398765, nbfc_collection: 201123 },
    { sl: 16, nbfcId: "MFL678912456", appId: "APP6789123456", status: "Approved", total_collection: "3123131", bank_collection: 267890, nbfc_collection: 124321 },
    { sl: 17, nbfcId: "MFL789123567", appId: "APP7891234567", status: "Rejected", total_collection: "1212121", bank_collection: 187654, nbfc_collection: 72345 },
    { sl: 18, nbfcId: "MFL891234678", appId: "APP8912345678", status: "Approved", total_collection: "31231212", bank_collection: 325678, nbfc_collection: 167890 },
    { sl: 19, nbfcId: "MFL912345789", appId: "APP9123456789", status: "Rejected", total_collection: "3423413", bank_collection: 142345, nbfc_collection: 80321 },
    { sl: 20, nbfcId: "MFL102345890", appId: "APP1023456789", status: "Approved", total_collection: "3123131", bank_collection: 512345, nbfc_collection: 271234 },
    { sl: 21, nbfcId: "MFL112345901", appId: "APP1123456789", status: "Rejected", total_collection: "1212121", bank_collection: 156780, nbfc_collection: 60345 },
    { sl: 22, nbfcId: "MFL122345912", appId: "APP1223456789", status: "Approved", total_collection: "3123131", bank_collection: 329876, nbfc_collection: 178934 },
    { sl: 23, nbfcId: "MFL132345923", appId: "APP1323456789", status: "Approved", total_collection: "3423413", bank_collection: 567890, nbfc_collection: 345678 },
    { sl: 24, nbfcId: "MFL142345934", appId: "APP1423456789", status: "Rejected", total_collection: "1212121", bank_collection: 125678, nbfc_collection: 60345 },
    { sl: 25, nbfcId: "MFL152345945", appId: "APP1523456789", status: "Approved", total_collection: "3123131", bank_collection: 278901, nbfc_collection: 120987 },
    { sl: 26, nbfcId: "MFL162345956", appId: "APP1623456789", status: "Rejected", total_collection: "3423413", bank_collection: 190876, nbfc_collection: 90432 },
    { sl: 27, nbfcId: "MFL172345967", appId: "APP1723456789", status: "Approved", total_collection: "3123131", bank_collection: 398765, nbfc_collection: 201123 },
    { sl: 28, nbfcId: "MFL182345978", appId: "APP1823456789", status: "Rejected", total_collection: "1212121", bank_collection: 142345, nbfc_collection: 65321 },
    { sl: 29, nbfcId: "MFL192345989", appId: "APP1923456789", status: "Approved", total_collection: "3123131", bank_collection: 398761, nbfc_collection: 195432 },
    { sl: 30, nbfcId: "MFL202345990", appId: "APP2023456789", status: "Rejected", total_collection: "31231212", bank_collection: 178654, nbfc_collection: 79345 },
    { sl: 31, nbfcId: "MFL212345001", appId: "APP2123456789", status: "Approved", total_collection: "3123131", bank_collection: 589012, nbfc_collection: 321456 },
    { sl: 32, nbfcId: "MFL222345012", appId: "APP2223456789", status: "Rejected", total_collection: "3423413", bank_collection: 190876, nbfc_collection: 95678 },
    { sl: 33, nbfcId: "MFL232345023", appId: "APP2323456789", status: "Approved", total_collection: "1212121", bank_collection: 265432, nbfc_collection: 132098 },
    { sl: 34, nbfcId: "MFL242345034", appId: "APP2423456789", status: "Rejected", total_collection: "31231212", bank_collection: 123456, nbfc_collection: 65432 },
    { sl: 35, nbfcId: "MFL252345045", appId: "APP2523456789", status: "Approved", total_collection: "3123131", bank_collection: 310987, nbfc_collection: 165432 },
    { sl: 36, nbfcId: "MFL262345056", appId: "APP2623456789", status: "Approved", total_collection: "3423413", bank_collection: 435678, nbfc_collection: 209876 },
    { sl: 37, nbfcId: "MFL272345067", appId: "APP2723456789", status: "Rejected", total_collection: "1212121", bank_collection: 156789, nbfc_collection: 73456 },
    { sl: 38, nbfcId: "MFL282345078", appId: "APP2823456789", status: "Approved", total_collection: "3123131", bank_collection: 298765, nbfc_collection: 167890 },
    { sl: 39, nbfcId: "MFL292345089", appId: "APP2923456789", status: "Rejected", total_collection: "3423413", bank_collection: 178654, nbfc_collection: 85321 },
    { sl: 40, nbfcId: "MFL302345090", appId: "APP3023456789", status: "Approved", total_collection: "31231212", bank_collection: 512345, nbfc_collection: 287654 },
    { sl: 41, nbfcId: "MFL312345101", appId: "APP3123456789", status: "Rejected", total_collection: "1212121", bank_collection: 167890, nbfc_collection: 65432 },
    { sl: 42, nbfcId: "MFL322345112", appId: "APP3223456789", status: "Approved", total_collection: "3123131", bank_collection: 345678, nbfc_collection: 187654 },
    { sl: 43, nbfcId: "MFL332345123", appId: "APP3323456789", status: "Approved", total_collection: "3423413", bank_collection: 567890, nbfc_collection: 321098 },
    { sl: 44, nbfcId: "MFL342345134", appId: "APP3423456789", status: "Rejected", total_collection: "31231212", bank_collection: 112345, nbfc_collection: 55432 },
    { sl: 45, nbfcId: "MFL352345145", appId: "APP3523456789", status: "Approved", total_collection: "3123131", bank_collection: 278901, nbfc_collection: 120987 },
    { sl: 46, nbfcId: "MFL362345156", appId: "APP3623456789", status: "Rejected", total_collection: "1212121", bank_collection: 198765, nbfc_collection: 98765 },
    { sl: 47, nbfcId: "MFL372345167", appId: "APP3723456789", status: "Approved", total_collection: "3123131", bank_collection: 423456, nbfc_collection: 210987 },
    { sl: 48, nbfcId: "MFL382345178", appId: "APP3823456789", status: "Rejected", total_collection: "3423413", bank_collection: 145678, nbfc_collection: 69876 },
    { sl: 49, nbfcId: "MFL392345189", appId: "APP3923456789", status: "Approved", total_collection: "3123131", bank_collection: 312345, nbfc_collection: 156789 },
    { sl: 50, nbfcId: "MFL402345190", appId: "APP4023456789", status: "Rejected", total_collection: "1212121", bank_collection: 176543, nbfc_collection: 78965 },
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
        accessorKey: "total_collection",
        header: () => <p className="text-center">Total Collection</p>,
        cell: ({ row }) => (
            <p className="text-center capitalize">₹ {row.getValue("total_collection") as string}</p>
        ),
    },
    {
        accessorKey: "bank_collection",
        header: () => <p className="text-center">Bank Collection</p>,
        cell: ({ row }) => <p className="text-center">₹ {row.getValue("bank_collection") as number}</p>,
    },
    {
        accessorKey: "nbfc_collection",
        header: () => <p className="text-center">NBFC Collection</p>,
        cell: ({ row }) => {
            const value = row.getValue("nbfc_collection") as number;
            return <p className="text-center">₹ {value.toLocaleString()}</p>;
        },
    },

    {
        id: "actions",
        header: () => <p className="text-center">Actions</p>,
        cell: ({ row }) => {
            const navigate = useNavigate();
            const handleViewMore = (id: string) => {
                // optionally pass an ID if needed, e.g. /details/:id
                navigate(`/collection/${id}`);
            };
            return (
                <div className="flex justify-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMore(row.getValue("appId") as string)}
                        className="text-blue-600 hover:bg-blue-50"
                    >
                        View More
                    </Button>
                </div>
            );
        },
    },
];

const CollectionFileUpload = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: undefined,
        },
    });

    const navigate = useNavigate();
    const [globalFilter, setGlobalFilter] = React.useState("");
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
        console.log("Disbursement File submitted with data:", data);
        navigate("/collection/12345");
    };

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
        <div className="flex flex-col space-y-4 p-5">
            <CardHeader
                title="Disbursement File Upload"
                subtitle="Upload your collection files here."
            />

            <Form {...form}>
                <form
                    id="nbfc-form"
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="bg-white shadow-sm rounded-lg p-4 space-y-3 space-x-4">
                        <div className="flex items-center justify-between">
                            <CardHeadline title="Upload Collection File" hr="no" />

                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-sm bg-white text-blue-600 border-blue-500 hover:bg-blue-50"
                            >
                                Export Sample File
                                <ChevronDown />
                            </Button>
                        </div>

                        <hr />

                        {/* Wrap all form components within the Form provider */}
                        <span className="flex flex-col items-center justify-center p-10">
                            <img
                                src={assetPath("/images/icons/file_open.svg")}
                                alt="Upload Collection File"
                                className="w-14"
                            />

                            <h3 className="font-semibold text-muted-foreground">
                                Key Platform Fields & Expected Mapping Columns
                            </h3>

                            <p className="text-xs text-muted-foreground text-center mt-2 mb-4 max-w-[85dvh]">
                                Download the sample format, upload your collection file, and
                                map your columns to our required fields.
                            </p>

                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => {
                                    const fileRef = useRef<HTMLInputElement | null>(null);

                                    return (
                                        <FormItem>
                                            {/* Hidden File Input */}
                                            <input
                                                type="file"
                                                accept=".csv, .xls, .xlsx, .xlsm"
                                                ref={(e) => {
                                                    fileRef.current = e;
                                                    field.ref(e);
                                                }}
                                                onChange={(e) => field.onChange(e.target.files?.[0])}
                                                className="hidden"
                                            />

                                            {/* Buttons Row */}
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    className={`rounded-sm bg-blue-500 hover:bg-blue-600 ${field.value?.name
                                                        ? "text-gray-200 bg-gray-500"
                                                        : "text-white"
                                                        }`}
                                                    disabled={!!field.value?.name}
                                                    onClick={() => fileRef.current?.click()}
                                                >
                                                    {field.value?.name ? "Uploaded" : "Upload"}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="ml-2 h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                                                        />
                                                    </svg>
                                                </Button>
                                            </div>

                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />


                        </span>
                    </div>
                    <span className="flex justify-end items-center space-x-2 mr-8">
                        <Button
                            className="text-lg p-5 rounded-sm bg-blue-500 hover:bg-blue-600 text-white"
                            type="submit"
                        >
                            Next
                        </Button>
                    </span>
                </form>
            </Form>

            <div className="w-full "> {/* ✅ added left & right padding */}
                <div className="bg-white shadow-sm rounded-lg mb-6 border border-[#D1E9FF]">
                    <div className="flex items-center justify-between p-4 border-b-2 border-[#C3EEFF]">
                        <div className="flex items-center gap-3">

                            <h2 className="text-lg font-bold text-[#0A4DA2]">
                                Batch List
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
        </div>
    );
};

export default CollectionFileUpload;
