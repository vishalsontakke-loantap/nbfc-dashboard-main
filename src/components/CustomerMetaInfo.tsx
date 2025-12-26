import { Copy } from 'lucide-react';

interface CustomerMetaInfoProps {
  email: string;
  phone: string;
  loanType: string;
  interestRate: string;
  tenure: string;
  loanId: string;
}

export function CustomerMetaInfo({
  email,
  phone,
  loanType,
  interestRate,
  tenure,
  loanId
}: CustomerMetaInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-12">
          <div>
            <p className="text-sm text-gray-900">{email}</p>
            <p className="text-sm text-gray-900 mt-1">{phone}</p>
          </div>
          
          <div className="flex gap-12">
            <div>
              <p className="text-xs text-gray-400 mb-1">Loan Type</p>
              <p className="text-sm text-gray-900">{loanType}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 mb-1">Interest (100k)</p>
              <p className="text-sm text-gray-900">{interestRate}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-400 mb-1">Tenure</p>
              <p className="text-sm text-gray-900">{tenure}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div>
                <p className="text-xs text-gray-400 mb-1">Loan ID</p>
                <p className="text-sm text-gray-900">{loanId}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 mt-4">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
