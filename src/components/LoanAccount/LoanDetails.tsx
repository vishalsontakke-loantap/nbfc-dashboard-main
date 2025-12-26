import { useState } from 'react';
import { LoanHeader } from '../LoanHeader';
import { CustomerMetaInfo } from '../CustomerMetaInfo';
import { LoanInformations } from '../LoanInformations';
import CollectionsTable from "../CollectionsTable";
import { UserInformations } from '../UserInformations';
import { GoldSecorInformation } from '../GoldSecorInformation';
import { Attachments } from '../Attachments';
import { Payments } from '../Payments';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetLoanAccountAppDetailsQuery } from '@/redux/features/loan/loanApi';
import DetailsViewSkeleton from '../DetailsViewSkeleton';
import { RepaymentSchedule } from './RepaymentSchedule';
import LoanStatement from './LoanStatement';
import { Documents } from './Documents';

// Navigation tabs
const tabs = [
  'Dashboard',
  'Detailed Loan Info',
  'Repayments',
  'Statement',
  'Documents',
  'Settings'
];

function LoanDetails() {
  const [activeTab, setActiveTab] = useState('Dashboard');

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
    <div className="min-h-screen bg-[#c3eeff] ">
      <div className="max-w-[1600px] mx-auto p-3">
        {/* Header Section */}
        <LoanHeader
          customer_name={loanData?.customer_name}
          loan_status={loanData?.loan_status}
          loan_account_number={loanData?.loan_account_number}
          bank_loan_date={loanData?.bank_loan_date}
          sanction_limit={loanData?.sanction_limit}
          mobile_number={loanData?.mobile_number}
          interestRate={loanData?.blended_interest}
          loan_tenure={loanData?.loan_tenure}
          nbfc_ref_no={loanData?.nbfc_ref_no}
        />

        {/* Navigation Tabs */}
        <div className="grid grid-cols-[1fr_380px] gap-3">
          {/* LEFT COLUMN */}
          <div >
            {/* TAB NAVBAR */}
            <div className="bg-white shadow-sm overflow-hidden rounded-t-md">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-sm font-medium transition-colors relative
                    ${activeTab === tab
                        ? "text-gray-900 bg-white"
                        : "text-gray-500 hover:text-gray-700 bg-gray-50"
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

            {/* TAB CONTENT */}
            {activeTab === "Dashboard" && (
              <>
                <LoanInformations />
                <CollectionsTable />
              </>
            )}
            {activeTab == "Detailed Loan Info" && (
              <>
              
                <UserInformations userInfo={userInfo} />
                <GoldSecorInformation goldSecorInfo={goldSecorInfo} />
              </>
            )}

            {activeTab === "Repayments" && <RepaymentSchedule />}
            {activeTab === "Statement" && <LoanStatement />}
            {activeTab === "Documents" && <Documents />}

            {activeTab !== "Dashboard" && activeTab !== "Repayments" && activeTab !== "Statement" && (
              <div className="bg-white shadow-sm p-8 text-center ">
                <p className="text-gray-500">
                  Content for <span className="font-medium">{activeTab}</span> tab
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — FIXED WIDTH */}
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
