// import svgPaths from "../imports/svg-k43ogmi58w";
// import imgBankOfMaharashtraLogo2 from "figma:asset/f228d079ea5a13da48a1ebe033bc7002958bdab9.png";

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

// Mock repayment schedule data
const generateRepaymentSchedule = () => {
  const loanAmount = 2000000;
  const roi = 12.25 / 100 / 12; // Monthly interest rate
  const tenure = 12; // months
  const emi = (loanAmount * roi * Math.pow(1 + roi, tenure)) / (Math.pow(1 + roi, tenure) - 1);
  
  let outstanding = loanAmount;
  const schedule = [];
  
  for (let i = 1; i <= tenure; i++) {
    const interest = outstanding * roi;
    const principal = emi - interest;
    outstanding -= principal;
    
    const dueDate = new Date(2024, 11, i); // Starting from Dec 2024
    const status = i <= 3 ? "Paid" : i === 4 ? "Pending" : i === 5 ? "Overdue" : "Upcoming";
    
    schedule.push({
      installment: i,
      dueDate: dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      principal: principal,
      interest: interest,
      emi: emi,
      outstanding: Math.max(0, outstanding),
      status: status,
    });
  }
  
  return schedule;
};

// Main Repayment Schedule Component
export function RepaymentSchedule() {
  const schedule = generateRepaymentSchedule();

  return (
    <div className="bg-[#c3eeff] min-h-screen">

      <div className="ml-4 mr-4 mt-4 mb-4">
        {/* Account Info Card */}
        <div className="bg-white rounded-[16px] p-[40px] mb-[24px] border border-[#cad5e2]">
          <div className="flex items-center justify-between mb-[16px]">
            <div className="flex items-center gap-[8px]">
              <p className="font-['DM_Sans:Bold',sans-serif] text-[16px] text-[#62748e] w-[110px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Account No
              </p>
              <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] text-[#62748e] w-[131px]">18798797898778</p>
              <Badge status="In Progress" />
            </div>

            <div className="flex items-center gap-[8px]">
              <p className="font-['DM_Sans:Bold',sans-serif] text-[16px] text-[#62748e]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Pool Batch ID:
              </p>
              <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] text-[#62748e]">POL987868787</p>
            </div>

            <div className="flex items-center gap-[6px] px-[10px] py-[6px] rounded-[6px]">
              <Calendar2Line />
              <p className="font-['DM_Sans:Medium',sans-serif] text-[12px] text-[#62748e]" style={{ fontVariationSettings: "'opsz' 14" }}>
                02-12-2024, 02:54
              </p>
            </div>
          </div>

          <div className="bg-[#c3eeff] rounded-[10px] p-[16px]">
            <div className="grid grid-cols-4 gap-[20px] text-[#62748e]">
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[20px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Buyout Amount:
                </p>
                <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] mt-[8px]">₹ 20,00,000</p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[20px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  NBFC Tenure:
                </p>
                <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] mt-[8px]">12 Months</p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[20px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Bank Tenure:
                </p>
                <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] mt-[8px]">9 Months</p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[20px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Bank ROI:
                </p>
                <p className="font-['DM_Sans:9pt_Regular',sans-serif] text-[16px] mt-[8px]">12.25%</p>
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
                {schedule.map((item, index) => (
                  <tr key={index} className="bg-white border-b border-[#c3eeff] hover:bg-[#f8f9fa] transition-colors">
                    <td className="px-[20px] py-[12px]">
                      <p className="font-['Poppins:Bold',sans-serif] text-[14px] text-[#1d2d3e]">{item.installment}</p>
                    </td>
                    <td className="px-[20px] py-[12px]">
                      <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#1d2d3e]">{item.dueDate}</p>
                    </td>
                    <td className="px-[20px] py-[12px] text-right">
                      <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                        ₹ {item.principal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </td>
                    <td className="px-[20px] py-[12px] text-right">
                      <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                        ₹ {item.interest.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </td>
                    <td className="px-[20px] py-[12px] text-right">
                      <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                        ₹ {item.emi.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </td>
                    <td className="px-[20px] py-[12px] text-right">
                      <p className="font-['Inter:Regular',sans-serif] text-[14px] text-black">
                        ₹ {item.outstanding.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
          </div>

          {/* Summary Section */}
          <div className="bg-[#eaf2ff] px-[40px] py-[20px] border-t border-[#c3eeff]">
            <div className="grid grid-cols-3 gap-[40px]">
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#62748e] mb-[8px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Total Principal
                </p>
                <p className="font-['Inter:Bold',sans-serif] text-[20px] text-[#0089cf]">
                  ₹ 20,00,000.00
                </p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#62748e] mb-[8px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Total Interest
                </p>
                <p className="font-['Inter:Bold',sans-serif] text-[20px] text-[#0089cf]">
                  ₹ {(schedule.reduce((sum, item) => sum + item.interest, 0)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="font-['DM_Sans:SemiBold',sans-serif] text-[14px] text-[#62748e] mb-[8px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Total Repayment Amount
                </p>
                <p className="font-['Inter:Bold',sans-serif] text-[20px] text-[#0089cf]">
                  ₹ {(schedule.reduce((sum, item) => sum + item.emi, 0)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
