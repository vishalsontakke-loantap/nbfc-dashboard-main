import { Building2, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function NBFCPerformanceTable() {
  const nbfcData = [
    {
      name: 'Bajaj Finance Limited',
      uploaded: 847,
      approved: 618,
      rejected: 189,
      pending: 40,
      approvedAmount: '₹12.4 Cr',
      buyoutAmount: '₹11.8 Cr',
      roi: '12.1%',
      tenure: '36 mo',
      risk: 'Low',
      compliance: 'Pass',
    },
    {
      name: 'Mahindra Finance',
      uploaded: 562,
      approved: 421,
      rejected: 118,
      pending: 23,
      approvedAmount: '₹8.9 Cr',
      buyoutAmount: '₹8.6 Cr',
      roi: '11.8%',
      tenure: '42 mo',
      risk: 'Low',
      compliance: 'Pass',
    },
    {
      name: 'Muthoot Finance',
      uploaded: 438,
      approved: 298,
      rejected: 114,
      pending: 26,
      approvedAmount: '₹7.1 Cr',
      buyoutAmount: '₹6.9 Cr',
      roi: '11.2%',
      tenure: '24 mo',
      risk: 'Medium',
      compliance: 'Pass',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2>NBFC Performance Breakdown</h2>
        <span className="text-sm text-gray-500">3 NBFCs in this batch</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm text-gray-600">NBFC Name</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">Uploaded</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">Approved</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">Rejected</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">Pending</th>
              <th className="text-right py-3 px-4 text-sm text-gray-600">Approved Amt</th>
              <th className="text-right py-3 px-4 text-sm text-gray-600">Buyout Amt</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">ROI</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">Tenure</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">Risk</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">Compliance</th>
              <th className="text-center py-3 px-4 text-sm text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {nbfcData.map((nbfc, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#007BC3]" />
                    <span className="text-sm">{nbfc.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-center text-sm text-gray-700">{nbfc.uploaded}</td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-green-600">{nbfc.approved}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-red-600">{nbfc.rejected}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-amber-600">{nbfc.pending}</span>
                </td>
                <td className="py-4 px-4 text-right text-sm text-gray-700">{nbfc.approvedAmount}</td>
                <td className="py-4 px-4 text-right text-sm text-gray-700">{nbfc.buyoutAmount}</td>
                <td className="py-4 px-4 text-center text-sm text-purple-600">{nbfc.roi}</td>
                <td className="py-4 px-4 text-center text-sm text-gray-700">{nbfc.tenure}</td>
                <td className="py-4 px-4 text-center">
                  <Badge className={`${
                    nbfc.risk === 'Low' ? 'bg-green-500 hover:bg-green-600' :
                    nbfc.risk === 'Medium' ? 'bg-amber-500 hover:bg-amber-600' :
                    'bg-red-500 hover:bg-red-600'
                  }`}>
                    {nbfc.risk}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    {nbfc.compliance}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-center">
                  <Button variant="ghost" size="sm" className="gap-1 text-[#007BC3] hover:bg-[#B8E6FF]">
                    View
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
