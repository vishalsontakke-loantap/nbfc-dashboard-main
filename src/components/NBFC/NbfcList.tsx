import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

const pageSize = 5; // number of rows per page

const nbfcData = [
    {
        name: "Muthoot Finance",
        id: 1,
        new: true,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 2,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/Muthoot.png"),
    },
    {
        name: "Capri Global Capital",
        new: false,
        id: 2,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/capri.png"),
    },
    {
        name: "Bajaj Finance Limited",
        new: false,
        id: 3,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/bajaj.jpg"),
    },
    {
        name: "Ugro Capital",
        new: false,
        id: 4,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/ugro.jpg"),
    },
    {
        name: "Clix",
        new: false,
        id: 5,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/clix.jpg"),
    },
    {
        name: "AWS - Research",
        new: false,
        id: 6,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/aws.png"),
    },
    {
        name: "Azure Tenant",
        new: false,
        id: 7,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/azure.png"),
    },
    {
        name: "Alibaba - testing", 
        new: false,
        id: 8,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/alibaba.png"),
    },
    {
        name: "Alibaba - testing",
        new: false,
        id: 9,  
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/alibaba.png"),
    },
    {
        name: "Alibaba - testing",
        new: false,
        id: 10,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/alibaba.png"),
    },
    {
        name: "Alibaba - testing",
        new: false,
        id: 11,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/alibaba.png"),
    },
    {
        name: "Alibaba - testing",
        new: false,
        id: 12,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/alibaba.png"),
    },
    {
        name: "Alibaba - testing",
        new: false,
        id: 13,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/alibaba.png"),
    },
    {
        name: "Alibaba - testing",
        new: false,
        id: 14,
        cin: "CIN: 65910K1J97PG1C01300",
        loanProducts: 7,
        business: 115,
        openIssues: 115,
        logo: assetPath("/images/alibaba.png"),
    },
];

const NbfcList: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState<any[]>([]);
    const totalPages = Math.ceil(nbfcData.length / pageSize);
    const [uncharted, setUncharted] = useState(false);

    useEffect(() => {
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        setPaginatedData(nbfcData.slice(startIdx, endIdx));
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className=" min-h-screen p-6">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-2xl font-semibold">List of Onboarded NBFC</h2>
                        <p className="text-gray-500 text-sm">
                            Effortlessly configure your cloud account for seamless, secure
                            access anytime
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
                            {/* Left Title */}
                            <span className="text-sm text-xs">NBFC List</span>

                            {/* Right Section (toggle + search + icons) */}
                            <div className="flex items-center gap-4 ml-auto">
                                {/* Toggle */}
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className={`relative inline-flex h-4 w-7 rounded-full transition-colors focus:outline-none ${uncharted ? "bg-[#0077c2]" : "bg-gray-300"
                                            }`}
                                        onClick={() => setUncharted((prev) => !prev)}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${uncharted ? "translate-x-3" : "translate-x-0"
                                                }`}
                                        />
                                    </button>
                                    <span className="text-xs">Uncharted accounts</span>
                                </div>

                                {/* Search */}
                                <input
                                    type="text"
                                    placeholder="Search NBFC"
                                    className="border rounded px-2 py-1 text-xs"
                                />

                                {/* Icons */}
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
                                    {paginatedData.map((nbfc, idx) => (
                                        <tr key={idx} className="border-b hover:bg-[#f6fbff]">
                                            <td className="py-3 px-4 flex items-center gap-3">
                                                <img
                                                    src={nbfc.logo}
                                                    alt={nbfc.name}
                                                    className="w-8 h-8 rounded"
                                                />
                                                <div>
                                                    <div className="font-medium flex items-center gap-2 text-xs">
                                                        {nbfc.name}
                                                        {nbfc.new && (
                                                            <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {nbfc.cin}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs text-gray-400 mb-1">
                                                        Loan Product added
                                                    </span>
                                                    <span className="text-sm text-semibold">
                                                        {nbfc.loanProducts}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs text-gray-400 mb-1">
                                                        Business (In Cr)
                                                    </span>
                                                    <span className="text-sm text-semibold">
                                                        {nbfc.business}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs text-gray-400 mb-1">
                                                        Open Issues
                                                    </span>
                                                    <span className="text-sm text-semibold">
                                                        {nbfc.openIssues}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm">
                                               
                                                <Link
                                                    to={`/nbfc/details/${nbfc.id}`}
                                                    className="text-[#0077c2] hover:underline flex items-center gap-1"
                                                >
                                                    View details <img src="" alt="" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end mt-4 mr-2">
                            <Pagination>
                                <PaginationContent>
                                    {/* Previous */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={
                                                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                                            }
                                        />
                                    </PaginationItem>

                                    {/* Page Numbers with Ellipsis */}
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
                                            {/* Always show first page */}
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

                                            {/* Left Ellipsis */}
                                            {currentPage > 3 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}

                                            {/* Pages around current */}
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

                                            {/* Right Ellipsis */}
                                            {currentPage < totalPages - 2 && (
                                                <PaginationItem>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            )}

                                            {/* Always show last page */}
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

                                    {/* Next */}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={
                                                currentPage === totalPages
                                                    ? "opacity-50 pointer-events-none"
                                                    : ""
                                            }
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
