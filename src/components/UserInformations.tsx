import { mask } from '@/lib/utils';
import { User } from 'lucide-react';

interface UserInfo {
  pan_number: string;
  aadhar_number: string;
  dob: string;
  address1: string;
  address2: string;
  pincode: string;
  state: string;
  creditScore: number;
  creditScoreDate: string;
}

export function UserInformations({ userInfo }: { userInfo: UserInfo }) {
  return (
    <div className="bg-white p-6  shadow-sm mb-3">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-gray-700" />
        <h2 className="font-semibold text-gray-900">User Informations</h2>
      </div>
      
      <div className="flex gap-8">
        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">PAN</p>
            <p className="text-sm text-gray-900">{mask(userInfo.pan_number)}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Address</p>
            <p className="text-sm text-gray-900">{userInfo?.address1} {userInfo?.address2}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Aadhar</p>
            <p className="text-sm text-gray-900">{mask(userInfo?.aadhar_number)}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Pincode</p>
            <p className="text-sm text-gray-900">{userInfo.pincode}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">DOB</p>
            <p className="text-sm text-gray-900">{userInfo.dob}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">State</p>
            <p className="text-sm text-gray-900">{userInfo.state}</p>
          </div>
          
        </div>
        
        <div className="flex flex-col items-center justify-center px-6">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="#10b981"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${(userInfo.creditScore / 900) * 301.6} 301.6`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{userInfo.creditScore}</p>
                <p className="text-xs text-gray-500">CIBIL</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">{userInfo.creditScoreDate}</p>
        </div>
      </div>
    </div>
  );
}
