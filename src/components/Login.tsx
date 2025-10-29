import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Shield, Building2, Users } from 'lucide-react';
import bomLogo from '/images/Bank_of_Maharashtra_logo.svg';

interface LoginProps {
  onLogin: (userType: 'SuperAdmin' | 'BankBranch' | 'NBFC', name: string, org?: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [selectedUserType, setSelectedUserType] = useState<'SuperAdmin' | 'BankBranch' | 'NBFC'>('SuperAdmin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userTypes = [
    {
      type: 'SuperAdmin' as const,
      label: 'Bank HO (Super Admin)',
      icon: Shield,
      description: 'Full system access and administration',
      defaultEmail: 'admin@bom.in',
    },
    {
      type: 'BankBranch' as const,
      label: 'Bank Branch User',
      icon: Building2,
      description: 'Branch-level operations and approvals',
      defaultEmail: 'branch@bom.in',
    },
    {
      type: 'NBFC' as const,
      label: 'NBFC Partner',
      icon: Users,
      description: 'Partner portal access',
      defaultEmail: 'partner@muthoot.com',
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in real app would validate credentials
    const mockUsers = {
      SuperAdmin: { name: 'Amit Shah', org: 'Bank of Maharashtra HO' },
      BankBranch: { name: 'Priya Desai', org: 'Mumbai Branch' },
      NBFC: { name: 'Suresh Kumar', org: 'Muthoot Finance' },
    };

    const user = mockUsers[selectedUserType];
    onLogin(selectedUserType, user.name, user.org);
  };

  return (
     <div className="grid place-items-center min-h-[89.5dvh] p-5">
      <Card className="scale-95 w-full h-full flex flex-col p-10">
    <div className="min-h-screen bg-gradient-to-br from-[#0B5FFF]/10 via-[#00A676]/10 to-[#FFB020]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <img src={bomLogo} alt="Bank of Maharashtra" className="h-16 mx-auto lg:mx-0" />
          <div>
            <h1 className="text-[#0B5FFF] mb-2">Co-Lending Module</h1>
            <h2 className="text-foreground mb-4">CLM-I Middleware Platform</h2>
            <p className="text-muted-foreground">
              Unified platform for Bank of Maharashtra and NBFC partners to collaborate on co-lending operations with seamless application management, compliance, and reporting.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-[#0B5FFF]">1,250+</h3>
              <p className="text-muted-foreground">Applications</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-[#00A676]">4</h3>
              <p className="text-muted-foreground">NBFC Partners</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-[#FFB020]">96%</h3>
              <p className="text-muted-foreground">Collection Rate</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="p-8 shadow-xl">
          <h2 className="mb-6 text-center">Sign In to Portal</h2>

          {/* User Type Selection */}
          <div className="space-y-3 mb-6">
            <label className="block text-muted-foreground mb-2">Select User Type</label>
            {userTypes.map((userType) => {
              const Icon = userType.icon;
              return (
                <button
                  key={userType.type}
                  onClick={() => {
                    setSelectedUserType(userType.type);
                    setEmail(userType.defaultEmail);
                  }}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                    selectedUserType === userType.type
                      ? 'border-[#0B5FFF] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${selectedUserType === userType.type ? 'bg-[#0B5FFF]' : 'bg-gray-200'}`}>
                      <Icon className={`h-5 w-5 ${selectedUserType === userType.type ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={selectedUserType === userType.type ? 'text-[#0B5FFF]' : ''}>{userType.label}</p>
                      <p className="text-muted-foreground">{userType.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Button variant="link" className="p-0 h-auto text-[#0B5FFF]">
                Forgot Password?
              </Button>
            </div>
            <Button type="submit" className="w-full bg-[#0B5FFF] hover:bg-[#0B5FFF]/90" >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-muted-foreground">
              Need access? Contact your administrator
            </p>
          </div>
        </Card>
    </div>
    </div>
    </Card>
    </div>
  );
}
