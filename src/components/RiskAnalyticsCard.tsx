import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Progress } from './ui/progress';
import { AlertTriangle } from 'lucide-react';

export function RiskAnalyticsCard() {
  const riskDistribution = [
    { name: 'Low Risk', value: 68, color: '#22c55e' },
    { name: 'Medium Risk', value: 24, color: '#f59e0b' },
    { name: 'High Risk', value: 8, color: '#ef4444' },
  ];

  const loanTypes = [
    { type: 'Personal Loan', value: 42 },
    { type: 'Gold Loan', value: 28 },
    { type: 'SME Loan', value: 18 },
    { type: 'Vehicle Loan', value: 12 },
  ];

  const processingStages = [
    { stage: 'Upload', count: 100 },
    { stage: 'BRE', count: 95 },
    { stage: 'Approval', count: 72 },
    { stage: 'Disbursement', count: 72 },
  ];

  const topRiskyNBFCs = [
    { name: 'Shriram Finance', riskScore: 42, loans: 124 },
    { name: 'IIFL Finance', riskScore: 38, loans: 89 },
    { name: 'L&T Finance', riskScore: 35, loans: 76 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="mb-6">Risk & Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Distribution Donut Chart */}
        <div>
          <h3 className="text-sm mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Loan Type Composition */}
        <div>
          <h3 className="text-sm mb-4">Loan Type Composition</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={loanTypes} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="type" tick={{ fontSize: 12 }} width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#007BC3" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend */}
        <div>
          <h3 className="text-sm mb-4">Processing Pipeline Funnel</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={processingStages}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#007BC3" strokeWidth={3} dot={{ fill: '#007BC3', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Risky NBFCs */}
       
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-sm mb-4">Application Status Distribution</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Approved</span>
              <span className="text-green-600">1,337 (72.4%)</span>
            </div>
            <Progress value={72.4} className="h-2 [&>div]:bg-green-500" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Rejected</span>
              <span className="text-red-600">421 (22.8%)</span>
            </div>
            <Progress value={22.8} className="h-2 [&>div]:bg-red-500" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Pending Review</span>
              <span className="text-amber-600">89 (4.8%)</span>
            </div>
            <Progress value={4.8} className="h-2 [&>div]:bg-amber-500" />
          </div>
        </div>
      </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Average Credit Score</span>
            <span className="text-[#007BC3]">724</span>
          </div>
          <Progress value={72} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Debt-to-Income Ratio</span>
            <span className="text-amber-600">38.2%</span>
          </div>
          <Progress value={38} className="h-2 [&>div]:bg-amber-500" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Loan-to-Value Ratio</span>
            <span className="text-green-600">65.4%</span>
          </div>
          <Progress value={65} className="h-2 [&>div]:bg-green-500" />
        </div>
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-amber-50 rounded-lg border border-green-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Default Probability</span>
          <span className="text-green-600">Low (1.4%)</span>
        </div>
        <Progress value={14} className="h-3 mt-2 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-red-500" />
      </div>
    </div>
  );
}
