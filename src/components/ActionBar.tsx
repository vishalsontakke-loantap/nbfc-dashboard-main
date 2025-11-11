import { Play, CheckCircle, XCircle, Send, Download, FileText } from 'lucide-react';
import { Button } from './ui/button';

export function ActionBar() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-wrap gap-4 justify-center md:justify-end">
        <Button 
          variant="outline"
          className="gap-2 hover:bg-[#B8E6FF] hover:text-[#007BC3] hover:border-[#007BC3] transition-colors"
        >
          <Play className="w-4 h-4" />
          Run BRE Again
        </Button>

        {/* <Button 
          variant="outline"
          className="gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
        >
          <FileText className="w-4 h-4" />
          View Loan Applications
        </Button> */}

         <Button 
          className="gap-2 bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          View Loan Applications
        </Button>
        
        <Button 
          variant="outline"
          className="gap-2 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors disabled:opacity-50"
        >
          <XCircle className="w-4 h-4" />
          Reject Entire Batch
        </Button>

        <Button 
          variant="outline"
          className="gap-2 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Pool Summary
        </Button>
        
        <Button 
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          <Send className="w-4 h-4" />
          Disburse Approved Loans
        </Button>
        
        <Button 
          className="gap-2 bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Approve Pool Buyout
        </Button>
      </div>
    </div>
  );
}
