import { useCallback, useEffect, useMemo, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CircleCheck } from "lucide-react";

import CardHeader from "../CardHeader";


import { breConfigTabs, breConfigTabContent } from "@/lib/constants";
import { useTabStore } from "@/lib/store/useTabStore"; // Zustand store
import { SkeletonTableShimmer } from "../ui/skeleton-table";
import BRETables from "./BRETables";
import { useGetBreQuery } from "@/redux/features/bre/breApi";
import { mapRawArrayToParams } from "@/utils/breHelpers";

const BREConfig = () => {
  const [loading, setLoading] = useState(false);
  // const { data: breResult, isLoading, isFetching, error, refetch } = useGetBreQuery();
  // console.log('BRE RESULT', breResult);
  const breData: Record<string, any[]> = {
    "bureau": [
      { "key": "creditScore", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "bureauVintage", "is_mandatory": true, "weightage": "8.00", "value": "30" },
      { "key": "dpd", "is_mandatory": true, "weightage": "8.00", "value": "10" },
      { "key": "numOfEnquiries", "is_mandatory": true, "weightage": "8.00", "value": "5" },
      { "key": "activeLoans", "is_mandatory": true, "weightage": "8.00", "value": "3" },
      { "key": "writeOffSettlement", "is_mandatory": true, "weightage": "8.00", "value": "5000" },
    ],
    "bank_statement": [
      { "key": "avgMonthlyBalance", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "monthlyCredits", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "foir", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "debitBounceCount", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "overdraftInstances", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "eodBalanceThreshold", "is_mandatory": true, "weightage": "8.00", "value": "750" },
    ],
    "kyc": [
      { "key": "panVerification", "is_mandatory": true, "weightage": "8.00", "value": null },
      { "key": "udyamVerification", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "aadharAuth", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "videoKyc", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "minAge", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "maxAge", "is_mandatory": true, "weightage": "8.00", "value": "750" },
    ],
    "income": [
      { "key": "itrFiling", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "gstFiling", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "sourceOfIncome", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "consistency", "is_mandatory": true, "weightage": "8.00", "value": "750" },
    ],
    "occupation": [
      { "key": "employerType", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "employmentStability", "is_mandatory": true, "weightage": "8.00", "value": "750" },
      { "key": "businessVintage", "is_mandatory": true, "weightage": "8.00", "value": "750" },
    ],
    "demographic": [
      { "key": "pinCodeRiskMapping", "is_mandatory": true, "weightage": "8.00", "value": [111111, 222222, 333333] }
    ]

  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  // Extract tab from hash (without the `#`)
  const currentHash = location.hash.replace("#", "") || "bureau";
  const [activeTab, setActiveTab] = useState(currentHash);

  // Get and update submittedTabs from Zustand store
  const { submittedTabs, markTabAsSubmitted } = useTabStore();
  const onSubmitByTab = useMemo(() => {
    return Object.fromEntries(breConfigTabContent.map(t => [t.value, () => markTabAsSubmitted(t.value)]));
  }, [breConfigTabContent, markTabAsSubmitted]);

  // then pass onSubmit={onSubmitByTab[tab.value]}

  // Sync active tab with hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") || "bureau";
    setActiveTab(hash);
  }, [location.hash]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    navigate(`#${tab}`); // update URL hash
  }, [navigate]);

  const handleFormSubmit = (tab: string) => {
    console.log("TAB", tab);
    markTabAsSubmitted(tab); // Mark the tab as submitted
  };
  const mappedParamsByTab: Record<string, any[]> = useMemo(() => {
    // map once per breData change
    return {
      bureau: mapRawArrayToParams(breData?.bureau ?? []),
      bank_statement: mapRawArrayToParams(breData?.bank_statement ?? []),
      kyc: mapRawArrayToParams(breData?.kyc ?? []),
      income: mapRawArrayToParams(breData?.income ?? []),
      occupation: mapRawArrayToParams(breData?.occupation ?? []),
      demographic: mapRawArrayToParams(breData?.demographic ?? []),
    };
  }, [breData]);

  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader title="BRE Configuration" />
      {loading ? (
        <Card className="w-[67rem] mt-40">
          <CardContent>
            <SkeletonTableShimmer rows={4} columns={3} />
          </CardContent>
        </Card>
      ) : (<Tabs
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList>
          {breConfigTabs.map((tab) => (
            <TabsTrigger
              className="bre-tabs"
              value={tab.value}
              key={tab.value}
            >
              <div className="flex items-center space-x-2">
                {submittedTabs.includes(tab.value) && (
                  <CircleCheck className="text-green-500 text-sm" />
                )}
                <span>{tab.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {breConfigTabContent.map((tab) => {
          const paramsArr = mappedParamsByTab[tab.value] || [];
          return (
            <TabsContent key={tab.value} value={tab.value}>
              <BRETables
                title={tab.title}
                subtitle={tab.subtitle}
                navTo={tab.navTo}
                paramsArr={paramsArr}
                onSubmit={onSubmitByTab[tab.value]} // Pass the submission callback
              />
            </TabsContent>
          )
        })}
      </Tabs>)}
    </div>
  );
};

export default BREConfig;