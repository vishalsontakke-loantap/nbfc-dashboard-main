import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../ui/PageHeader";
import { Download, FileText, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import SegmentsCard from "../SegmentsCard";
import CardHeadline from "../CardHeadline";

// --- Data Sets ---
const conversionFunnelData = [
  { stage: "Total Leads", count: 1250, percentage: 100 },
  { stage: "Submitted", count: 980, percentage: 78 },
  { stage: "Under Review", count: 756, percentage: 60 },
  { stage: "Approved", count: 654, percentage: 52 },
  { stage: "Disbursed", count: 587, percentage: 47 },
];

const nbfcPerformanceData = [
  { nbfc: "Muthoot Finance", leads: 245, approved: 198, disbursed: 187, approvalRate: 81 },
  { nbfc: "MAS Financial", leads: 189, approved: 142, disbursed: 128, approvalRate: 75 },
  { nbfc: "Capri Global", leads: 153, approved: 98, disbursed: 82, approvalRate: 64 },
  { nbfc: "Bajaj Finserv", leads: 87, approved: 56, disbursed: 45, approvalRate: 64 },
];

const collectionEfficiencyData = [
  { month: "May", collected: 85, target: 100 },
  { month: "Jun", collected: 88, target: 100 },
  { month: "Jul", collected: 92, target: 100 },
  { month: "Aug", collected: 90, target: 100 },
  { month: "Sep", collected: 94, target: 100 },
  { month: "Oct", collected: 96, target: 100 },
];

const breTrendsData = [
  { month: "May", avgScore: 68, approvalRate: 72 },
  { month: "Jun", avgScore: 71, approvalRate: 75 },
  { month: "Jul", avgScore: 73, approvalRate: 78 },
  { month: "Aug", avgScore: 70, approvalRate: 74 },
  { month: "Sep", avgScore: 75, approvalRate: 80 },
  { month: "Oct", avgScore: 77, approvalRate: 82 },
];

const productDistributionData = [
  { name: "Personal Loan", value: 520, color: "#0B5FFF" },
  { name: "Business Loan", value: 340, color: "#00A676" },
  { name: "Home Loan", value: 210, color: "#FFB020" },
  { name: "Vehicle Loan", value: 180, color: "#8B5CF6" },
];

// --- Main Component ---
const Reports = () => {
  return (
    <div className="grid place-items-center min-h-[89.5dvh] p-5">
      <Card className="scale-95 w-full h-full flex flex-col items-start p-10">
        <CardHeadline title="Reports" />
        <CardContent className="w-full space-y-6">
          <PageHeader
            title="Reports & Analytics"
            description="Comprehensive insights and performance metrics"
            actions={
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Schedule Report
                </Button>
                <Button className="bg-[#0B5FFF] hover:bg-[#0B5FFF]/90">
                  <Download className="mr-2 h-4 w-4" />
                  Export All
                </Button>
              </div>
            }
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: "Conversion Rate",
                value: "47%",
                color: "#0B5FFF",
                bg: "from-blue-50 to-white",
              },
              {
                label: "Avg BRE Score",
                value: "77/100",
                color: "#00A676",
                bg: "from-teal-50 to-white",
              },
              {
                label: "Collection Rate",
                value: "96%",
                color: "#FFB020",
                bg: "from-amber-50 to-white",
              },
              {
                label: "Avg TAT",
                value: "2.3 days",
                color: "#8B5CF6",
                bg: "from-purple-50 to-white",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className={`p-6 bg-gradient-to-br ${item.bg} border-l-4`}
                style={{ borderLeftColor: item.color }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <TrendingUp className="h-6 w-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{item.label}</p>
                    <h3>{item.value}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Conversion Funnel */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Lead Conversion Funnel</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={conversionFunnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" stroke="#64748B" />
                <YAxis dataKey="stage" type="category" width={120} stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#0B5FFF" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* NBFC Performance + Product Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* NBFC Performance */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>NBFC Performance Metrics</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nbfcPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="nbfc" stroke="#64748B" angle={-15} textAnchor="end" height={80} />
                  <YAxis stroke="#64748B" />
                  <Tooltip contentStyle={{ backgroundColor: "#FFF", border: "1px solid #E2E8F0" }} />
                  <Legend />
                  <Bar dataKey="leads" fill="#0B5FFF" name="Total Leads" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="approved" fill="#00A676" name="Approved" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="disbursed" fill="#FFB020" name="Disbursed" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Product Distribution */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Product Distribution</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {productDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Collection Efficiency */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Collection Efficiency Trends</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={collectionEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip contentStyle={{ backgroundColor: "#FFF", border: "1px solid #E2E8F0" }} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="collected"
                  stackId="1"
                  stroke="#00A676"
                  fill="#00A676"
                  fillOpacity={0.6}
                  name="Collected %"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stackId="2"
                  stroke="#E2E8F0"
                  fill="#E2E8F0"
                  fillOpacity={0.3}
                  name="Target %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* BRE Effectiveness */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>BRE Effectiveness Trends</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={breTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip contentStyle={{ backgroundColor: "#FFF", border: "1px solid #E2E8F0" }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#0B5FFF"
                  strokeWidth={2}
                  name="Avg BRE Score"
                />
                <Line
                  type="monotone"
                  dataKey="approvalRate"
                  stroke="#00A676"
                  strokeWidth={2}
                  name="Approval Rate %"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Placeholder Card
          <SegmentsCard
            imgSrc="/images/pool_buyout_segment.svg"
            imgAlt="Pool Buyout Segment"
            badge="Reports"
            heading="Reports"
            subtext="Reports goes here"
          /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
