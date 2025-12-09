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

interface ActivityLog {
  id: string;
  user: string;
  activityType: "ADD" | "UPDATE" | "DELETE";
  action?: string;
  details?: Record<string, any>;
  previousDetails?: Record<string, any>;
  timestamp: string;
}

interface ActivityFilter {
  tab: "users" | "bre" | "roles" | "lendingRates";
}

const Activities: React.FC = () => {
  const [filter, setFilter] = useState<ActivityFilter>({ tab: "users" });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for Users tab
  const userActivityLogs: ActivityLog[] = [
    {
      id: "1",
      user: "user",
      activityType: "ADD",
      details: {
        firstName: "new",
        lastName: "user",
        userName: "2232",
        emailId: "test@test.com",
        mobileNumber: "9011222233",
        role: "ADMIN-CHECKER",
        branchCode: "011",
        branchRole: "assistant_manager",
      },
      timestamp: "2024-12-08T10:30:00Z",
    },
    {
      id: "2",
      user: "user",
      activityType: "UPDATE",
      details: {
        userId: "U9641570-2b2-2ff9-b3b3-aaca7a5199da",
      },
      previousDetails: {
        firstName: "Vijaya",
        lastName: "Kumar",
        role: "GENERAL",
        branchCode: "098",
        branchRole: "manager",
        userName: "vijaya",
        emailId: "vijay.sakharw@comnovabank.in",
        mobileNumber: "9049954411",
      },
      timestamp: "2024-12-08T09:15:00Z",
    },
    {
      id: "3",
      user: "user",
      activityType: "DELETE",
      details: {
        userId: "U9641570-2b2-2ff9-b3b3-aaca7a5199da",
        userName: "vijaya",
      },
      timestamp: "2024-12-08T08:45:00Z",
    },
  ];

  // Mock data for BRE tab
  const breActivityLogs: ActivityLog[] = [
    {
      id: "b1",
      user: "admin",
      activityType: "ADD",
      details: {
        ruleName: "Income Verification Rule",
        ruleType: "MANDATORY",
        condition: "income >= 50000",
        action: "APPROVE",
        priority: "HIGH",
      },
      timestamp: "2024-12-08T14:20:00Z",
    },
    {
      id: "b2",
      user: "compliance_user",
      activityType: "UPDATE",
      details: {
        ruleId: "BRE-2024-001",
      },
      previousDetails: {
        ruleName: "Loan Amount Check",
        threshold: "500000",
        newThreshold: "750000",
        updatedBy: "compliance_user",
      },
      timestamp: "2024-12-08T13:45:00Z",
    },
    {
      id: "b3",
      user: "manager",
      activityType: "UPDATE",
      details: {
        ruleId: "BRE-2024-005",
      },
      previousDetails: {
        ruleName: "Credit Score Rule",
        minScore: "600",
        newMinScore: "650",
      },
      timestamp: "2024-12-08T11:30:00Z",
    },
  ];

  // Mock data for Roles tab
  const roleActivityLogs: ActivityLog[] = [
    {
      id: "r1",
      user: "superadmin",
      activityType: "ADD",
      details: {
        roleName: "Loan Officer",
        permissions: ["view_loans", "approve_loans", "create_applications"],
        description: "Can manage loan approvals",
        status: "ACTIVE",
      },
      timestamp: "2024-12-08T15:10:00Z",
    },
    {
      id: "r2",
      user: "admin",
      activityType: "UPDATE",
      details: {
        roleId: "ROLE-2024-002",
      },
      previousDetails: {
        roleName: "Branch Manager",
        oldPermissions: ["view_reports", "manage_users"],
        newPermissions: ["view_reports", "manage_users", "approve_disbursement"],
      },
      timestamp: "2024-12-08T12:55:00Z",
    },
    {
      id: "r3",
      user: "admin",
      activityType: "DELETE",
      details: {
        roleId: "ROLE-2024-001",
        roleName: "Intern",
      },
      timestamp: "2024-12-08T10:15:00Z",
    },
  ];

  // Mock data for Lending Rates tab
  const lendingRateActivityLogs: ActivityLog[] = [
    {
      id: "lr1",
      user: "finance_manager",
      activityType: "UPDATE",
      details: {
        rateType: "MCLR",
      },
      previousDetails: {
        rateType: "MCLR",
        tenor: "Overnight",
        oldRate: "5.90",
        newRate: "6.15",
        effectiveFrom: "2024-12-09",
      },
      timestamp: "2024-12-08T16:45:00Z",
    },
    {
      id: "lr2",
      user: "finance_manager",
      activityType: "UPDATE",
      details: {
        rateType: "RLLR",
      },
      previousDetails: {
        repoRate: "6.50",
        bankSpread: "2.00",
        creditRiskPremium: "0.50",
        finalRate: "9.00",
        effectiveFrom: "2024-12-10",
      },
      timestamp: "2024-12-08T15:30:00Z",
    },
    {
      id: "lr3",
      user: "finance_head",
      activityType: "UPDATE",
      details: {
        rateType: "MCLR",
      },
      previousDetails: {
        tenor: "1 Year",
        oldRate: "6.45",
        newRate: "6.65",
        effectiveFrom: "2024-12-12",
      },
      timestamp: "2024-12-08T14:00:00Z",
    },
  ];

  // Get activity logs based on selected tab
  const getActivityLogsForTab = () => {
    switch (filter.tab) {
      case "bre":
        return breActivityLogs;
      case "roles":
        return roleActivityLogs;
      case "lendingRates":
        return lendingRateActivityLogs;
      case "users":
      default:
        return userActivityLogs;
    }
  };

  const activityLogs = getActivityLogsForTab();

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "ADD":
        return <Badge className="bg-green-500">{type}</Badge>;
      case "UPDATE":
        return <Badge className="bg-yellow-500">{type}</Badge>;
      case "DELETE":
        return <Badge className="bg-red-500">{type}</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = activityLogs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(activityLogs.length / itemsPerPage);

  // Generate pagination range
  const generatePaginationRange = () => {
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  };

  const renderActivityDetails = (log: ActivityLog) => {
    return (
        <div className="space-y-4 mt-4 px-8">
          {/* <Card className="scale-95 w-full h-full flex items-center p-10"></Card> */}
        {log.activityType === "ADD" && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Key</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(log.details || {}).map(([key, value]) => (
                <div key={key} className="flex gap-4">
                  <span className="text-gray-600 min-w-[150px]">{key}</span>
                  <span className="text-gray-900">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {log.activityType === "UPDATE" && (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold mb-2">Key</h4>
              <div className="space-y-1 text-sm">
                {Object.entries(log.details || {}).map(([key, value]) => (
                  <div key={key} className="flex gap-4">
                    <span className="text-gray-600 min-w-[150px]">{key}</span>
                    <span className="text-gray-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Value</h4>
              <div className="space-y-1 text-sm">
                {log.previousDetails && Object.entries(log.previousDetails).map(([key, value]) => (
                  <div key={key} className="flex gap-4">
                    <span className="text-gray-600 min-w-[150px]">{key}</span>
                    <span className="text-gray-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {log.activityType === "DELETE" && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Key</h4>
            <div className="space-y-1 text-sm">
              {Object.entries(log.details || {}).map(([key, value]) => (
                <div key={key} className="flex gap-4">
                  <span className="text-gray-600 min-w-[150px]">{key}</span>
                  <span className="text-gray-900">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      {/* <Card/> */}
      </div>
    );
  };

  return (
    <div className="space-y-4 mx-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Tabs
            value={filter.tab}
            onValueChange={(value) =>
              setFilter({ tab: value as ActivityFilter["tab"] })
            }
            className="w-full"
          >
            <TabsList className="border-b rounded-none bg-transparent p-0 h-auto">
              <TabsTrigger
                value="users"
                className="rounded-none border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-gray-600"
              >
                Users
              </TabsTrigger>
              <TabsTrigger
                value="bre"
                className="rounded-none border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-gray-600"
              >
                BRE
              </TabsTrigger>
              <TabsTrigger
                value="roles"
                className="rounded-none border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-gray-600"
              >
                Roles
              </TabsTrigger>
              <TabsTrigger
                value="lendingRates"
                className="rounded-none border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 text-gray-600"
              >
                Lending Rates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="p-4 space-y-4">
              {paginatedLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === log.id ? null : log.id)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {expandedId === log.id ? (
                          <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-600" />
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
                        variant="outline"
                        size="sm"
                        className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>

                  {expandedId === log.id && renderActivityDetails(log)}
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center py-4 space-x-2 mt-6">
                <div className="min-w-[100px] text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={
                          currentPage > 1
                            ? "mr-2 cursor-pointer"
                            : "opacity-50 pointer-events-none mr-2"
                        }
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      />
                    </PaginationItem>

                    {generatePaginationRange().map((page) => (
                      <PaginationLink
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`${
                          currentPage === page
                            ? "page-active"
                            : "page-inactive"
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        className={
                          currentPage < totalPages
                            ? "ml-2 cursor-pointer"
                            : "opacity-50 pointer-events-none ml-2"
                        }
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>

            <TabsContent value="bre" className="p-4 space-y-4">
              {paginatedLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === log.id ? null : log.id)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {expandedId === log.id ? (
                          <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-600" />
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
                        variant="outline"
                        size="sm"
                        className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>

                  {expandedId === log.id && renderActivityDetails(log)}
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center py-4 space-x-2 mt-6">
                <div className="min-w-[100px] text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={
                          currentPage > 1
                            ? "mr-2 cursor-pointer"
                            : "opacity-50 pointer-events-none mr-2"
                        }
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      />
                    </PaginationItem>

                    {generatePaginationRange().map((page) => (
                      <PaginationLink
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`${
                          currentPage === page
                            ? "page-active"
                            : "page-inactive"
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        className={
                          currentPage < totalPages
                            ? "ml-2 cursor-pointer"
                            : "opacity-50 pointer-events-none ml-2"
                        }
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>

            <TabsContent value="roles" className="p-4 space-y-4">
              {paginatedLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === log.id ? null : log.id)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {expandedId === log.id ? (
                          <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-600" />
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
                        variant="outline"
                        size="sm"
                        className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>

                  {expandedId === log.id && renderActivityDetails(log)}
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center py-4 space-x-2 mt-6">
                <div className="min-w-[100px] text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={
                          currentPage > 1
                            ? "mr-2 cursor-pointer"
                            : "opacity-50 pointer-events-none mr-2"
                        }
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      />
                    </PaginationItem>

                    {generatePaginationRange().map((page) => (
                      <PaginationLink
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`${
                          currentPage === page
                            ? "page-active"
                            : "page-inactive"
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        className={
                          currentPage < totalPages
                            ? "ml-2 cursor-pointer"
                            : "opacity-50 pointer-events-none ml-2"
                        }
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>

            <TabsContent value="lendingRates" className="p-4 space-y-4">
              {paginatedLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === log.id ? null : log.id)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {expandedId === log.id ? (
                          <ChevronUp size={20} className="text-gray-600" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-600" />
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
                        variant="outline"
                        size="sm"
                        className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>

                  {expandedId === log.id && renderActivityDetails(log)}
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center py-4 space-x-2 mt-6">
                <div className="min-w-[100px] text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className={
                          currentPage > 1
                            ? "mr-2 cursor-pointer"
                            : "opacity-50 pointer-events-none mr-2"
                        }
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      />
                    </PaginationItem>

                    {generatePaginationRange().map((page) => (
                      <PaginationLink
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`${
                          currentPage === page
                            ? "page-active"
                            : "page-inactive"
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        className={
                          currentPage < totalPages
                            ? "ml-2 cursor-pointer"
                            : "opacity-50 pointer-events-none ml-2"
                        }
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
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
