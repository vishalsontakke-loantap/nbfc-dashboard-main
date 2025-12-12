import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { assetPath } from "@/lib/utils";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllNbfcQuery } from "@/redux/features/nbfc/nbfcApi";
import { useDispatch } from "react-redux";
import { setSelectedNbfc } from "@/redux/features/nbfc/nbfcSlice";
import MultiSectionForm from "../ui/MultiSectionForm";
import { formSkeletons } from "@/lib/constants";
import { SkeletonTableShimmer } from "../ui/skeleton-table";

const pageSize = 5; // server page size (keep in sync with backend or pass dynamically)

const NbfcList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate();
    const { data, isLoading, error, isFetching } = useGetAllNbfcQuery({
        page: currentPage,
        pageSize,
    });

    const handleNavigate = (id: number | string) => {
        navigate(`/nbfc/details/${id}`)
    }

    // data expected shape: { data: [...items], meta: { total, page, per_page } }
    const items: any[] = Array.isArray(data?.data?.items) ? data!.data.items : [];
    const totalItems = Number(
        data?.meta?.total ?? data?.meta?.total_items ?? data?.total ?? items.length
    );
    const perPage = Number(data?.meta?.per_page ?? data?.meta?.perPage ?? pageSize);

    // compute total pages, ensure at least 1
    const totalPages = Math.max(1, Math.ceil((totalItems || 0) / (perPage || pageSize)));

    // Keep currentPage in sync with server meta.page (when server drives the page)
    useEffect(() => {
        const apiPage = Number(data?.meta?.page ?? data?.meta?.page_number ?? null);
        if (apiPage && !Number.isNaN(apiPage) && apiPage !== currentPage) {
            setCurrentPage(apiPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.meta?.page, data?.meta?.page_number]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        // The hook will re-run with new args and fetch the new page automatically.
    };

    if (isLoading) {
        return (
            <div className="flex flex-col space-y-4 p-5">
            <Card className=" mt-40">
                <CardContent>
                    <SkeletonTableShimmer rows={4} columns={3} />
                </CardContent>
            </Card>
            </div>  
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-6">
                <p className="text-red-600">Failed to load NBFCs.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-2xl font-semibold">List of Onboarded NBFC</h2>
                        <p className="text-gray-500 text-sm">
                            Effortlessly configure your cloud account for seamless, secure access anytime
                        </p>
                    </div>
                    <button className="bg-[#b3e0ff] hover:bg-[#90d4ff] text-[#0077c2] px-4 py-2 rounded font-medium">
                        Add New NBFC
                    </button>
                </div>

                <Card className="w-full p-2">
                    <CardContent>
                        {/* Filters */}
                        <div className="flex items-center justify-between mb-4 bg-gray-100 p-2 rounded">
                            <span className="text-sm text-sm">NBFC List</span>

                            <div className="flex items-center gap-4 ml-auto">
                                <input
                                    type="text"
                                    placeholder="Search NBFC"
                                    className="border rounded px-2 py-1 text-xs"
                                />

                                <div className="flex items-center gap-2">
                                    <button className="border px-2 py-1 rounded text-xs">
                                        <img src={assetPath("/images/list.svg")} alt="" />
                                    </button>
                                    <button className="border px-2 py-1 rounded text-xs">
                                        <img src={assetPath("/images/grid.svg")} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white">
                            <table className="w-full">
                                <tbody>
                                    {items.map((nbfc: any, idx: number) => (
                                        <tr key={nbfc.partner_id ?? nbfc.id ?? idx} className="border-b hover:bg-[#f6fbff]">
                                            <td className="p-2 flex items-center gap-3">
                                                <div className="font-medium flex items-center gap-2 text-xs text-semibold">
                                                    {nbfc.nbfc_name ?? nbfc.name}
                                                </div>
                                            </td>

                                            <td className="py-3 px-4">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs text-gray-400 mb-1">Contact Email</span>
                                                    <span className="text-sm text-semibold">{nbfc.contact_email ?? "-"}</span>
                                                </div>
                                            </td>

                                            <td className="py-3 px-4">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs text-gray-400 mb-1">Business limit</span>
                                                    <span className="text-sm text-semibold">
                                                        {nbfc.business_limit ?? nbfc.business ?? "-"}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="py-3 px-4">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs text-gray-400 mb-1">Active</span>
                                                    <span className="text-sm text-semibold">{nbfc.is_active ? "Yes" : "No"}</span>
                                                </div>
                                            </td>

                                            <td className="py-3 px-4 text-sm">
                                                <button
                                                    className="text-[#0077c2] hover:underline flex items-center gap-1 cursor-pointer"
                                                    onClick={() => handleNavigate(nbfc.partner_id)}
                                                >
                                                    View details <img src="" alt="" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {items.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-sm text-gray-500">
                                                No NBFCs found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end mt-4 mr-2 items-center gap-3">
                            <div className="text-xs text-gray-500">
                                {isFetching ? "Updating..." : `Showing page ${currentPage} of ${totalPages}`}
                            </div>

                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                                        />
                                    </PaginationItem>

                                    {totalPages <= 7 ? (
                                        [...Array(totalPages)].map((_, i) => (
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
                                    ) : (
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default NbfcList;
