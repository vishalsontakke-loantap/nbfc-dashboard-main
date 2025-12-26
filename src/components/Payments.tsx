interface Payment {
  date: string;
  month: string;
  year: string;
  amount: string;
}

const paidDues: Payment[] = [
  { date: '28', month: 'AUG', year: '2019', amount: '3,20,000' },
  { date: '28', month: 'JUL', year: '2019', amount: '3,20,000' },
  { date: '28', month: 'JUN', year: '2019', amount: '3,20,000' },
  { date: '28', month: 'MAY', year: '2019', amount: '3,20,000' },
];

export function Payments() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold text-gray-900 mb-6">Payments</h2>
      
      <div className="mb-6">
        <p className="text-xs text-gray-500 mb-3">NEXT PAYMENT</p>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 italic">28</p>
              <p className="text-sm font-medium text-gray-600 italic">SEP</p>
              <p className="text-xs text-gray-400">2019</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Due Amount</p>
              <p className="text-xl font-semibold text-gray-900">4,00,000</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <p className="text-xs text-gray-500 mb-3">PAID DUE</p>
        <div className="space-y-3">
          {paidDues.map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 italic">{payment.date}</p>
                  <p className="text-sm font-medium text-gray-600 italic">{payment.month}</p>
                  <p className="text-xs text-gray-400">{payment.year}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Due Amount</p>
                  <p className="text-base font-semibold text-gray-900">{payment.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
