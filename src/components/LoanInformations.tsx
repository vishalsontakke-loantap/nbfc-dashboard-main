import { TrendingUp, TrendingDown, Clock, Calendar, Flag, IndianRupee } from 'lucide-react';
import { StatCard } from './StatCard';
import { Card } from './ui/card';

export function LoanInformations({ loanData }: { loanData: any }) {
  return (
    <div className="bg-white p-6  mb-3">
      <div className="flex items-center gap-2">

        <h2 className="font-medium text-gray-900">Loan Information(total)</h2>
      </div>

      <div className="mb-2">
        <Card className="p-4 bg-gray-50">
          <div className="grid grid-cols-6 gap-2">
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="Disbursed"
              value={loanData?.sanction_limit}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-red-100"
              iconColor="text-red-600"
              label="Overdue"
              value={loanData?.total_overdue || 0}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
              label="Outstanding"
              value={loanData?.total_principal_balance || 0 + loanData?.total_interest_balance || 0}
            />
            <StatCard
              icon={Calendar}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              label="Irac"
              value={loanData?.total_irac || "STD"}
            />
            <StatCard
              icon={Calendar}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="DPD"
              value={loanData?.total_dpd || 0}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="Upgrade Amt"
              value={loanData?.total_upgrade_amt || 0}
            />
          </div>
        </Card>
      </div>

      {/* BANK */}
      <div className="flex items-center gap-2 ">

        <h2 className="font-medium text-gray-900">Loan Information(bank)</h2>
      </div>

      <div className="mb-2">
        <Card className="p-4 bg-gray-50">
          <div className="grid grid-cols-6 gap-2">
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="Disbursed"
              value={loanData?.bank_sanction_amount}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-red-100"
              iconColor="text-red-600"
              label="Overdue"
              value={loanData?.cbs_overdue || 0}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
              label="Outstanding"
              value={loanData?.bank_principal_balance || 0 + loanData?.bank_interest_balance || 0}
            />
            <StatCard
              icon={Calendar}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              label="Irac"
              value={loanData?.cbs_irac || "STD"}
            />
            <StatCard
              icon={Calendar}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="DPD"
              value={loanData?.cbs_dpd || 0}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="Upgrade Amt"
              value={loanData?.cbs_upgrade_amt || 0}
            />
          </div>
        </Card>
      </div>

      {/* NBFC */}
      <div className="flex items-center gap-2 ">

        <h2 className="font-medium text-gray-900">Loan Information(nbfc)</h2>
      </div>

      <div className="mb-2">
        <Card className="p-4 bg-gray-50">
          <div className="grid grid-cols-6 gap-2">
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="Disbursed"
              value={loanData?.nbfc_sanction_amount}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-red-100"
              iconColor="text-red-600"
              label="Overdue"
              value={loanData?.nbfc_overdue || 0}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
              label="Outstanding"
              value={loanData?.nbfc_principal_balance || 0 + loanData?.nbfc_interest_balance || 0}
            />
            <StatCard
              icon={Calendar}
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              label="Irac"
              value={loanData?.nbfc_irac || "STD"}
            />
            <StatCard
              icon={Calendar}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="DPD"
              value={loanData?.nbfc_dpd || 0}
            />
            <StatCard
              icon={IndianRupee}
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
              label="Upgrade Amt"
              value={loanData?.nbfc_upgrade_amt || 0}
            />
          </div>
        </Card>
      </div>

    </div>
  );
}
