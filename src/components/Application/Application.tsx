import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CircleCheck } from "lucide-react";

import CardHeader from "../CardHeader";


import { breConfigTabs, breConfigTabContent, applicationsTabs } from "@/lib/constants";
import { useTabStore } from "@/lib/store/useTabStore"; // Zustand store
import { SkeletonTableShimmer } from "../ui/skeleton-table";
import PendingApplication from "../Application/PendingApplications";
import RejectedApplication from "../Application/RejectedApplications";
import ApprovedApplication from "../Application/ApprovedApplications";


const Application = () => {
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
  const currentHash = location.hash.replace("#", "") || "bureau";
  const [activeTab, setActiveTab] = useState(currentHash);

  // Get and update submittedTabs from Zustand store
  const { submittedTabs, markTabAsSubmitted } = useTabStore();

  // Sync active tab with hash
  useEffect(() => {
    const hash = location.hash.replace("#", "") || "pending";
    setActiveTab(hash);
  }, [location.hash]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`#${tab}`); // update URL hash
  };

  const handleFormSubmit = (tab: string) => {
    markTabAsSubmitted(tab); // Mark the tab as submitted
  };

  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader title="BRE Configuration" />
      {loading ? (
        <Card className="w-[67rem] mt-40">
          <CardContent>
            <SkeletonTableShimmer rows={4} columns={3} />
          </CardContent>
        </Card>
      ):(<Tabs
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <TabsList>
            {applicationsTabs.map((tab) => (
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
            <TabsContent value={'pending'}>
              <PendingApplication/>
            </TabsContent>
            <TabsContent value={'rejected'}>
              <RejectedApplication/>
            </TabsContent>
            <TabsContent value={'approved'}>
              <ApprovedApplication/>
            </TabsContent>
        </Tabs>)}
    </div>
  );
};

export default Application;