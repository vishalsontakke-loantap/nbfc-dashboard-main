import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Reusable SVG Components
function Calendar2Line() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="calendar-2-line">
          <path d={"jj"} fill="var(--fill-0, #62748E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}


// Badge Component
function Badge({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status) {
      case "Paid":
        return "bg-[rgba(34,197,94,0.12)] border-[rgba(22,163,74,0.36)] text-[#16a34a]";
      case "Pending":
        return "bg-[rgba(255,222,7,0.12)] border-[rgba(193,154,0,0.36)] text-[#e2e200]";
      case "Overdue":
        return "bg-[rgba(239,68,68,0.12)] border-[rgba(220,38,38,0.36)] text-[#dc2626]";
      default:
        return "bg-[rgba(255,222,7,0.12)] border-[rgba(193,154,0,0.36)] text-[#e2e200]";
    }
  };

  return (
    <div className={`relative rounded-[6px] px-[4px] py-[2px] ${getStatusColor()}`}>
      <div className="absolute border border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['DM_Sans:Medium',sans-serif] text-[8px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        {status}
      </p>
    </div>
  );
}

// Types
interface RepaymentScheduleItem {
  installment: number;
  dueDate: string;
  principal: number;
  interest: number;
  emi: number;
  outstanding: number;
  status: string;
}

interface NBFCBank {
  id: string;
  name: string;
}

interface RepaymentScheduleResponse {
  data: RepaymentScheduleItem[];
  totalPrincipal: number;
  totalInterest: number;
  totalRepayment: number;
  accountNo: string;
  poolBatchId: string;
  buyoutAmount: number;
  nbfcTenure: number;
  bankTenure: number;
  bankROI: number;
  createdAt: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalRecords: number;
  };
}

// Mock NBFC Banks
const nbfcBanks: NBFCBank[] = [
  { id: "1", name: "HDFC Bank" },
  { id: "2", name: "ICICI Bank" },
  { id: "3", name: "Axis Bank" },
  { id: "4", name: "Bank of Maharashtra" },
  { id: "5", name: "State Bank of India" },
  { id: "6", name: "Kotak Mahindra Bank" },
];

// Mock API call function
const fetchRepaymentSchedule = async (
  nbfcId: string, // Will be used when integrating actual API
  page: number,
  pageSize: number
): Promise<RepaymentScheduleResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Generate mock data based on nbfcId (currently using dummy data)
  console.log(`Fetching schedule for NBFC ID: ${nbfcId}, Page: ${page}`);
  
  const loanAmount = 2000000;
  const roi = 12.25 / 100 / 12;
  const tenure = 12;
  const emi = (loanAmount * roi * Math.pow(1 + roi, tenure)) / (Math.pow(1 + roi, tenure) - 1);

  let outstanding = loanAmount;
  const allSchedule: RepaymentScheduleItem[] = [];

  for (let i = 1; i <= tenure; i++) {
    const interest = outstanding * roi;
    const principal = emi - interest;
    outstanding -= principal;

    const dueDate = new Date(2024, 11, i);
    const status = i <= 3 ? "Paid" : i === 4 ? "Pending" : i === 5 ? "Overdue" : "Upcoming";

    allSchedule.push({
      installment: i,
      dueDate: dueDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      principal: principal,
      interest: interest,
      emi: emi,
      outstanding: Math.max(0, outstanding),
      status: status,
    });
  }

  // Pagination
  const totalRecords = allSchedule.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = allSchedule.slice(start, end);

  return {
    data: paginatedData,
    totalPrincipal: 2000000,
    totalInterest: allSchedule.reduce((sum, item) => sum + item.interest, 0),
    totalRepayment: allSchedule.reduce((sum, item) => sum + item.emi, 0),
    accountNo: "18798797898778",
    poolBatchId: "POL987868787",
    buyoutAmount: 2000000,
    nbfcTenure: 12,
    bankTenure: 9,
    bankROI: 12.25,
    createdAt: "02-12-2024, 02:54",
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      pageSize: pageSize,
      totalRecords: totalRecords,
    },
  };

  // TODO: Replace with actual API call
  // const response = await fetch(
  //   `${import.meta.env.VITE_API_BASE_URL}/repayment-schedule?nbfc_id=${nbfcId}&page=${page}&page_size=${pageSize}`,
  //   {
  //     credentials: "include",
  //   }
  // );
  // return await response.json();
};

