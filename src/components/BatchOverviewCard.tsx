import { User, Building2, FileText, DollarSign, TrendingUp, Clock, Download } from 'lucide-react';
import { Button } from './ui/button';

export function BatchOverviewCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>Batch Overview</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Download Pool File
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-start gap-3">
          <div className="bg-[#B8E6FF] rounded-lg p-2 mt-1">
            <User className="w-5 h-5 text-[#007BC3]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Uploaded By</p>
            <p className="text-gray-900">Rahul Verma</p>
            <p className="text-xs text-gray-400">Senior Analyst</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-[#B8E6FF] rounded-lg p-2 mt-1">
            <Building2 className="w-5 h-5 text-[#007BC3]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Source NBFCs</p>
            <p className="text-gray-900">Bajaj Finance</p>
            {/* <p className="text-xs text-gray-400">+ 2 others</p> */}
          </div>
        </div>

        {/* <div className="flex items-start gap-3">
          <div className="bg-[#B8E6FF] rounded-lg p-2 mt-1">
            <Calendar className="w-5 h-5 text-[#007BC3]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Upload Date</p>
            <p className="text-gray-900">08 Nov 2024</p>
            <p className="text-xs text-gray-400">10:42 AM</p>
          </div>
        </div> */}

        <div className="flex items-start gap-3">
          <div className="bg-[#B8E6FF] rounded-lg p-2 mt-1">
            <FileText className="w-5 h-5 text-[#007BC3]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Pool File</p>
            <p className="text-gray-900 text-sm">pool_batch_nov.xlsx</p>
            <p className="text-xs text-gray-400">2.4 MB</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-green-50 rounded-lg p-2 mt-1">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Buyout Requested</p>
            <p className="text-gray-900">₹32.8 Cr</p>
            <p className="text-xs text-gray-400">1,847 applications</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-green-50 rounded-lg p-2 mt-1">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Approved Amount</p>
            <p className="text-green-600">₹28.4 Cr</p>
            <p className="text-xs text-gray-400">1,337 applications</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-blue-50 rounded-lg p-2 mt-1">
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Disbursed Amount</p>
            <p className="text-blue-600">₹28.4 Cr</p>
            <p className="text-xs text-gray-400">1,337 transactions</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-purple-50 rounded-lg p-2 mt-1">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Average ROI</p>
            <p className="text-purple-600">11.8%</p>
            <p className="text-xs text-gray-400">Bank share</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-orange-50 rounded-lg p-2 mt-1">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Average Tenure</p>
            <p className="text-orange-600">36 months</p>
            <p className="text-xs text-gray-400">Weighted average</p>
          </div>
        </div>
      </div>

      {/* <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-sm mb-4">Application Status Distribution</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Approved</span>
              <span className="text-green-600">1,337 (72.4%)</span>
            </div>
            <Progress value={72.4} className="h-2 [&>div]:bg-green-500" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Rejected</span>
              <span className="text-red-600">421 (22.8%)</span>
            </div>
            <Progress value={22.8} className="h-2 [&>div]:bg-red-500" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Pending Review</span>
              <span className="text-amber-600">89 (4.8%)</span>
            </div>
            <Progress value={4.8} className="h-2 [&>div]:bg-amber-500" />
          </div>
        </div>
      </div> */}
    </div>
  );
}
