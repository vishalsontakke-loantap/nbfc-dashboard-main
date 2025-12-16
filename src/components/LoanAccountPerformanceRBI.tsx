// import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function LoanAccountPerformanceRBI() {
  // Dummy data following RBI classification
  const smaData = [
    { month: "Jan", sma0: 320, sma1: 180, sma2: 90, npa: 40 },
    { month: "Feb", sma0: 350, sma1: 160, sma2: 100, npa: 45 },
    { month: "Mar", sma0: 370, sma1: 190, sma2: 110, npa: 55 },
    { month: "Apr", sma0: 340, sma1: 170, sma2: 105, npa: 60 },
    { month: "May", sma0: 400, sma1: 200, sma2: 120, npa: 65 },
  ];

  return (
    <Card className="p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg">
          SMA & NPA Loan Classification
        </h3>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          PDF
        </Button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={smaData} barGap={6} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="month" stroke="#64748B" />
          <YAxis stroke="#64748B" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFF",
              border: "1px solid #E2E8F0",
            }}
          />
          <Legend />

          {/* SMA Bars */}
          <Bar dataKey="sma0" fill="#0B5FFF" name="SMA-0 (1–30 Days)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="sma1" fill="#00A676" name="SMA-1 (31–60 Days)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="sma2" fill="#FFB020" name="SMA-2 (61–90 Days)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="npa" fill="#E11D48" name="NPA (>90 Days)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
