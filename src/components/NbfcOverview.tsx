import { ChevronLeft, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function NBFCHeader() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-[#007BC3] to-[#005A8F] text-white px-6 py-3 rounded-xl shadow-md">
            <span className="tracking-wide">Bank of Maharashtra</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="gap-2 hover:bg-[#B8E6FF] transition-all hover:shadow-md rounded-xl px-4 py-2"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to NBFC List
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-[#B8E6FF] to-[#007BC3]/20 rounded-2xl p-4">
            <Building2 className="w-8 h-8 text-[#007BC3]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-gray-900">Bajaj Finance Limited</h1>
              <Badge className="bg-green-500 hover:bg-green-600 px-3 py-1">
                Active
              </Badge>
            </div>
            <p className="text-gray-500">NBFC ID: NBFC-2024-001 • Onboarded on 15 Jan 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}