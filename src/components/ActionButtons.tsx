import { CheckCircle, Ban, MessageCircle, Download } from 'lucide-react';
import { Button } from './ui/button';

export function ActionButtons() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-wrap gap-4 justify-center md:justify-end">
        <Button 
          variant="outline"
          className="gap-2 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Request Clarification
        </Button>
        
        <Button 
          variant="outline"
          className="gap-2 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors"
        >
          <Ban className="w-4 h-4" />
          Suspend NBFC
        </Button>
        
        <Button 
          variant="outline"
          className="gap-2 hover:bg-[#B8E6FF] hover:text-[#007BC3] hover:border-[#007BC3] transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Summary Report
        </Button>
        
        <Button 
          className="gap-2 bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Approve NBFC Partnership
        </Button>
      </div>
    </div>
  );
}
