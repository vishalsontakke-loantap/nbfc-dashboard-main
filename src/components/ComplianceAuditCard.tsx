import { CheckCircle, FileCheck, Shield, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

export function ComplianceAuditCard() {
  const auditLog = [
    { action: 'Pool Uploaded', user: 'Rahul Verma', timestamp: '08 Nov, 10:42 AM' },
    { action: 'BRE Execution Started', user: 'System', timestamp: '08 Nov, 10:45 AM' },
    { action: 'BRE Completed', user: 'System', timestamp: '08 Nov, 11:15 AM' },
    { action: 'Manual Review Completed', user: 'Priya Sharma', timestamp: '08 Nov, 2:30 PM' },
    { action: 'Pool Approved', user: 'Amit Desai', timestamp: '09 Nov, 9:15 AM' },
    { action: 'Disbursement Initiated', user: 'System', timestamp: '09 Nov, 10:00 AM' },
    { action: 'Disbursement Completed', user: 'System', timestamp: '10 Nov, 4:30 PM' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-3">
      <h2 className="mb-6">Compliance & Audit</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-700">Pool Verification</p>
                <p className="text-xs text-gray-500">All checks passed</p>
              </div>
            </div>
            <Badge className="bg-green-500 hover:bg-green-600">Pass</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-700">Document Validation</p>
                <p className="text-xs text-gray-500">KYC / AML / Mandate</p>
              </div>
            </div>
            <Badge className="bg-green-500 hover:bg-green-600">Pass</Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-700">BRE Rule Version</p>
                <p className="text-xs text-gray-500">Latest version</p>
              </div>
            </div>
            <Badge className="bg-blue-500 hover:bg-blue-600">v1.2.5</Badge>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#007BC3]" />
            Audit Trail
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {auditLog.map((log, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-2 h-2 bg-[#007BC3] rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm text-gray-900">{log.action}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{log.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-500">by {log.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm mb-3">Remarks & Notes</h3>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              Pool batch processed successfully. All compliance requirements met. 
              BRE auto-approval rate is above target (68.2% vs 65% target). 
              Disbursement completed within SLA. No adverse findings during audit.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
