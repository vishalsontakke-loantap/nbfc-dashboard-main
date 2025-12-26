import DateDisplay from "../DateDisplay";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { SkeletonTable } from "../ui/skeleton-table";
import { CollectionConfirmation } from "./CollectionConfrimation";
import { assetPath } from "@/lib/utils";
import { useParams } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui/pagination";

import {
    useGetCollectionBatchDetailsQuery,
    useGetCollectionListByBatchIdQuery,
} from "@/redux/features/collection/collectionApi";

import { getSelectedNbfcId } from "@/redux/features/nbfc/nbfcSlice";
import { useSelector } from "react-redux";
import { EmptyContentState, ErrorState } from "../Error";

const CollectionFileRundown = () => {
    const { batchId } = useParams<{ batchId: string }>();

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const selectedNbfcId = useSelector(getSelectedNbfcId);

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch:refetchCollectionData,
    } = useGetCollectionListByBatchIdQuery({
        batchId: batchId!,
        page: currentPage,
        per_page: perPage,
    });

    const {
        data: batchDetailsData,
        isLoading: isBatchDetailsLoading,
        isError: isBatchDetailsError,
        refetch: refetchBatchDetails,
    } = useGetCollectionBatchDetailsQuery(batchId! );

    console.log("Batch Details Data:", batchDetailsData);
    // 🔁 Refetch + reset page when NBFC changes
    useEffect(() => {
        setCurrentPage(1);
        refetchCollectionData();
        refetchBatchDetails();
    }, [selectedNbfcId]);

    const rows = data?.data?.batches ?? [];
    const pagination = data?.data?.pagination ?? {
        current_page: 1,
        per_page: perPage,
        total: 0,
        last_page: 1,
    };

    const totalPages = pagination.last_page;

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const showNoData =
        !isLoading &&
        !isFetching &&
        (isError || rows.length === 0);

    return (
        <div className="flex flex-col space-y-4 p-3">
            {/* HEADER */}
            <div className="flex flex-col bg-white shadow-sm rounded-lg p-5 space-y-3">
                <div className="flex items-center justify-between">
                    {/** DISBURSEMENT FILE NAME */}
                    <span className="flex space-x-2 text-sm text-[#62748E]">
                        <p className="font-bold">Pool Batch ID:</p>
                        <p>{batchId}</p>
                        <Badge variant={"outline"} className="text-xs font-semibold">
                            In Progress
                        </Badge>
                    </span>

                    {/** DISBURSEMENT FILE DATE AND USER*/}
                    <span className="flex items-center justify-center space-x-4">
                        {/* <span className="flex space-x-2 text-sm text-[#62748E]">
                            <img
                                src={assetPath("/images/icons/calendar_disbursement.svg")}
                                alt="calender"
                            />
                            <DateDisplay date={new Date().toISOString()} />
                        </span> */}
                        {/* <span className="flex space-x-2 text-sm text-[#62748E]">
                            <img src={assetPath("/images/icons/user_disbursement.svg")} alt="User" />
                            <p>User, U53R1D</p>
                        </span> */}
                    </span>
                </div>
                <div>

                    {/** DISBURSEMENT FILE RUNDOWN */}
                    <div className="text-[#62748E] flex justify-between bg-[#C3EEFF] min-h-[40px] min-w-full rounded-2xl p-3">
                        <span className="flex justify-between">
                            <p className="font-bold">Total Collection: </p>
                            <p>{batchDetailsData?.total_interest+batchDetailsData?.total_principal}</p>
                        </span>
                        <span className="flex justify-between">
                            <p className="font-bold">Total Principal: </p>
                            <p>{batchDetailsData?.total_principal}</p>
                        </span>
                        <span className="flex justify-between">
                            <p className="font-bold">Total Interest: </p>
                            <p>{batchDetailsData?.total_interest}</p>
                        </span>
                    </div>
                    <div className="text-[#62748E] flex justify-between bg-[#C3EEFF] min-h-[40px] min-w-full rounded-2xl p-3 mt-2">
                        <span className="flex justify-between">
                            <p className="font-bold">Bank Collection: </p>
                            <p>{batchDetailsData?.total_interest+batchDetailsData?.total_principal}</p>
                        </span>
                        <span className="flex justify-between">
                            <p className="font-bold">Bank Principal: </p>
                            <p>{batchDetailsData?.total_bank_principal}</p>
                        </span>
                        <span className="flex justify-between">
                            <p className="font-bold">Bank Interest: </p>
                            <p>{batchDetailsData?.total_bank_interest}</p>
                        </span>
                    </div>
                </div>
            </div>

            {/* ACTIONS */}
            {/* <div className="flex justify-end mr-5">
                <CollectionConfirmation />
            </div> */}

            {/* TABLE */}
            <div className="bg-white shadow-sm rounded-lg p-5">
                {isLoading || isFetching ? (
                    <SkeletonTable rows={5} columns={6} />
                ) : isError ? (
                    <ErrorState
                        title="Unable to Load Collection Data"
                        message="There was an error loading the collection batch data. Please try again later."
                        onRetry={refetchCollectionData}
                    />
                ) : rows.length === 0 ? (
                    <EmptyContentState
                        title="No Leads Found found for this Batch."
                        message="There are no collection leads available in this batch at the moment." 
                    />
                ) : (
                    <>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {[
                                        "SL",
                                        "Loan ID",
                                        "NBFC ID",
                                        "Bank Principal",
                                        "Bank Interest",
                                        "Status",
                                    ].map((h) => (
                                        <TableHead key={h} className="text-center font-bold">
                                            {h}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {rows.map((row: any, idx: number) => (
                                    <TableRow key={row.REQ_NUMBER}>
                                        <TableCell className="text-center">
                                            {(pagination.current_page - 1) * perPage + idx + 1}
                                        </TableCell>

                                        <TableCell className="text-center">{row.loan_id}</TableCell>
                                        <TableCell className="text-center">{row.nbfc_id}</TableCell>
                                        <TableCell className="text-center">{row.bank_principal}</TableCell>
                                        <TableCell className="text-center">{row.bank_interest}</TableCell>

                                        <TableCell
                                            className={`text-center font-semibold ${row.status === "Pending"
                                                    ? "text-yellow-600"
                                                    : row.status === "Failed"
                                                        ? "text-red-500"
                                                        : "text-green-600"
                                                }`}
                                        >
                                            {row.status}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* PAGINATION */}
                        <div className="flex justify-end mt-4 items-center gap-3">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .slice(
                                            Math.max(0, currentPage - 3),
                                            Math.min(totalPages, currentPage + 2)
                                        )
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

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={
                                                currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CollectionFileRundown;
