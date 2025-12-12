import { useState } from 'react';
import {

  User,
  FileText,
  CreditCard,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Shield,
  BarChart3,
  Activity,
  DollarSign,
  Percent,
  Home,
  Badge
} from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
// import { Badge } from './components/ui/badge';
// import { Button } from './components/ui/button';
// import { Progress } from './components/ui/progress';
// import { Separator } from './components/ui/separator';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from './components/ui/breadcrumb';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,

} from 'recharts';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Separator } from '@radix-ui/react-select';
import { Progress } from '@radix-ui/react-progress';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const loanApplication = {
  status: 'Approved', // 'Approved', 'Rejected', 'Pending'
  applicantName: 'Rajesh Kumar Sharma',
  applicationId: 'LA-2025-00847',
  nbfcId: 'NBFC-45821',
  accountNumber: '4578 9632 1047 8523',
  nbfcName: 'Bajaj Finserv Ltd.',
  poolBatchId: 'PB-2025-Q1-102',
  dateOfSubmission: '05-Nov-2025',
  loanType: 'Titanium',

  // Loan Details
  approvedLoanAmount: '₹15,00,000',
  buyoutAmount: '₹12,75,000',
  nbfcDisbursedAmount: '₹15,00,000',
  nbfcTenure: '60 months',
  bankTenure: '48 months',
  bankROI: '9.5%',
  processingFee: '₹15,000',
  emiAmount: '₹31,272',
  disbursementDate: '10-Nov-2025',
  collateralType: 'Property - Residential',

  // Risk & Analytics
  creditScore: 760,
  riskLevel: 'Low', // 'Low', 'Medium', 'High'
  defaultProbability: 8.2,
  debtToIncomeRatio: 32,
  loanToValueRatio: 65,

  // Remarks
  underwritingRemarks: 'Applicant has strong credit history with consistent income from salaried employment. Property valuation completed and found satisfactory. All KYC documents verified.',
  breResult: 'Pass',
  approvalNotes: 'Approved with standard terms. No additional collateral required.',
  lastUpdated: '10-Nov-2025, 2:45 PM',
  updatedBy: 'Priya Deshmukh (Senior Underwriter)'
};

// Chart data
const paymentHistoryData = [
  { month: 'Jan', onTime: 100, delayed: 0 },
  { month: 'Feb', onTime: 100, delayed: 0 },
  { month: 'Mar', onTime: 95, delayed: 5 },
  { month: 'Apr', onTime: 100, delayed: 0 },
  { month: 'May', onTime: 100, delayed: 0 },
  { month: 'Jun', onTime: 100, delayed: 0 },
  { month: 'Jul', onTime: 100, delayed: 0 },
  { month: 'Aug', onTime: 100, delayed: 0 },
];

// const creditScoreData = [
//   {
//     name: 'Credit Score',
//     value: loanApplication.creditScore,
//     fill: '#10b981',
//   },
// ];

