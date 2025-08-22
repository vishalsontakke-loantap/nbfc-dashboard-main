import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const pageSize = 5; // number of rows per page

const nbfcData = [
  {
    name: "Muthoot Finance",
    new: true,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 2,
    business: 115,
    openIssues: 115,
    logo: "/images/Muthoot.png",
  },
  {
    name: "Capri Global Capital",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/capri.png",
  },
  {
    name: "Bajaj Finance Limited",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/bajaj.png",
  },
  {
    name: "Ugro Capital",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/ugro.png",
  },
  {
    name: "Google Cloud Organization",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/google.png",
  },
  {
    name: "AWS - Research",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/aws.png",
  },
  {
    name: "Azure Tenant",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/azure.png",
  },
  {
    name: "Alibaba - testing",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/alibaba.png",
  },
  {
    name: "Alibaba - testing",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/alibaba.png",
  },
  {
    name: "Alibaba - testing",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/alibaba.png",
  },
  {
    name: "Alibaba - testing",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/alibaba.png",
  },
  {
    name: "Alibaba - testing",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/alibaba.png",
  },
  {
    name: "Alibaba - testing",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/alibaba.png",
  },
  {
    name: "Alibaba - testing",
    new: false,
    cin: "CIN: 65910K1J97PG1C01300",
    loanProducts: 7,
    business: 115,
    openIssues: 115,
    logo: "/images/nbfc/alibaba.png",
  },
];

const NbfcList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<any[]>([]);
  const totalPages = Math.ceil(nbfcData.length / pageSize);

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
    <div className="bg-[#eaf6ff] min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
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
        <Card className="w-full">
          <CardContent>
            {/* Filters */}
            <div className="flex items-center justify-between mb-4 bg-gray-100 p-2 rounded">
              <span className="text-sm text-xs">NBFC List</span>

              <div className="flex items-center gap-4">
                <label className="flex items-left gap-2 text-xs">
                  <input
                    type="checkbox"
                    className="toggle-checkbox text-xs"
                  />
                  <span className="text-xs">Uncharted accounts</span>
                </label>
                <input
                  type="text"
                  placeholder="Search NBFC"
                  className="border rounded px-2 py-1 text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <button className="border px-2 py-1 rounded text-xs">
                  <img src="/images/list.svg" alt="" />
                </button>
                <button className="border px-2 py-1 rounded text-xs">
                  <img src="/images/grid.svg" alt="" />
                </button>
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
                        <a
                          href="#"
                          className="text-[#0077c2] hover:underline"
                        >
                          View details <img src="" alt="" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
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