// Main Repayment Schedule Component
export function RepaymentSchedule() {
  const [selectedNbfcId, setSelectedNbfcId] = useState<string>(nbfcBanks[0].id);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<RepaymentScheduleResponse | null>(null);

  // Fetch data when NBFC or page changes
  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      try {
        const data = await fetchRepaymentSchedule(selectedNbfcId, currentPage, pageSize);
        setScheduleData(data);
      } catch (error) {
        console.error("Error fetching repayment schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [selectedNbfcId, currentPage, pageSize]);

  const handleNbfcChange = (value: string) => {
    setSelectedNbfcId(value);
    setCurrentPage(1); // Reset to first page when changing NBFC
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!scheduleData) {
    return (
      <div className="bg-[#c3eeff] min-h-screen flex items-center justify-center">
        <div className="text-[#62748e] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#c3eeff] min-h-screen">
      <div className="ml-4 mr-4 mt-4 mb-4">
        {/* NBFC Bank Selection Dropdown */}
        <div className="bg-white rounded-[16px] p-[24px] mb-[24px] border border-[#cad5e2]">
          <div className="flex items-center gap-[16px]">
            <label className="font-['DM_Sans:Bold',sans-serif] text-[16px] text-[#62748e]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Select NBFC Bank:
            </label>
            <div className="w-[300px]">
              <Select value={selectedNbfcId} onValueChange={handleNbfcChange}>
                <SelectTrigger className="bg-white border-[#cad5e2]">
                  <SelectValue placeholder="Select NBFC Bank" />
                </SelectTrigger>
                <SelectContent>
                  {nbfcBanks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {loading && (
              <span className="text-[#62748e] text-sm">Loading...</span>
            )}
          </div>
        </div>

        {/* Account Info Card */}
        <div className="bg-white rounded-[16px] p-[40px] mb-[24px] border border-[#cad5e2]">
          <div className="flex items-center justify-between mb-[16px]">
            <div className="flex items-center gap-[8px]">
              <p className="font-['DM_Sans:Bold',sans-serif] text-[16px] text-[#62748e] w-[110px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Account No
              </p>
              <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] text-[#62748e] w-[131px]">
                {scheduleData.accountNo}
              </p>
              <Badge status="In Progress" />
            </div>

            <div className="flex items-center gap-[8px]">
              <p className="font-['DM_Sans:Bold',sans-serif] text-[16px] text-[#62748e]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Pool Batch ID:
              </p>
              <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] text-[#62748e]">
                {scheduleData.poolBatchId}
              </p>
            </div>

            <div className="flex items-center gap-[6px] px-[10px] py-[6px] rounded-[6px]">
              <Calendar2Line />
              <p className="font-['DM_Sans:Medium',sans-serif] text-[12px] text-[#62748e]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {scheduleData.createdAt}
              </p>
            </div>
          </div>

          <div className="bg-[#c3eeff] rounded-[10px] p-[16px]">
            <div className="grid grid-cols-4 gap-[20px] text-[#62748e]">
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[20px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Buyout Amount:
                </p>
                <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] mt-[8px]">
                  ₹ {scheduleData.buyoutAmount.toLocaleString("en-IN")}
                </p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[20px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  NBFC Tenure:
                </p>
                <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] mt-[8px]">
                  {scheduleData.nbfcTenure} Months
                </p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[20px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Bank Tenure:
                </p>
                <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] mt-[8px]">
                  {scheduleData.bankTenure} Months
                </p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[20px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Bank ROI:
                </p>
                <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] mt-[8px]">
                  {scheduleData.bankROI}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Repayment Schedule Table */}
        <div className="bg-white rounded-[12px] overflow-hidden border border-[#cad5e2]">
          <div className="bg-[#f8f9fa] border-b border-[#c3eeff] px-[40px] py-[16px]">
            <p className="font-['Poppins:Bold',sans-serif] text-[16px] text-[#62748e]">Repayment Schedule</p>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-[40px]">
                <p className="text-[#62748e]">Loading schedule...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b border-[#c3eeff]">
                    <th className="px-[20px] py-[12px] text-left">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Installment</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-left">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Due Date</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-right">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Principal Amount</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-right">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Interest Amount</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-right">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Total EMI</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-right">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Outstanding Balance</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-center">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Status</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.data.map((item, index) => (
                    <tr key={index} className="bg-white border-b border-[#c3eeff] hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-[20px] py-[12px]">
                        <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">{item.installment}</p>
                      </td>
                      <td className="px-[20px] py-[12px]">
                        <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#1d2d3e]">{item.dueDate}</p>
                      </td>
                      <td className="px-[20px] py-[12px] text-right">
                        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                          ₹ {item.principal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-[20px] py-[12px] text-right">
                        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                          ₹ {item.interest.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-[20px] py-[12px] text-right">
                        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                          ₹ {item.emi.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-[20px] py-[12px] text-right">
                        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                          ₹ {item.outstanding.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-[20px] py-[12px]">
                        <div className="flex justify-center">
                          <Badge status={item.status} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!loading && scheduleData.pagination.totalPages > 1 && (
            <div className="bg-[#f8f9fa] px-[40px] py-[16px] border-t border-[#c3eeff] flex items-center justify-between">
              <div className="text-[#62748e] text-sm">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, scheduleData.pagination.totalRecords)} of {scheduleData.pagination.totalRecords} entries
              </div>
              <div className="flex items-center gap-[8px]">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-[12px] py-[6px] rounded-[4px] border border-[#cad5e2] bg-white text-[#62748e] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8f9fa] transition-colors"
                >
                  Previous
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center gap-[4px]">
                  {Array.from({ length: scheduleData.pagination.totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and adjacent pages
                    if (
                      page === 1 ||
                      page === scheduleData.pagination.totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-[12px] py-[6px] rounded-[4px] border transition-colors ${
                            currentPage === page
                              ? "bg-[#0089cf] text-white border-[#0089cf]"
                              : "bg-white text-[#62748e] border-[#cad5e2] hover:bg-[#f8f9fa]"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-[8px] text-[#62748e]">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === scheduleData.pagination.totalPages}
                  className="px-[12px] py-[6px] rounded-[4px] border border-[#cad5e2] bg-white text-[#62748e] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8f9fa] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Summary Section */}
          <div className="bg-[#eaf2ff] px-[40px] py-[20px] border-t border-[#c3eeff]">
            <div className="grid grid-cols-3 gap-[40px]">
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#62748e] mb-[8px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Total Principal
                </p>
                <p className="font-['Inter:Bold',sans-serif] text-[20px] text-[#0089cf]">
                  ₹ {scheduleData.totalPrincipal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#62748e] mb-[8px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Total Interest
                </p>
                <p className="font-['Inter:Bold',sans-serif] text-[20px] text-[#0089cf]">
                  ₹ {scheduleData.totalInterest.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#62748e] mb-[8px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Total Repayment Amount
                </p>
                <p className="font-['Inter:Bold',sans-serif] text-[20px] text-[#0089cf]">
                  ₹ {scheduleData.totalRepayment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[16px] mt-[24px] justify-end">
          <button className="bg-white border border-[#0089cf] rounded-[4px] px-[24px] py-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)]">
            <span className="font-['Manrope:SemiBold',sans-serif] text-[14px] text-[#0089cf]">Download Schedule</span>
          </button>
          <button className="bg-[#0089cf] rounded-[4px] px-[24px] py-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)]">
            <span className="font-['Manrope:SemiBold',sans-serif] text-[14px] text-white">Print Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
}
