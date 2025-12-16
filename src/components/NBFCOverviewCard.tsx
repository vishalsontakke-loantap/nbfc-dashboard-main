import { Building2, Calendar, Package, DollarSign, FileText, Star, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';

export function NBFCOverviewCard() {
  const overviewData = [
    { icon: Building2, label: 'NBFC Name', value: 'Bajaj Finance Limited' },
    { icon: FileText, label: 'NBFC ID', value: 'NBFC-2024-001' },
    { icon: Calendar, label: 'Onboarding Date', value: '15 Jan 2024' },
    { icon: Package, label: 'Total Pool Count', value: '47' },
    { icon: DollarSign, label: 'Total Disbursed Amount', value: '₹42.5 Cr' },
    { icon: DollarSign, label: 'Total Buyout Amount', value: '₹38.2 Cr' },
    { icon: FileText, label: 'Active Loans Count', value: '1,284' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-3">
      <div className="flex items-center justify-between mb-6">
        <h2>NBFC Overview</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <Star className="w-5 h-5 text-gray-300" />
            <span className="ml-2 text-gray-600">4.0</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {overviewData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-[#B8E6FF] rounded-lg p-2 mt-1">
                <Icon className="w-5 h-5 text-[#007BC3]" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                <p className="text-gray-900">{item.value}</p>
              </div>
            </div>
          );
        })}
        
        <div className="flex items-start gap-3">
          <div className="bg-[#B8E6FF] rounded-lg p-2 mt-1">
            <CheckCircle2 className="w-5 h-5 text-[#007BC3]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Compliance Status</p>
            <Badge className="bg-green-500 hover:bg-green-600">
              Compliant
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
