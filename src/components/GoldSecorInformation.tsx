import { Shield } from 'lucide-react';

interface GoldSecorInfo {
  gross_weight: string;
  net_weight: string;
  gold_purity: string;
  gold_rate: string;
  market_rate: string;
  gold_value: string;
}

export function GoldSecorInformation({ goldSecorInfo }: { goldSecorInfo: GoldSecorInfo }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-gray-700" />
        <h2 className="font-semibold text-gray-900">Gold Secor Information</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-6">
        <div>
          <p className="text-xs text-gray-500 mb-1">Gross Weight</p>
          <p className="text-sm text-gray-900">{goldSecorInfo?.gross_weight}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Net Weight</p>
          <p className="text-sm text-gray-900">{goldSecorInfo?.net_weight}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Gold Purity</p>
          <p className="text-sm text-gray-900">{goldSecorInfo?.gold_purity}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Gold Rate</p>
          <p className="text-sm text-gray-900">{goldSecorInfo?.gold_rate}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Market rate</p>
          <p className="text-sm text-gray-900">{goldSecorInfo?.market_rate}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Gold Value</p>
          <p className="text-sm text-gray-900">{goldSecorInfo?.gold_value}</p>
        </div>
        
      </div>
      
    </div>
  );
}
