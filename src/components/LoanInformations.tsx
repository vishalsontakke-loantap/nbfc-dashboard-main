import { TrendingUp, TrendingDown, Clock, Calendar, Flag } from 'lucide-react';
import { StatCard } from './StatCard';

export function LoanInformations() {
  return (
    <div className="bg-white p-6 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
          <path d="M9 3v18M3 9h6M3 15h6" strokeWidth="2" />
        </svg>
        <h2 className="font-semibold text-gray-900">Loan Informations</h2>
      </div>
      
      <div className="mb-6">
        <div className="grid grid-cols-5 gap-4">
          <StatCard 
            icon={TrendingUp}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            label="Outstanding"
            value="24,763"
          />
          <StatCard 
            icon={TrendingDown}
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            label="Overdue"
            value="0"
          />
          <StatCard 
            icon={Clock}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            label="Pending Tenure"
            value="19"
          />
          <StatCard 
            icon={Calendar}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            label="Disbursed On"
            value="28 Jun"
          />
          <StatCard 
            icon={Calendar}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            label="Ends On"
            value="28 Dec"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Total Disbursement</p>
              <p className="text-xl font-semibold text-gray-900">98,873</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Overdue</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Bank Disbursement</p>
              <p className="text-xl font-semibold text-gray-900">74,837</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">NBFC Disbursement</p>
              <p className="text-xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
