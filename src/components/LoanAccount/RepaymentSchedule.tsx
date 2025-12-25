import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetLoanAccountRpsDetailsQuery } from "@/redux/features/loan/loanApi";
import { useParams } from "react-router-dom";
import { getSelectedNbfcId } from "@/redux/features/nbfc/nbfcSlice";
import { useSelector } from "react-redux";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { EmptyContentState } from "../Error";

interface RPSItem {
  installment_no: number;
  installment_date: string;
  installment_amount: number;
  installment_principal: number;
  installment_interest: number;
}

type RPSType = "total_rps" | "bank_rps" | "nbfc_rps";

export function RepaymentSchedule() {
  const { id } = useParams();
  const [selectedRPSType, setSelectedRPSType] = useState<RPSType>("total_rps");
  const selectedNbfcId = useSelector(getSelectedNbfcId);

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetLoanAccountRpsDetailsQuery({
    loan_id: id || "",
  });

  useEffect(() => {
    refetch();
  }, [selectedNbfcId, refetch]);


  const handleRPSTypeChange = (value: string) => {
    setSelectedRPSType(value as RPSType);
  };

  const selectedData: RPSItem[] = data?.data?.[selectedRPSType] || [];

  const totalPrincipal = selectedData.reduce((sum, item) => sum + item.installment_principal, 0);
  const totalInterest = selectedData.reduce((sum, item) => sum + item.installment_interest, 0);
  const totalRepayment = selectedData.reduce((sum, item) => sum + item.installment_amount, 0);

  if (isLoading || isFetching) {
    return (
      <div className="bg-[#c3eeff] min-h-screen">
        <div className="ml-4 mr-4 mt-4 mb-4">
          <div className="bg-white rounded-[12px] overflow-hidden border border-[#cad5e2]">
            <div className="bg-[#f8f9fa] border-b border-[#c3eeff] px-[40px] py-[16px]">
              <p className="font-['Poppins:Bold',sans-serif] text-[16px] text-[#62748e]">
                Repayment Schedule
              </p>
            </div>
            <div className="p-4">
              <SkeletonTable rows={10} columns={5} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.data || error) {
    return (
      <div className="bg-[#c3eeff] min-h-screen">
        <div className="ml-4 mr-4 mt-4 mb-4">
          <div className="bg-white rounded-[12px] overflow-hidden border border-[#cad5e2]">
            <div className="bg-[#f8f9fa] border-b border-[#c3eeff] px-[40px] py-[16px]">
              <p className="font-['Poppins:Bold',sans-serif] text-[16px] text-[#62748e]">
                Repayment Schedule
              </p>
            </div>
            <div className="flex flex-col items-center justify-center py-[80px] px-[40px]">
              <div className="w-[80px] h-[80px] mb-[24px] rounded-full bg-[#eaf2ff] flex items-center justify-center">
                <svg className="w-[40px] h-[40px] text-[#62748e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="font-['Poppins:Bold',sans-serif] text-[18px] text-[#1d2d3e] mb-[8px]">
                {error ? "Unable to Load Data" : "No Repayment Schedule"}
              </p>
              <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#62748e] text-center max-w-[400px]">
                {error 
                  ? "There was an error loading the repayment schedule. Please try again later." 
                  : "No repayment schedule data is available for this loan account at the moment."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#c3eeff] min-h-screen">

      {/* <ErrorState title="Repayment Schedule Unavailable" message="The repayment schedule data could not be loaded at this time. Please try again later." /> */}
      <div className="ml-4 mr-4 mt-4 mb-4">

        <CardHeader className="mb-3">
          <CardTitle>Repayment Schedule</CardTitle>
          <CardDescription>
           loan account repayment schedule details - {id}
          </CardDescription>
        </CardHeader>
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
            </div>
          </div>

          <div className="overflow-x-auto">
            {selectedData.length === 0 ? (
              <div className="flex justify-center py-12">
                <EmptyContentState 
                  title="No Repayment Schedule"
                  message="There is no repayment schedule data available for this selection."
                />
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
      </div>
    </div>
  );
}
