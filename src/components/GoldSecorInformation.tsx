import { Shield } from 'lucide-react';

interface GoldSecorInfo {
  pan: string;
  aadhar: string;
  dob: string;
  maritalStatus: string;
  address: string;
  pincode: string;
  state: string;
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
          <p className="text-xs text-gray-500 mb-1">PAN</p>
          <p className="text-sm text-gray-900">{goldSecorInfo.pan}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Address</p>
          <p className="text-sm text-gray-900">{goldSecorInfo.address}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Aadhar</p>
          <p className="text-sm text-gray-900">{goldSecorInfo.aadhar}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Pincode</p>
          <p className="text-sm text-gray-900">{goldSecorInfo.pincode}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">DOB</p>
          <p className="text-sm text-gray-900">{goldSecorInfo.dob}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">State</p>
          <p className="text-sm text-gray-900">{goldSecorInfo.state}</p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Maritial Status</p>
          <p className="text-sm text-gray-900">{goldSecorInfo.maritalStatus}</p>
        </div>
      </div>
      
      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
        View More Information
      </button>
    </div>
  );
}
