import { CheckCircle2, DollarSign, Clock, XCircle, CreditCard, User, Download } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function DisbursementSummaryCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Disbursement Summary</h2>
        <Badge className="bg-blue-500 hover:bg-blue-600">
          Completed
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-green-50 rounded-lg p-2 mt-1">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Disbursed Amount</p>
              <p className="text-green-600">₹28.4 Cr</p>
              <p className="text-xs text-gray-400">1,337 transactions</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-amber-50 rounded-lg p-2 mt-1">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending Disbursement</p>
              <p className="text-amber-600">0</p>
              <p className="text-xs text-gray-400">All completed</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-red-50 rounded-lg p-2 mt-1">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Failed Transactions</p>
              <p className="text-red-600">7</p>
              <p className="text-xs text-gray-400">Under review</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-50 rounded-lg p-2 mt-1">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg Time</p>
              <p className="text-blue-600">2.3 days</p>
              <p className="text-xs text-gray-400">Processing time</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm mb-4">Disbursement Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Completed</span>
              <span className="text-green-600">1,337 / 1,337</span>
            </div>
            <Progress value={100} className="h-2 [&>div]:bg-green-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <div className="bg-purple-50 rounded-lg p-2 mt-1">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Mode</p>
              <p className="text-gray-900">NEFT/RTGS</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-indigo-50 rounded-lg p-2 mt-1">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Disbursed By</p>
              <p className="text-gray-900 text-sm">Auto System</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button variant="outline" className="w-full gap-2 hover:bg-[#B8E6FF]">
            <Download className="w-4 h-4" />
            Download Disbursement Report
          </Button>
        </div>
      </div>
    </div>
  );
}
