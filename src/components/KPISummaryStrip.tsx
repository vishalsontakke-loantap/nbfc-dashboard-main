import { FileText, CheckCircle, XCircle, TrendingUp, DollarSign } from 'lucide-react';

export function KPISummaryStrip() {
  const kpis = [
    {
      icon: FileText,
      label: 'Total Applications',
      value: '1,847',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: CheckCircle,
      label: 'Approved',
      value: '72.4%',
      subValue: '1,337 loans',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      icon: XCircle,
      label: 'Rejected',
      value: '22.8%',
      subValue: '421 loans',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
    },
    {
      icon: TrendingUp,
      label: 'Average ROI',
      value: '11.8%',
      subValue: 'Bank share',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      icon: DollarSign,
      label: 'Total Buyout Value',
      value: '₹28.4 Cr',
      subValue: 'Approved amount',
      bgColor: 'bg-[#B8E6FF]',
      iconColor: 'text-[#007BC3]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className={`${kpi.bgColor} rounded-xl p-3 w-fit mb-4`}>
              <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
            </div>
            <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
            <p className="text-gray-900 mb-1">{kpi.value}</p>
            {kpi.subValue && <p className="text-xs text-gray-400">{kpi.subValue}</p>}
          </div>
        );
      })}
    </div>
  );
}
