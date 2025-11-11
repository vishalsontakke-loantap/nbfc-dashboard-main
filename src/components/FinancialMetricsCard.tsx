import { TrendingUp, Clock, CheckCircle, XCircle, Wallet, AlertTriangle, Timer, Banknote } from 'lucide-react';

export function FinancialMetricsCard() {
  const metrics = [
    { icon: TrendingUp, label: 'Average ROI', value: '11.8%', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: Clock, label: 'Average Tenure', value: '36 months', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: CheckCircle, label: 'Total Approved Applications', value: '2,847', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: XCircle, label: 'Total Rejected Applications', value: '423', color: 'text-red-600', bgColor: 'bg-red-50' },
    { icon: Wallet, label: 'Current Portfolio Value', value: '₹45.3 Cr', color: 'text-[#007BC3]', bgColor: 'bg-[#B8E6FF]' },
    { icon: AlertTriangle, label: 'Overdue Accounts', value: '2.3%', color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { icon: Timer, label: 'Avg Processing Time', value: '4.2 days', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: Banknote, label: 'Fee / Commission Earned', value: '₹1.8 Cr', color: 'text-green-600', bgColor: 'bg-green-50' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="mb-6">Financial & Operational Metrics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`${metric.bgColor} rounded-lg p-3`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{metric.label}</p>
                <p className={`${metric.color} mt-1`}>{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
