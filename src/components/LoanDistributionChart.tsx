import  { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function LoanDistributionChart() {
  // Dummy Data
  const statewiseData = [
    { name: "Maharashtra", value: 65, color: "#0B5FFF" },
    { name: "Gujarat", value: 15, color: "#00A676" },
    { name: "Madhya Pradesh", value: 10, color: "#FFB020" },
    { name: "Goa", value: 10, color: "#E11D48" },
  ];

  const districtwiseData = [
    { name: "Pune", value: 25, color: "#0B5FFF" },
    { name: "Mumbai", value: 20, color: "#00A676" },
    { name: "Nagpur", value: 18, color: "#FFB020" },
    { name: "Nashik", value: 15, color: "#E11D48" },
    { name: "Aurangabad", value: 12, color: "#6366F1" },
    { name: "Kolhapur", value: 10, color: "#14B8A6" },
  ];

  // State for selected view
  const [view, setView] = useState<"state" | "district">("state");

  const currentData = view === "state" ? statewiseData : districtwiseData;
  return (
    <Card className="p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg ">
            Geographical Concentration
        </h3>

        {/* Filter */}
        <Select onValueChange={(v) => setView(v as "state" | "district")} value={view}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="state">State-wise</SelectItem>
            <SelectItem value="district">District-wise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className="w-full flex flex-col items-center">
        <h4 className="mb-3 font-medium text-gray-800">
          {view === "state" ? "State-wise Loan Distribution" : "District-wise Loan Distribution"}
        </h4>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={currentData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
              label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFF",
                border: "1px solid #E2E8F0",
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
