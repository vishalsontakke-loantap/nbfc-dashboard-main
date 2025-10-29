import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../ui/PageHeader";
import CardHeadline from "../CardHeadline";
// import SegmentsCard from "../SegmentsCard";
// import { StatCard } from "../StatCard";
import {
  TrendingUp,
  Users,
  FileCheck,
  XCircle,
  DollarSign,
  ArrowRight,
} from "lucide-react";
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
} from "recharts";
import { StatCard } from "../ui/StatCard";

const conversionData = [
  { name: "Leads", value: 1250 },
  { name: "Submitted", value: 980 },
  { name: "Approved", value: 654 },
  { name: "Disbursed", value: 587 },
];

const nbfcPerformanceData = [
  { name: "Muthoot Finance", value: 245, color: "#0B5FFF" },
  { name: "MAS Financial", value: 189, color: "#00A676" },
  { name: "Capri Global", value: 153, color: "#FFB020" },
  { name: "Others", value: 87, color: "#8B5CF6" },
];

const monthlyTrendData = [
  { month: "Jan", leads: 85, disbursed: 58 },
  { month: "Feb", leads: 92, disbursed: 64 },
  { month: "Mar", leads: 108, disbursed: 72 },
  { month: "Apr", leads: 125, disbursed: 87 },
  { month: "May", leads: 134, disbursed: 95 },
  { month: "Jun", leads: 142, disbursed: 102 },
];

const Dashboard = () => {
  return (
    <div className="grid place-items-center min-h-[89.5dvh] p-5">
      <Card className="scale-95 w-full h-full flex flex-col p-10">
        {/* Section Title */}
        <CardHeadline title="Dashboard Overview" />

        <CardContent className="space-y-6">
          {/* Header */}
          <PageHeader
            title="Dashboard"
            description="Co-Lending Module Overview - Real-time insights and performance metrics"
          />

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-to-r from-[#0B5FFF] to-[#00A676] text-white shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-white mb-2">Quick Actions</h3>
                <p className="text-blue-100">
                  Streamline your workflow with instant access to key features
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Button
                  variant="secondary"
                  className="bg-white text-[#0B5FFF] hover:bg-blue-50"
                >
                  View Leads <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Manage NBFCs
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  View Reports
                </Button>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              title="Total Leads"
              value="1,250"
              icon={Users}
              trend={{ value: "+12.5%", isPositive: true }}
              color="primary"
            />
            <StatCard
              title="Approved"
              value="654"
              icon={FileCheck}
              trend={{ value: "+8.2%", isPositive: true }}
              color="success"
            />
            <StatCard
              title="Pending"
              value="326"
              icon={TrendingUp}
              color="warning"
            />
            <StatCard
              title="Rejected"
              value="183"
              icon={XCircle}
              trend={{ value: "-3.1%", isPositive: false }}
              color="destructive"
            />
            <StatCard
              title="Disbursed"
              value="587"
              icon={DollarSign}
              trend={{ value: "+15.3%", isPositive: true }}
              color="secondary"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Lead Conversion Funnel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" stroke="#64748B" />
                  <YAxis stroke="#64748B" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#0B5FFF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* NBFC Distribution */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">NBFC Performance Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={nbfcPerformanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: any) => `${props.name}: ${(props.percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {nbfcPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold">Monthly Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#0B5FFF"
                  strokeWidth={2}
                  name="Total Leads"
                />
                <Line
                  type="monotone"
                  dataKey="disbursed"
                  stroke="#00A676"
                  strokeWidth={2}
                  name="Disbursed"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="mb-4 font-semibold">Recent Activity</h3>
            <div className="space-y-4">
              {[
                {
                  action: "New lead created",
                  nbfc: "Muthoot Finance",
                  time: "5 mins ago",
                },
                {
                  action: "Application approved",
                  nbfc: "MAS Financial",
                  time: "12 mins ago",
                },
                {
                  action: "Document verified",
                  nbfc: "Capri Global",
                  time: "23 mins ago",
                },
                {
                  action: "Loan disbursed",
                  nbfc: "Muthoot Finance",
                  time: "1 hour ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.nbfc}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Decorative Segment */}
          {/* <SegmentsCard
            imgSrc="/images/pool_buyout_segment.svg"
            imgAlt="Pool Buyout Segment"
            badge="overview"
            heading="Dashboard Summary"
            subtext="A complete visual overview of co-lending activity."
          /> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
