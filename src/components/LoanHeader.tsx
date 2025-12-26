import { ArrowLeft, Copy, HelpCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface LoanHeaderProps {
  customerName: string;
  location: string;
  status: string;
  applicationId: string;
  date: string;
  loanAmount: string;
  email: string;
  phone: string;
  loanType: string;
  interestRate: string;
  tenure: string;
  loanId: string;
}

export function LoanHeader({
  customerName,
  location,
  status,
  applicationId,
  date,
  loanAmount,
  email,
  phone,
  loanType,
  interestRate,
  tenure,
  loanId
}: LoanHeaderProps) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </div>

            <div>
              <h1 className="font-semibold text-gray-900">{customerName}</h1>
              <p className="text-sm text-gray-500">{location}</p>
            </div>

            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 px-3 py-1">
              • {status}
            </Badge>

            <div className="ml-8 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded">
              <span className="text-sm text-gray-900">{applicationId}</span>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <span className="text-sm text-gray-500 ml-4">{date}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
              <p className="text-xl font-semibold text-gray-900">{loanAmount}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between ml-12">
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
    </>
  );
}