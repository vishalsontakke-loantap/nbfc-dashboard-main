import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useGetActivitiesByModuleQuery } from "@/redux/features/activity/activityApi";
import { EmptyContentState } from "../Error/EmptyContentState";


/* ================= TYPES ================= */

type TabType = "users" | "bre" | "roles" | "lendingRates" | "nbfc";

interface ActivityLog {
  id: string;
  user: string;
  activityType: "ADD" | "UPDATE" | "DELETE";
  details?: Record<string, any>;
  timestamp: string;
}

/* ============== MODULE MAP ============== */

const moduleMap: Record<TabType, string> = {
  users: "users",
  bre: "bre",
  roles: "roles",
  lendingRates: "lending_rates",
  nbfc: "nbfc",
};

/* ============== COMPONENT ============== */

const Activities: React.FC = () => {
  const [tab, setTab] = useState<TabType>("users");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  /* ============== API CALL ============== */

  const { data, isLoading, isFetching } =
    useGetActivitiesByModuleQuery({
      module: moduleMap[tab],
      page: currentPage,
    });

  /* ============== MAP API → UI ============== */

  const activityLogs: ActivityLog[] =
    data?.data?.map((item) => ({
      id: String(item.id),
      user: `${item.creator.first_name} ${item.creator.last_name}`,
      activityType:
        item.activity_type === "insert"
          ? "ADD"
          : item.activity_type === "update"
          ? "UPDATE"
          : "DELETE",
      details: item.request_data,
      timestamp: item.created_at,
    })) ?? [];

  const totalPages = data?.last_page ?? 1;

  /* ============== HELPERS ============== */

  const getActivityBadge = (type: ActivityLog["activityType"]) => {
    switch (type) {
      case "ADD":
        return <Badge className="bg-green-500">ADD</Badge>;
      case "UPDATE":
        return <Badge className="bg-yellow-500">UPDATE</Badge>;
      case "DELETE":
        return <Badge className="bg-red-500">DELETE</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const renderActivityDetails = (log: ActivityLog) => (
    <div className="space-y-2 mt-4 px-8">
      <h4 className="text-sm font-semibold mb-2">Details</h4>
      <div className="space-y-1 text-sm">
        {Object.entries(log.details || {}).map(([key, value]) => (
          <div key={key} className="flex gap-4">
            <span className="text-gray-600 min-w-[160px]">{key}</span>
            <span className="text-gray-900">{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  /* ============== RENDER ============== */

  return (
    <div className="space-y-4 mx-4">
      <h1 className="text-2xl font-bold text-gray-900">Activities</h1>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Tabs
            value={tab}
            onValueChange={(value) => {
              setTab(value as TabType);
              setCurrentPage(1);
              setExpandedId(null);
            }}
          >
            <TabsList className="border-b rounded-none bg-transparent p-0 h-auto">
              {Object.keys(moduleMap).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-none border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-gray-600"
                >
                  {key.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={tab} className="p-4 space-y-4">
              {isLoading || isFetching ? (
                <p className="text-center text-gray-500">
                  Loading activities...
                </p>
              ) : activityLogs.length === 0 ? (
                <div className="flex justify-center py-8">
                  <EmptyContentState 
                    title="No Activities Found"
                    message="There are no activities to display."
                  />
                </div>
              ) : (
                activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === log.id ? null : log.id
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {expandedId === log.id ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>

                        <span className="text-sm font-medium text-gray-700">
                          {log.user}
                        </span>
                        <span className="text-xs text-gray-500">—</span>
                        {getActivityBadge(log.activityType)}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-50 text-green-600"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-50 text-red-600"
                        >
                          Reject
                        </Button>
                      </div>
                    </div>

                    {expandedId === log.id && renderActivityDetails(log)}
                  </div>
                ))
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center py-6 gap-4">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        className={
                          currentPage === 1
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationLink
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={
                          currentPage === i + 1 ? "page-active" : ""
                        }
                      >
                        {i + 1}
                      </PaginationLink>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.min(totalPages, p + 1)
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activities;
