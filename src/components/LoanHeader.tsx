import { ArrowLeft, Copy, HelpCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { formatIndianCurrency } from '@/lib/utils';

interface LoanHeaderProps {
  customer_name: string;
  loan_status: string;
  loan_account_number: string;
  bank_loan_date: string;
  sanction_limit: string;
  mobile_number: string;
  interestRate: string;
  loan_tenure: string;
  nbfc_ref_no: string;
}

export function LoanHeader({
  customer_name,
  loan_status,
  loan_account_number,
  bank_loan_date,
  sanction_limit,
  mobile_number,
  interestRate,
  loan_tenure,
  nbfc_ref_no
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
                <h1 className="font-semibold text-gray-900">{customer_name}</h1>
                <p className="text-sm text-gray-500">{ }</p>
              </div>

              <Badge className={loan_status == 'active' ? "bg-green-100 text-green-700 hover:bg-green-100 border-0 px-3 py-1" : "bg-gray-100 text-gray-700 hover:bg-gray-100 border-0 px-3 py-1"}>
                • {loan_status.toUpperCase()}
              </Badge>

              <div className="ml-8 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded">
                <span className="text-sm text-gray-900">{loan_account_number}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <span className="text-sm text-gray-500 ml-4">{bank_loan_date}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
                <p className="text-xl font-semibold text-gray-900">{formatIndianCurrency(sanction_limit)}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between ml-12">
            <div className="flex items-start gap-12">
              <div className="flex gap-12">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Mobile number</p>
                  <p className="text-sm text-gray-900">{mobile_number}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Loan Type</p>
                  <p className="text-sm text-gray-900">{"GOLD LOAN"}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Interest (blended)</p>
                  <p className="text-sm text-gray-900">{interestRate}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1">Tenure</p>
                  <p className="text-sm text-gray-900">{loan_tenure}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Lead ID</p>
                    <p className="text-sm text-gray-900">{nbfc_ref_no}</p>
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