import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetLoanAccountRpsDetailsQuery } from "@/redux/features/loan/loanApi";
import { useParams } from "react-router-dom";


// Types
interface RPSItem {
  installment_no: number;
  installment_date: string;
  installment_amount: number;
  installment_principal: number;
  installment_interest: number;
}

type RPSType = "total_rps" | "bank_rps" | "nbfc_rps";

// Main Repayment Schedule Component
export function RepaymentSchedule() {
  const { id } = useParams();
  const [selectedRPSType, setSelectedRPSType] = useState<RPSType>("total_rps");

  const {
    data,
    error,
    isLoading,
    isFetching,
  } = useGetLoanAccountRpsDetailsQuery({
    loan_id: id || "",
  });

  console.log("Repayment Schedule API Data:", data);

  const handleRPSTypeChange = (value: string) => {
    setSelectedRPSType(value as RPSType);
  };

  // Get the selected RPS data
  const selectedData: RPSItem[] = data?.data?.[selectedRPSType] || [];

  // Calculate totals
  const totalPrincipal = selectedData.reduce((sum, item) => sum + item.installment_principal, 0);
  const totalInterest = selectedData.reduce((sum, item) => sum + item.installment_interest, 0);
  const totalRepayment = selectedData.reduce((sum, item) => sum + item.installment_amount, 0);

  if (isLoading) {
    return (
      <div className="bg-[#c3eeff] min-h-screen flex items-center justify-center">
        <div className="text-[#62748e] text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#c3eeff] min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">Error loading repayment schedule</div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="bg-[#c3eeff] min-h-screen flex items-center justify-center">
        <div className="text-[#62748e] text-lg">No data available</div>
      </div>
    );
  }

  return (
    <div className="bg-[#c3eeff] min-h-screen">
      <div className="ml-4 mr-4 mt-4 mb-4">
        {/* Repayment Schedule Table */}
        <div className="bg-white rounded-[12px] overflow-hidden border border-[#cad5e2]">
          <div className="bg-[#f8f9fa] border-b border-[#c3eeff] px-[40px] py-[16px]">
            <div className="flex items-center gap-[16px]">
              <p className="font-['Poppins:Bold',sans-serif] text-[16px] text-[#62748e]">
                Repayment Schedule -
              </p>
              <div className="w-[200px]">
                <Select value={selectedRPSType} onValueChange={handleRPSTypeChange}>
                  <SelectTrigger className="bg-white border-[#cad5e2] h-[32px]">
                    <SelectValue placeholder="Select RPS Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="total_rps">Total RPS</SelectItem>
                    <SelectItem value="bank_rps">Bank RPS</SelectItem>
                    <SelectItem value="nbfc_rps">NBFC RPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isFetching && (
                <span className="text-[#62748e] text-sm">Loading...</span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            {selectedData.length === 0 ? (
              <div className="text-center py-[40px]">
                <p className="text-[#62748e]">No repayment schedule data available</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-white border-b border-[#c3eeff]">
                    <th className="px-[20px] py-[12px] text-left">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Installment No.</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-left">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Installment Date</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-right">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Principal Amount</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-right">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Interest Amount</p>
                    </th>
                    <th className="px-[20px] py-[12px] text-right">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">Total Amount</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedData.map((item, index) => (
                    <tr key={index} className="bg-white border-b border-[#c3eeff] hover:bg-[#f8f9fa] transition-colors">
                      <td className="px-[20px] py-[12px]">
                        <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">{item.installment_no}</p>
                      </td>
                      <td className="px-[20px] py-[12px]">
                        <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#1d2d3e]">
                          {new Date(item.installment_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </td>
                      <td className="px-[20px] py-[12px] text-right">
                        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                          ₹ {item.installment_principal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-[20px] py-[12px] text-right">
                        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                          ₹ {item.installment_interest.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </td>
                      <td className="px-[20px] py-[12px] text-right">
                        <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                          ₹ {item.installment_amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-[#eaf2ff] border-t-2 border-[#0089cf]">
                    <td className="px-[20px] py-[16px]" colSpan={2}>
                      <p className="font-['Poppins:Bold',sans-serif] text-[16px] text-[#1d2d3e]">Total</p>
                    </td>
                    <td className="px-[20px] py-[16px] text-right">
                      <p className="font-['Inter:Bold',sans-serif] text-[16px] text-[#0089cf]">
                        ₹ {totalPrincipal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </td>
                    <td className="px-[20px] py-[16px] text-right">
                      <p className="font-['Inter:Bold',sans-serif] text-[16px] text-[#0089cf]">
                        ₹ {totalInterest.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </td>
                    <td className="px-[20px] py-[16px] text-right">
                      <p className="font-['Inter:Bold',sans-serif] text-[16px] text-[#0089cf]">
                        ₹ {totalRepayment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex gap-[16px] mt-[24px] justify-end">
          <button className="bg-white border border-[#0089cf] rounded-[4px] px-[24px] py-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)]">
            <span className="font-['Manrope:SemiBold',sans-serif] text-[14px] text-[#0089cf]">Download Schedule</span>
          </button>
          <button className="bg-[#0089cf] rounded-[4px] px-[24px] py-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05)]">
            <span className="font-['Manrope:SemiBold',sans-serif] text-[14px] text-white">Print Schedule</span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
