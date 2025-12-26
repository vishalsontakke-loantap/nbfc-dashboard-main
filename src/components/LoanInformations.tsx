import { TrendingUp, TrendingDown, Clock, Calendar, Flag, IndianRupee } from 'lucide-react';
import { StatCard } from './StatCard';
import { Card } from './ui/card';

export function LoanInformations() {
  return (
    <div className="bg-white p-6 shadow-sm mb-3">
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
            value="24,763"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            label="Overdue"
            value="0"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            label="Outstanding"
            value="0"
          />
          <StatCard 
            icon={Calendar}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            label="Irac"
            value="STD"
          />
          <StatCard 
            icon={Calendar}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            label="DPD"
            value="0"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            label="Upgrade Amt"
            value="0"
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
            value="24,763"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            label="Overdue"
            value="0"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            label="Outstanding"
            value="0"
          />
          <StatCard 
            icon={Calendar}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            label="Irac"
            value="STD"
          />
          <StatCard 
            icon={Calendar}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            label="DPD"
            value="0"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            label="Upgrade Amt"
            value="0"
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
            value="24,763"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            label="Overdue"
            value="0"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            label="Outstanding"
            value="0"
          />
          <StatCard 
            icon={Calendar}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            label="Irac"
            value="STD"
          />
          <StatCard 
            icon={Calendar}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            label="DPD"
            value="0"
          />
          <StatCard 
            icon={IndianRupee}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            label="Upgrade Amt"
            value="0"
          />
        </div>
        </Card>
      </div>

    </div>
  );
}
