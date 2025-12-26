import { Calendar, IndianRupee } from 'lucide-react';

export function Payments() {
  const payments = [
    { date: '28 SEP', year: '2019', amount: '4,00,000', status: 'upcoming', label: 'NEXT PAYMENT' },
    { date: '28 AUG', year: '2019', amount: '3,20,000', status: 'paid', label: 'PAID DUE' },
    { date: '28 JUL', year: '2019', amount: '-', status: 'paid', label: 'PAID DUE' },
    { date: '28 JUN', year: '2019', amount: '3,20,000', status: 'paid', label: 'PAID DUE' },
    { date: '28 MAY', year: '2019', amount: '3,20,000', status: 'paid', label: 'PAID DUE' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Payments</h3>
      </div>
      <div className="p-4 space-y-4">
        {payments.map((payment, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                payment.status === 'upcoming' ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                <Calendar className={`w-5 h-5 ${
                  payment.status === 'upcoming' ? 'text-blue-600' : 'text-green-600'
                }`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">{payment.label}</p>
                <p className="font-semibold text-gray-900">
                  {payment.date}
                  <span className="text-xs text-gray-400 ml-1">{payment.year}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Due Amount</p>
              <p className="font-semibold text-gray-900">{payment.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
