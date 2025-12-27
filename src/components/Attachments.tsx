import { Download, FileText, Check } from 'lucide-react';

interface Attachment {
  name: string;
  date: string;
  size: string;
  type: 'pdf' | 'sheet';
}

const attachments: Attachment[] = [
  { name: 'Customer KYC Document', date: 'May 24', size: '172.28 KB', type: 'pdf' },
  { name: 'CIBIL History', date: 'May 24', size: '172.28 KB', type: 'sheet' },
  { name: 'Loan History', date: 'May 24', size: '172.28 KB', type: 'sheet' },
  { name: 'Payment Schedule', date: 'May 24', size: '172.28 KB', type: 'sheet' },
];

export function Attachments() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-6 px-6 pt-4">
          <button className="pb-3 border-b-2 border-orange-500 text-sm font-medium text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Attachment
          </button>
          <button className="pb-3 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Timeline
          </button>
          <button className="pb-3 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Criteria Match
          </button>
        </div>
      </div>
      
      <div className="p-3">        
        <div className="space-y-3">
          {attachments.map((attachment, index) => (
            <div key={index} className="flex items-center gap-3  hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className={`w-10 h-10 rounded flex items-center justify-center ${
                attachment.type === 'pdf' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                <FileText className={`w-5 h-5 ${
                  attachment.type === 'pdf' ? 'text-red-600' : 'text-green-600'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                <p className="text-xs text-gray-400">{attachment.date} • {attachment.size}</p>
              </div>
            </div>
          ))}
        </div>
         <div className="flex justify-center ">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>
      </div>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
