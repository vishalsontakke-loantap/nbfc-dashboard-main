import React, { useState } from "react";
import Tabs from "../Tabs";
import ConfigForm from "../ConfigForm";

const BreConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Bureau" },
    { id: 2, label: "Bank Statement" },
    { id: 3, label: "KYC" },
    { id: 4, label: "Income" },
    { id: 5, label: "Occupation" },

    { id: 6, label: "Collateral" }, 
    { id: 7, label: "NTC Details" },
    { id: 8, label: "ETC Details" },
    { id: 9, label: "Demographic" },
  ];

  const bureauParams = [
    { label: "Credit Score", value: 700, weightage: 5, mandatory: true },
    { label: "Bureau Vintage", value: 18, weightage: 5, mandatory: true },
    { label: "DPD (Days Past Due)", value: 30, weightage: 5, mandatory: true },
  ];

  const bankParams = [
    { label: "Average Monthly Balance", value: "₹10,000", weightage: 5, mandatory: true },
    { label: "Monthly Credits", value: "₹30,000", weightage: 5, mandatory: true },
    { label: "FOIR", value: "60%", weightage: 5, mandatory: true },
  ];

  return (
    <div className="p-6">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 1 && (
        <ConfigForm title="Bureau Rules" initialParams={bureauParams} />
      )}
      {activeTab === 2 && (
        <ConfigForm title="Bank Statement" initialParams={bankParams} />
      )}
      {activeTab === 3 && (
        <ConfigForm
          title="KYC"
          initialParams={[
            { label: "PAN Verification", value: "85%", weightage: 5, mandatory: true },
            { label: "Aadhaar Authentication", value: "85%", weightage: 5, mandatory: true },
          ]}
        />
      )}
    </div>
  );
};

export default BreConfiguration;
