import { CheckCircle, Calendar, AlertTriangle, FileSearch, TrendingUp, Shield } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

export function BREUnderwritingCard() {
  const rejectionReasons = [
    { reason: 'Low Credit Score (<650)', count: 187, percentage: 44.4 },
    { reason: 'High Debt-to-Income Ratio', count: 142, percentage: 33.7 },
    { reason: 'Insufficient Documentation', count: 92, percentage: 21.9 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>BRE & Underwriting Summary</h2>
        <Badge className="bg-green-500 hover:bg-green-600">
          Completed
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-50 rounded-lg p-2 mt-1">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">BRE Run Date</p>
              <p className="text-gray-900">08 Nov 2024</p>
              <p className="text-xs text-gray-400">11:15 AM</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-50 rounded-lg p-2 mt-1">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Auto Pass Rate</p>
              <p className="text-blue-600">68.2%</p>
              <p className="text-xs text-gray-400">1,260 auto-approved</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-amber-50 rounded-lg p-2 mt-1">
              <FileSearch className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Manual Review</p>
              <p className="text-amber-600">89 cases</p>
              <p className="text-xs text-gray-400">Pending underwriting</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-50 rounded-lg p-2 mt-1">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg Credit Score</p>
              <p className="text-purple-600">724</p>
              <p className="text-xs text-gray-400">Pool average</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Average Risk Level</h3>
            <Badge className="bg-green-500 hover:bg-green-600">Low Risk</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <Progress value={25} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-amber-500" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Top Rejection Reasons
          </h3>
          <div className="space-y-3">
            {rejectionReasons.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">{item.reason}</span>
                  <span className="text-sm text-red-600">{item.count}</span>
                </div>
                <Progress value={item.percentage} className="h-1.5 [&>div]:bg-red-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
