import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CircleCheck } from "lucide-react";

import CardHeader from "../CardHeader";

import { loanProductConfigTabs, loanProductConfigTabContent } from "@/lib/constants";
import { useTabStore } from "@/lib/store/useTabStore"; // Zustand store
import { SkeletonTableShimmer } from "../ui/skeleton-table";
import ProgressBar from "../ProgressBar";
import LoanProductTables from "./LoanProductTables";


const LoanProductConfig = () => {
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200);
  
      return () => clearTimeout(timer);
    }, []);

  const location = useLocation();
  const navigate = useNavigate();

  // Extract tab from hash (without the `#`)
  const currentHash = location.hash.replace("#", "") || "productInfo";
  const [activeTab, setActiveTab] = useState(currentHash);

  // Get and update submittedTabs from Zustand store
  const { submittedTabs, markTabAsSubmitted } = useTabStore();

  // Sync active tab with hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") || "productInfo";
    setActiveTab(hash);
  }, [location.hash]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`#${tab}`); // update URL hash
  };

  const handleFormSubmit = (tab: string) => {
    markTabAsSubmitted(tab); // Mark tab as submitted
  };

  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader title="Loan Product Configuration" />
      {loading ? (
        <Card className="w-[67rem] mt-40">
          <CardContent>
            <SkeletonTableShimmer rows={2} columns={3} />
          </CardContent>
        </Card>
      ) : (<Tabs
            value={activeTab}
            onValueChange={handleTabChange}
          >
            <TabsList>
              {loanProductConfigTabs.map((tab) => (
                <TabsTrigger className="bre-tabs" value={tab.key} key={tab.key}>
                  <div className="flex items-center space-x-2">
                    {submittedTabs.includes(tab.key) && (
                      <CircleCheck className="text-green-500 text-sm" />
                    )}
                    <span>{tab.name}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {loanProductConfigTabContent.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <LoanProductTables
                  title={tab.title}
                  subtitle={tab.subtitle}
                  navTo={tab.navTo}
                  paramsArr={tab.paramsArr}
                  onSubmit={() => handleFormSubmit(tab.value)} // Pass the submission callback
                />
              </TabsContent>
            ))}
          </Tabs>)}
        
    </div>
  );
};

export default LoanProductConfig;
