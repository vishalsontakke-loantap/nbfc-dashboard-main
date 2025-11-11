import { ChevronLeft, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function PoolBatchHeader() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* <div className="flex items-center justify-between mb-6"> */}
        {/* <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-[#007BC3] to-[#005A8F] text-white px-6 py-3 rounded-xl shadow-md">
            <span className="tracking-wide">Bank of Maharashtra</span>
          </div>
        </div> */}
        
        {/* <Button 
          variant="outline" 
          className="gap-2 hover:bg-[#B8E6FF] transition-all hover:shadow-md rounded-xl px-4 py-2"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Pool List
        </Button>
      </div> */}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-[#B8E6FF] to-[#007BC3]/20 rounded-2xl p-4">
            <Package className="w-8 h-8 text-[#007BC3]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-gray-900">Pool Batch Summary</h1>
              <Badge className="bg-green-500 hover:bg-green-600 px-3 py-1">
                Completed
              </Badge>
            </div>
            <p className="text-gray-500">Batch ID: POL987868787 • Uploaded on 08 Nov 2024, 10:42 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
