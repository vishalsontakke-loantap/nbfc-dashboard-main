import React, { useRef, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpDown, Funnel, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

import CardHeader from "../CardHeader";
import CardHeadline from "../CardHeadline";
import { assetPath } from "@/lib/utils";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import {
  useUploadCollectionMutation,
  useGetCollectionBatchListQuery,
} from "@/redux/features/collection/collectionApi";

import { getSelectedNbfcId } from "@/redux/features/nbfc/nbfcSlice";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { EmptyContentState } from "../Error";

// ------------------ Form Schema ------------------
const formSchema = z.object({
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file.size <= 50 * 1024 * 1024, { message: "Max file size is 5MB" })
    .refine(
      (file) => {
        const allowedTypes = [
          "text/csv",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel.sheet.macroenabled.12",
        ];
        return allowedTypes.includes(file.type);
      },
      { message: "Only csv, xls, xlsx, xlsm files allowed" }
    )
    .optional(),
});

const CollectionFileUpload: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  });

  const [uploadCollection, { isLoading }] = useUploadCollectionMutation();
  const selectedNbfcId = useSelector(getSelectedNbfcId);
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  // Fetch batch list
 const {
  data,
  isLoading: isFetching,
  isError,
  refetch,
} = useGetCollectionBatchListQuery({
  page: currentPage,
  per_page: perPage,
});


  // ⬇ NEW — when NBFC changes, refetch instantly
useEffect(() => {
  if (selectedNbfcId) {
    setCurrentPage(1);
    refetch();
  }
}, [selectedNbfcId]);


  const batches = data?.data?.batches ?? [];
  const pagination =
    data?.data?.pagination ?? { current_page: 1, last_page: 1, total: batches.length, per_page: perPage };

  const totalItems = Number(pagination.total ?? 0);
  const totalPages = Math.max(1, Math.ceil((totalItems || 0) / (pagination.per_page || perPage)));

  useEffect(() => {
    if (pagination.current_page && pagination.current_page !== currentPage) {
      setCurrentPage(pagination.current_page);
    }
  }, [pagination.current_page]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    if (!data.file) return;
    try {
      await uploadCollection(data.file).unwrap();
      form.reset();
      // Clear the file input element
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      setIsModalOpen(false); // Close modal on success
      refetch(); // 🔄 Refresh table after upload
    } catch (err) {
      console.error("Upload failed", err);
      form.reset();
      // Clear the file input element even on error
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader title="Collection File Upload" subtitle="Upload your collection files here." />

      {/* Batch Table */}
      <div className="w-full">
        <div className="bg-white shadow-sm rounded-lg mb-6 border border-[#D1E9FF]">
          <div className="flex items-center justify-between p-4 border-b-2 border-[#C3EEFF]">
            <h2 className="text-lg font-bold text-[#0A4DA2]">Batch List</h2>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Collection File
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#0A4DA2]">Upload Collection File</DialogTitle>
                  <DialogDescription>
                    Download the sample format, upload your collection file, and map your columns.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-sm bg-white text-blue-600 border-blue-500 hover:bg-blue-50"
                        >
                          Export Sample File
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <img src={assetPath("/images/icons/file_open.svg")} alt="Upload" className="w-16 mb-4" />
                        <h3 className="font-semibold text-gray-700 mb-2">
                          Key Platform Fields & Expected Mapping Columns
                        </h3>
                        <p className="text-sm text-gray-500 text-center mb-6 max-w-md">
                          Upload your collection file in CSV, XLS, XLSX, or XLSM format.
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
                                  onChange={(e) => field.onChange(e.target.files?.[0])}
                                  className="hidden"
                                />
                                <div className="flex flex-col items-center gap-3">
                                  {field.value?.name ? (
                                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                                      <span className="text-sm text-blue-700 font-medium">{field.value.name}</span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          form.setValue("file", undefined);
                                          if (fileRef.current) fileRef.current.value = "";
                                        }}
                                        className="h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      >
                                        Remove
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button
                                      type="button"
                                      onClick={() => fileRef.current?.click()}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      Choose File
                                    </Button>
                                  )}
                                </div>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading || !form.watch("file")} className="bg-blue-600 hover:bg-blue-700">
                        {isLoading ? "Uploading..." : "Upload & Process"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  {[
                    "SL",
                    "Batch ID",
                    "Status",
                    // "PF Number",
                    "Entry Date",
                    "Total Principal",
                    "Total Interest",
                    "NBFC Principal",
                    "NBFC Interest",
                    "Actions",
                  ].map((h) => (
                    <TableHead key={h} className="text-sm font-bold text-left">
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-6">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : batches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="p-0">
                      <div className="flex justify-center py-8">
                        <EmptyContentState 
                          title="No Batches Found"
                          message="There are no collection batches available."
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  batches.map((b, idx) => (
                    <TableRow key={b.uuid}>
                      <TableCell className="text-left">
                        {(pagination.current_page - 1) * perPage + idx + 1}
                      </TableCell>

                      <TableCell className="text-left">{b.uuid}</TableCell>

                      <TableCell
                        className={`text-left ${
                          b.status === "Approved"
                            ? "text-green-600 font-semibold"
                            : b.status === "Rejected"
                            ? "text-red-500 font-semibold"
                            : ""
                        }`}
                      >
                        {b.status}
                      </TableCell>

                      {/* <TableCell className="text-left">{b.pf_number}</TableCell> */}
                      <TableCell className="text-left">{b.entry_date}</TableCell>
                      <TableCell className="text-left">{b.total_principal}</TableCell>
                      <TableCell className="text-left">{b.total_interest}</TableCell>
                      <TableCell className="text-left">{b.total_nbfc_principal}</TableCell>
                      <TableCell className="text-left">{b.total_nbfc_interest}</TableCell>

                      <TableCell className="text-left">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:bg-blue-50"
                          onClick={() => navigate(`/collection/${b.uuid}`)}
                        >
                          View More
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4 mb-4 items-center gap-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                  />
                </PaginationItem>

                {/* Page numbers */}
                {totalPages <= 7
                  ? Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i + 1);
                          }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))
                  : (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === 1}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                          }}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>

                      {currentPage > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {[currentPage - 1, currentPage, currentPage + 1]
                        .filter((p) => p > 1 && p < totalPages)
                        .map((p) => (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === p}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(p);
                              }}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                      {currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === totalPages}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(totalPages);
                          }}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionFileUpload;
