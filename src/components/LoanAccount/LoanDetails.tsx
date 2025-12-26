import { useState } from 'react';
import { LoanHeader } from '../LoanHeader';
import { CustomerMetaInfo } from '../CustomerMetaInfo';
import { LoanInformations } from '../LoanInformations';
import { UserInformations } from '../UserInformations';
import { GoldSecorInformation } from '../GoldSecorInformation';
import { Attachments } from '../Attachments';
import { Payments } from '../Payments';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLoanAccountAppDetailsQuery } from '@/redux/features/loan/loanApi';
import DetailsViewSkeleton from '../DetailsViewSkeleton';
import { RepaymentSchedule } from './RepaymentSchedule';

// Navigation tabs
const tabs = [
  'Dashboard',
  'Detailed Loan Info',
  'Repayments',
  'Collections',
  'Documents',
  'Settings'
];

function LoanDetails() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Exact data from the image
  const customerData = {
    name: 'Ramesh Sharam',
    location: 'Chennai, Tamil Nadu',
    status: 'Approved',
    applicationId: 'APP098907890',
    date: '04/10/2025',
    loanAmount: '₹ 1,35,000',
    email: 'Ramesh@gmail.com',
    phone: '8234834394',
    loanType: 'Gold Loan',
    interestRate: '17%',
    tenure: '24 Months',
    loanId: 'MFL0008123'
  };

  const userInfo = {
    pan: 'CLBPM1603D',
    aadhar: '473837283723',
    dob: '22/09/1991, 38 Years',
    maritalStatus: 'Single',
    address: '5, Mangadu, Kanchipuram,',
    pincode: '600122',
    state: 'Tamil Nadu',
    creditScore: 781,
    creditScoreDate: 'as of Mar 2019'
  };

  const goldSecorInfo = {
    pan: 'CLBPM1603D',
    aadhar: '473837283723',
    dob: '22/09/1991, 38 Years',
    maritalStatus: 'Single',
    address: '5, Mangadu, Kanchipuram,',
    pincode: '600122',
    state: 'Tamil Nadu'
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const { data: loanData, isLoading, isError } = useGetLoanAccountAppDetailsQuery(id || "");

  if (isLoading) {
    return <DetailsViewSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header Section */}
        <LoanHeader
          customerName={customerData.name}
          location={customerData.location}
          status={customerData.status}
          applicationId={customerData.applicationId}
          date={customerData.date}
          loanAmount={customerData.loanAmount}
          email={customerData.email}
          phone={customerData.phone}
          loanType={customerData.loanType}
          interestRate={customerData.interestRate}
          tenure={customerData.tenure}
          loanId={customerData.loanId}
        />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === tab
                  ? 'text-gray-900 bg-white'
                  : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_380px] gap-6">
          {/* LEFT COLUMN – changes per tab */}
          <div>
            {activeTab === "Dashboard" && (
              <>
                <LoanInformations />
                <UserInformations userInfo={userInfo} />
                <GoldSecorInformation goldSecorInfo={goldSecorInfo} />
              </>
            )}

            {activeTab === "Repayments" && (
              <RepaymentSchedule />
            )}

            {activeTab !== "Dashboard" && activeTab !== "Repayments" && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">
                  Content for {activeTab} tab
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN – always visible */}
          <div className="space-y-6">
            <Attachments />
            <Payments />
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoanDetails;
