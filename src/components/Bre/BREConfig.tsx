import { use, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleCheck } from "lucide-react";
import CardHeader from "../CardHeader";
import { breConfigTabs, breConfigTabContent } from "@/lib/constants";
import { useTabStore } from "@/lib/store/useTabStore";
import { SkeletonTableShimmer } from "../ui/skeleton-table";
import BRETables from "./BRETables";

import { useGetBreByIdQuery } from "@/redux/features/bre/breApi";
import { mapRawArrayToParams } from "@/utils/breHelpers";
import { useDispatch, useSelector } from "react-redux";
import { setBreData } from "@/redux/features/bre/breSlice";
import type { RootState } from "@/redux/store";

const BREConfig = () => {
  const { id } = useParams();
  
  // ⬇ RTK Query data + loading + error
  const { data: breResult, isLoading, error } = useGetBreByIdQuery(Number(id));

  const dispatch = useDispatch();

  // ⬇ Store in Redux
  useEffect(() => {
    if (breResult?.data) {
      dispatch(setBreData(breResult.data));
    }
  }, [breResult, dispatch]);

  // ⬇ Read from Redux
  const breData = useSelector((state: RootState) => state.bre.data);

  const location = useLocation();
  const navigate = useNavigate();

  const currentHash = location.hash.replace("#", "") || "bureau";
  const [activeTab, setActiveTab] = useState(currentHash);

  // Zustand tab store
  const { submittedTabs, markTabAsSubmitted } = useTabStore();
  const onSubmitByTab = useMemo(() => {
    return Object.fromEntries(
      breConfigTabContent.map(t => [t.value, () => markTabAsSubmitted(t.value)])
    );
  }, [markTabAsSubmitted]);

  useEffect(() => {
    const hash = location.hash.replace("#", "") || "bureau";
    setActiveTab(hash);
  }, [location.hash]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    navigate(`#${tab}`);
  }, [navigate]);

  // ⬇ Map params from Redux data
  const mappedParamsByTab: Record<string, any[]> = useMemo(() => {
    return {
      bureau: mapRawArrayToParams(breData?.bureau ?? []),
      bank_statement: mapRawArrayToParams(breData?.bank_statement ?? []),
      kyc: mapRawArrayToParams(breData?.kyc ?? []),
      income: mapRawArrayToParams(breData?.income ?? []),
      occupation: mapRawArrayToParams(breData?.occupation ?? []),
      demographic: mapRawArrayToParams(breData?.demographic ?? []),
    };
  }, [breData]);

  // ⬇ Handle loading
  if (isLoading) {
    return (
      <Card className="w-[67rem] mt-40">
        <CardContent>
          <SkeletonTableShimmer rows={4} columns={3} />
        </CardContent>
      </Card>
    );
  }

  // ⬇ Handle API error
  if (error) {
    return <div className="text-red-500">Failed to load BRE configuration.</div>;
  }

  // ⬇ Render UI normally
  return (
    <div className="flex flex-col space-y-4 p-5">
      <CardHeader title="BRE Configuration" />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          {breConfigTabs.map((tab) => (
            <TabsTrigger className="bre-tabs" value={tab.value} key={tab.value}>
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
                onSubmit={onSubmitByTab[tab.value]}
              />
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  );
};

export default BREConfig;