export default function LoanDetailsView() {
  const [currentStatus] = useState(loanApplication.status);
  const navigate = useNavigate();
  const repaymentView = () => {
    navigate(`/loans/repayment/${loanApplication.applicationId}`);
  };

  const ledgerView = () => {
    navigate(`/loans/statement/12`)
  }
   
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'Approved':
  //       return 'bg-green-500';
  //     case 'Rejected':
  //       return 'bg-red-500';
  //     case 'Pending':
  //       return 'bg-amber-500';
  //     default:
  //       return 'bg-gray-500';
  //   }
  // };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'High':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-gray-900">Bank of Maharashtra</h1>
                  <p className="text-xs text-gray-500">Co-Lending Admin Portal</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to List
            </Button>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Breadcrumb and Page Title */}
        <div className="mb-6">
          {/* <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="flex items-center gap-1">
                  <Home className="w-3 h-3" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Upload Pool File</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Loan Application List</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Application Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}

          <div className="flex items-center justify-between">
            <div>
              <h2>Loan Application Detail View</h2>
              <p className="text-gray-600 mt-1">Complete overview of loan application and risk assessment</p>
            </div>
            {/* <Badge 
              className={`${getStatusColor(currentStatus)} text-white px-4 py-2 gap-2 rounded-full`}
            >
              {getStatusIcon(currentStatus)}
              {currentStatus}
            </Badge> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6 ">
            {/* Applicant Overview Card */}
            <Card className="shadow-md rounded-2xl border-0 p-2">
              {/* <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-t-2xl"> */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center ml-2">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle>Applicant Overview</CardTitle>
                  <CardDescription>Primary applicant information</CardDescription>
                </div>
              </div>
              {/* </CardHeader> */}
              <CardContent className="p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Applicant Name</p>
                      <p className="text-gray-900">{loanApplication.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">BANK Application ID</p>
                      <p className="text-gray-900">{loanApplication.applicationId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">NBFC Application ID</p>
                      <p className="text-gray-900">{loanApplication.applicationId}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">NBFC Name</p>
                      <p className="text-gray-900">{loanApplication.nbfcName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Date of Submission</p>
                      <p className="text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-sky-600" />
                        {loanApplication.dateOfSubmission}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Loan Type</p>
                        {loanApplication.loanType||"GOLD LOAN"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Details Card */}
            <Card className="shadow-md rounded-2xl border-0 p-2">
              {/* <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-2xl"> */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center ml-2">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>Financial breakdown and terms</CardDescription>
                </div>
              </div>
              {/* </CardHeader> */}
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
                      <p className="text-sm text-gray-600 mb-1">Sanctioned Amount</p>
                      <p className="text-gray-900">{loanApplication.approvedLoanAmount}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-sm text-gray-600 mb-1">Bank Sanction Amount</p>
                      <p className="text-gray-900">{loanApplication.buyoutAmount}</p>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                      <p className="text-sm text-gray-600 mb-1">NBFC Sanction Amount</p>
                      <p className="text-gray-900">{loanApplication.nbfcDisbursedAmount}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <p className="text-sm text-gray-600 mb-1">NBFC Tenure</p>
                      <p className="text-gray-900">{loanApplication.nbfcTenure}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                      <p className="text-sm text-gray-600 mb-1">Bank Tenure</p>
                      <p className="text-gray-900">{loanApplication.bankTenure}</p>
                    </div>
                    <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
                      <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                        <Percent className="w-3 h-3" />
                        Bank ROI
                      </p>
                      <p className="text-gray-900">{loanApplication.bankROI}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
                      <p className="text-sm text-gray-600 mb-1">Processing Fee</p>
                      <p className="text-gray-900">{loanApplication.processingFee}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <p className="text-sm text-gray-600 mb-1">EMI Amount</p>
                      <p className="text-gray-900">{loanApplication.emiAmount}</p>
                    </div>
                    
                  </div>
                </div>
                <Separator className="my-6" />
                {/* <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl">
                  <Home className="w-5 h-5 text-sky-600" />
                  <div>
                    <p className="text-sm text-gray-600">Collateral / Security Type</p>
                    <p className="text-gray-900">{loanApplication.collateralType}</p>
                  </div>
                </div> */}
              </CardContent>
            </Card>

            {/* Risk & Analytics Section */}
            <Card className="shadow-md rounded-2xl border-0 p-2">
              {/* <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-t-2xl"> */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center ml-2">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle>Risk & Analytics</CardTitle>
                  <CardDescription>Comprehensive risk assessment and metrics</CardDescription>
                </div>
              </div>
              {/* </CardHeader> */}
              <CardContent className="pt-6">
                {/* Credit Score and Risk Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Credit Score</p>
                        <p className="text-4xl text-gray-900">{loanApplication.creditScore}</p>
                        <p className="text-sm text-green-600 mt-1">Excellent</p>
                      </div>
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#10b981"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${(loanApplication.creditScore / 850) * 251.2} 251.2`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <TrendingUp className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl border-2 ${getRiskColor(loanApplication.riskLevel)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm mb-1">Risk Level</p>
                        <p className="text-3xl">{loanApplication.riskLevel}</p>
                      </div>
                      <Shield className={`w-16 h-16 ${loanApplication.riskLevel === 'Low' ? 'text-green-600' :
                          loanApplication.riskLevel === 'Medium' ? 'text-amber-600' :
                            'text-red-600'
                        }`} />
                    </div>
                    <Progress
                      value={
                        loanApplication.riskLevel === 'Low' ? 20 :
                          loanApplication.riskLevel === 'Medium' ? 50 : 80
                      }
                      className="h-2"
                    />
                  </div>
                </div>

                {/* Historical Payment Behavior */}
                {/* <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-sky-600" />
                    <h3>Historical Payment Behavior</h3>
                  </div>
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-xl">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={paymentHistoryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="onTime" fill="#10b981" name="On Time %" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="delayed" fill="#ef4444" name="Delayed %" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div> */}

                {/* Default Probability and Ratios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <div className="p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-100">
                    <p className="text-sm text-gray-600 mb-3">Default Probability</p>
                    <div className="flex items-end gap-2 mb-3">
                      <p className="text-3xl text-gray-900">{loanApplication.defaultProbability}%</p>
                      <AlertCircle className="w-5 h-5 text-red-500 mb-1" />
                    </div>
                    <Progress
                      value={loanApplication.defaultProbability}
                      className="h-2 bg-red-100"
                    />
                  </div> */}

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-gray-600 mb-3">Debt-to-Income Ratio</p>
                    <div className="flex items-end gap-2 mb-3">
                      <p className="text-3xl text-gray-900">{loanApplication.debtToIncomeRatio}%</p>
                      <CreditCard className="w-5 h-5 text-blue-500 mb-1" />
                    </div>
                    <Progress
                      value={loanApplication.debtToIncomeRatio}
                      className="h-2 bg-blue-100"
                    />
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                    <p className="text-sm text-gray-600 mb-3">Loan-to-Value Ratio</p>
                    <div className="flex items-end gap-2 mb-3">
                      <p className="text-3xl text-gray-900">{loanApplication.loanToValueRatio}%</p>
                      <Home className="w-5 h-5 text-purple-500 mb-1" />
                    </div>
                    <Progress
                      value={loanApplication.loanToValueRatio}
                      className="h-2 bg-purple-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Remarks / Decision Card */}
            <Card className="shadow-md rounded-2xl border-0">
              {/* </CardHeader> */}
              <CardContent className="p-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Auto BRE Result</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-gray-900">{loanApplication.breResult}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                    <p className="text-sm text-gray-600 mb-2">Application Status</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(currentStatus)}
                      <p className="text-gray-900">{currentStatus}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Last Updated: {loanApplication.lastUpdated}</span>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Risk Summary Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-16 space-y-6">
              {/* Quick Risk Summary */}
              {/* <Card className="shadow-md rounded-2xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8" />
                    <h3 className="text-white">Risk Summary</h3>
                  </div>
                  <p className="text-indigo-100 text-sm">Quick overview of applicant's risk profile</p>
                </div>
                <CardContent className="pt-6 space-y-4">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <p className="text-sm text-gray-600 mb-2">Credit Score</p>
                    <p className="text-4xl text-gray-900 mb-1">{loanApplication.creditScore}</p>
                    <Badge className="bg-green-500 text-white">Excellent</Badge>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Level</span>
                      <Badge className={`${loanApplication.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                          loanApplication.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                        {loanApplication.riskLevel}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Default Probability</span>
                      <span className="text-gray-900">{loanApplication.defaultProbability}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">DTI Ratio</span>
                      <span className="text-gray-900">{loanApplication.debtToIncomeRatio}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">LTV Ratio</span>
                      <span className="text-gray-900">{loanApplication.loanToValueRatio}%</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Payment Trend (Last 8 months)</p>
                    <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-3 rounded-lg">
                      <ResponsiveContainer width="100%" height={80}>
                        <LineChart data={paymentHistoryData}>
                          <Line
                            type="monotone"
                            dataKey="onTime"
                            stroke="#0ea5e9"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Action Buttons */}
               <Card className="shadow-md rounded-2xl border-0 p-2">
                <CardTitle className='ml-2'>Actions</CardTitle>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    onClick={repaymentView}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    View Repayment Schedule
                  </Button>
                  <Button variant="outline" className="w-full">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Request Additional Info
                  </Button>
                  <Button variant="outline" className="w-full" onClick={ledgerView}>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Account Statement
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card> 
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
