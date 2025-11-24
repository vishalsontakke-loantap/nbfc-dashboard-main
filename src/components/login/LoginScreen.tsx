import { useState } from 'react';
import { Lock, User, RefreshCw, Eye, EyeOff, Shield } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

interface LoginScreenProps {
  onLoginSubmit: () => void;
  onForgotCredentials: () => void;
}

export default function LoginScreen({ onLoginSubmit, onForgotCredentials }: LoginScreenProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaCode] = useState('7K9M3P');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && password && captcha) {
      onLoginSubmit();
    }
  };

  const refreshCaptcha = () => {
    // Refresh captcha logic would go here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="mb-8 text-center">
            <img 
              src={"/loaders/bom.png"} 
              alt="Bank of Maharashtra" 
              className="h-16 mx-auto mb-6"
            />
            {/* <h1 className="mb-2" style={{ color: '#1B4E9B' }}>
              Co-lending System
            </h1> */}
            {/* <p className="text-gray-600">
              Secure Login Portal
            </p> */}
          </div>

          {/* Login Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User ID Field */}
              <div>
                <label htmlFor="userId" className="block text-gray-700 mb-2">
                  User ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
                    placeholder="Enter your User ID"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
                    placeholder="Enter your Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* CAPTCHA Field */}
              <div>
                <label htmlFor="captcha" className="block text-gray-700 mb-2">
                  Verify you are not a robot
                </label>
                <div className="flex gap-3 mb-3">
                  <div 
                    className="flex-1 h-12 rounded-xl flex items-center justify-center tracking-widest select-none"
                    style={{ 
                      background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
                      border: '2px solid #ddd',
                      fontFamily: 'monospace',
                      letterSpacing: '0.3em'
                    }}
                  >
                    <span className="text-gray-700">{captchaCode}</span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={refreshCaptcha}
                    className="h-12 w-12 rounded-xl border-gray-300 hover:border-[#1B4E9B]"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </div>
                <Input
                  id="captcha"
                  type="text"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  className="h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
                  placeholder="Enter CAPTCHA code"
                  required
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-gray-700 cursor-pointer select-none"
                  >
                    Remember Me
                  </label>
                </div>
                <a 
                  href="#" 
                  className="text-[#00ADEF] hover:text-[#1B4E9B] transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    onForgotCredentials();
                  }}
                >
                  Forgot User ID / Password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl text-white hover:bg-[#1B4E9B] bg-[#00ADEF]"
                // style={{ 
                //   background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)'
                // }}
              >
                <Lock className="w-5 h-5 mr-2" />
                Login Securely
              </Button>

              {/* Security Notice */}
              <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Shield className="w-5 h-5 text-[#1B4E9B] flex-shrink-0 mt-0.5" />
                <p className="text-blue-900">
                  Your session is encrypted and secure. Never share your credentials with anyone.
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-6">
            © 2025 Bank of Maharashtra. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div 
        className="hidden lg:flex flex-1 items-center justify-center p-8"
        style={{ backgroundColor: '#1B4E9B' }}
      >
        <div className="max-w-lg">
          <img 
            src={"/loaders/login.gif"} 
            alt="Security Illustration" 
            className="w-full h-auto"
          />
          <div className="text-center mt-8 text-white">
            <h2 className="mb-3">
              Secure Co-Lending Experience
            </h2>
            <p className="text-blue-100">
              Multi-layer authentication ensures your account remains protected at all times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}