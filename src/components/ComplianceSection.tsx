import { Calendar, CheckCircle, FileCheck, Download, Eye } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function ComplianceSection() {
  const documents = [
    { name: 'RBI Registration Certificate', status: 'verified' },
    { name: 'Partnership Agreement', status: 'verified' },
    { name: 'Financial Statements (FY23-24)', status: 'verified' },
    { name: 'Compliance Audit Report', status: 'pending' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-3">
      <h2 className="mb-6">Compliance & Audit</h2>
      
      <div className="space-y-6">
        {/* Compliance Status */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#007BC3]" />
              <div>
                <p className="text-sm text-gray-500">Latest Audit Date</p>
                <p className="text-gray-900">28 Sep 2024</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">KYC / AML Verification</p>
                <Badge className="mt-1 bg-green-500 hover:bg-green-600">Verified</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-[#007BC3]" />
              <div>
                <p className="text-sm text-gray-500">BRE Integration Status</p>
                <Badge className="mt-1 bg-green-500 hover:bg-green-600">Active</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Document Repository */}
        <div>
          <h3 className="text-sm mb-3">NBFC Document Repository</h3>
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileCheck className={`w-4 h-4 ${doc.status === 'verified' ? 'text-green-600' : 'text-amber-600'}`} />
                  <span className="text-sm">{doc.name}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4 text-[#007BC3]" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="w-4 h-4 text-[#007BC3]" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Notes */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm mb-2">Latest Compliance Review</p>
          <p className="text-sm text-gray-600">
            All compliance requirements met. NBFC maintains excellent documentation standards. 
            Next review scheduled for Q1 2025. No adverse findings in latest audit.
          </p>
        </div>
      </div>
    </div>
  );
}
