import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { flexRender, ColumnDef, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { ChevronDown, ArrowUpDown, Funnel } from "lucide-react";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";
import PaginationComponent from "@/components/PaginationComponent";
import { assetPath } from "@/lib/utils";

// import { useUploadCollectionMutation } from "@/redux/services/collectionApi";
import { getSelectedNbfcId } from "@/redux/features/nbfc/nbfcSlice";
import { useUploadCollectionMutation } from "@/redux/features/collection/collectionApi";

// ------------------ Form Schema ------------------
const formSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size <= 50 * 1024 * 1024, { message: "Max file size is 5MB" })
    .refine((file) => {
      const allowedTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel.sheet.macroenabled.12",
      ];
      return allowedTypes.includes(file.type);
    }, { message: "Only csv, xls, xlsx, xlsm files allowed" })
    .optional(),
});

// ------------------ Sample Table Data ------------------
const loanApplications = [
  { sl: 1, nbfcId: "MFL301326297", appId: "APP7097165262", status: "Rejected", name: "Gamma Loans", tenure: 18, nbfcDisbursedAmount: 101249, posAmount: 64344 },
  { sl: 2, nbfcId: "MFL710143367", appId: "APP8321270706", status: "Approved", name: "Omega Funds", tenure: 18, nbfcDisbursedAmount: 358023, posAmount: 60492 },
  // ... add the rest of your 50 rows as before
];

// ------------------ Table Columns ------------------
export const columns: ColumnDef<typeof loanApplications[number]>[] = [
  { accessorKey: "sl", header: () => <p className="text-center">SL</p>, cell: ({ row }) => <p className="text-center font-bold">{row.getValue("sl")}</p> },
  { accessorKey: "nbfcId", header: () => <p className="text-center">NBFC ID</p>, cell: ({ row }) => <p className="text-center uppercase">{row.getValue("nbfcId")}</p> },
  { accessorKey: "appId", header: () => <p className="text-center">App ID</p>, cell: ({ row }) => <p className="text-center uppercase">{row.getValue("appId")}</p> },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status</p>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color = status === "Approved" ? "text-green-600 font-semibold" : "text-red-500 font-semibold";
      return <p className={`text-center ${color}`}>{status}</p>;
    },
  },
  { accessorKey: "name", header: () => <p className="text-center">Name</p>, cell: ({ row }) => <p className="text-center capitalize">{row.getValue("name")}</p> },
  { accessorKey: "tenure", header: () => <p className="text-center">Tenure</p>, cell: ({ row }) => <p className="text-center">{row.getValue("tenure")}</p> },
  {
    accessorKey: "nbfcDisbursedAmount",
    header: () => <p className="text-center">NBFC Disbursed Amount</p>,
    cell: ({ row }) => <p className="text-center">₹ {row.getValue("nbfcDisbursedAmount").toLocaleString()}</p>,
  },
  {
    accessorKey: "posAmount",
    header: () => <p className="text-center">POS Amount</p>,
    cell: ({ row }) => <p className="text-center">₹ {row.getValue("posAmount").toLocaleString()}</p>,
  },
  {
    id: "actions",
    header: () => <p className="text-center">Actions</p>,
    cell: ({ row }) => {
      const navigate = useNavigate();
      const handleViewMore = (id: string) => navigate(`/collection/${id}`);
      return (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={() => handleViewMore(row.getValue("appId"))} className="text-blue-600 hover:bg-blue-50">
            View More
          </Button>
        </div>
      );
    },
  },
];

// ------------------ Component ------------------
const CollectionFileUpload: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  });

  const [uploadCollection, { isLoading }] = useUploadCollectionMutation();
  const selectedNbfcId = useSelector(getSelectedNbfcId);
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = React.useState("");

 const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
  if (!data.file) return;

  try {
    await uploadCollection(data.file).unwrap();
    console.log("Upload successful!");
    form.reset();          
  } catch (err) {
    console.error("Upload failed", err);
    form.reset();            
  }
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
      <CardHeader title="Disbursement File Upload" subtitle="Upload your collection files here." />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-white shadow-sm rounded-lg p-4 space-y-3 space-x-4">
            <div className="flex items-center justify-between">
              <CardHeadline title="Upload Collection File" hr="no" />
              <Button type="button" variant="outline" className="rounded-sm bg-white text-blue-600 border-blue-500 hover:bg-blue-50">
                Export Sample File
                <ChevronDown />
              </Button>
            </div>

            <hr />

            <span className="flex flex-col items-center justify-center p-10">
              <img src={assetPath("/images/icons/file_open.svg")} alt="Upload Collection File" className="w-14" />
              <h3 className="font-semibold text-muted-foreground">Key Platform Fields & Expected Mapping Columns</h3>
              <p className="text-xs text-muted-foreground text-center mt-2 mb-4 max-w-[85dvh]">
                Download the sample format, upload your collection file, and map your columns to our required fields.
              </p>

              <FormField
  control={form.control}
  name="file"
  render={({ field }) => {
    const fileRef = useRef<HTMLInputElement | null>(null);

    return (
      <FormItem>
        <input
          type="file"
          accept=".csv,.xls,.xlsx,.xlsm"
          ref={(e) => {
            fileRef.current = e;
            field.ref(e);
          }}
          onChange={(e) => {
            field.onChange(e.target.files?.[0]);
          }}
          className="hidden"
        />

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={!!field.value?.name}
          >
            {field.value?.name ? "Uploaded" : "Upload"}
          </Button>

          {field.value?.name && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.setValue("file", undefined);
                if (fileRef.current) fileRef.current.value = "";
              }}
            >
              Clear
            </Button>
          )}
        </div>

        <FormMessage />
      </FormItem>
    );
  }}
/>

            </span>
          </div>

          <span className="flex justify-end items-center space-x-2 mr-8">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Next"}
            </Button>
          </span>
        </form>
      </Form>

      {/* Table Section */}
      <div className="w-full">
        <div className="bg-white shadow-sm rounded-lg mb-6 border border-[#D1E9FF]">
          <div className="flex items-center justify-between p-4 border-b-2 border-[#C3EEFF]">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-[#0A4DA2]">Batch List</h2>
            </div>

            <div className="flex items-center gap-2">
              <Input
                placeholder="Search…"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="bg-[#C3EEFF] border border-[#BBDFFF] text-sm w-[240px] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="outline" className="text-[#0A4DA2] border-none p-0 hover:text-[#0A4DA2]/80 hover:bg-white">
                <ArrowUpDown />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-[#0A4DA2] border-none p-0 hover:text-[#0A4DA2]/80 hover:bg-white">
                    <Funnel />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table.getAllColumns().filter((col) => col.getCanHide()).map((column) => (
                    <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(val) => column.toggleVisibility(!!val)}>
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
                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
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
