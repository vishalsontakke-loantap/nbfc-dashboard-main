import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from './ui/progress';

export function RiskAnalyticsSection() {
  const riskData = [
    { name: 'Low Risk', value: 65, color: '#22c55e' },
    { name: 'Medium Risk', value: 25, color: '#f59e0b' },
    { name: 'High Risk', value: 10, color: '#ef4444' },
  ];

  const performanceData = [
    { month: 'Jan', value: 95 },
    { month: 'Feb', value: 96 },
    { month: 'Mar', value: 94 },
    { month: 'Apr', value: 97 },
    { month: 'May', value: 96 },
    { month: 'Jun', value: 98 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-3">
      <h2 className="mb-6">Risk & Analytics</h2>
      
      <div className="space-y-6">
        {/* Risk Exposure Donut Chart */}
        <div>
          <h3 className="text-sm mb-4">Risk Exposure Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {riskData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Health Line Graph */}
        <div>
          <h3 className="text-sm mb-4">Portfolio Health Trend</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[90, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#007BC3" strokeWidth={2} dot={{ fill: '#007BC3' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Metrics */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Average Credit Score</span>
              <span className="text-[#007BC3]">742</span>
            </div>
            <Progress value={74} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Delinquency Ratio</span>
              <span className="text-amber-600">2.3%</span>
            </div>
            <Progress value={23} className="h-2 [&>div]:bg-amber-500" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Default Probability</span>
              <span className="text-green-600">Low (1.2%)</span>
            </div>
            <Progress value={12} className="h-2 [&>div]:bg-green-500" />
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Loss Given Default (LGD)</span>
            <span className="text-gray-900">18.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
