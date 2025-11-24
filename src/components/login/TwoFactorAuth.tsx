import { useState } from 'react';
import { Shield, Smartphone, CheckCircle2, ArrowLeft } from 'lucide-react';

// import bomLogo from 'figma:asset/8fb8b9c0deb45ee9f26fa8c75997f5fb7ba44f22.png';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface TwoFactorAuthProps {
  onBack: () => void;
}

export default function TwoFactorAuth({ onBack }: TwoFactorAuthProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      // Redirect or handle success
      setTimeout(() => {
        alert('Login successful! Redirecting to dashboard...');
      }, 1500);
    }, 2000);
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '', '', '']);
    alert('New OTP sent to your registered mobile number');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={"/loaders/bom.png"} 
            alt="Bank of Maharashtra" 
            className="h-14 mx-auto mb-4"
          />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
          {/* Background Decoration */}
          <div 
            className="absolute top-0 left-0 right-0 h-2"
            style={{ background: 'linear-gradient(90deg, #1B4E9B 0%, #00ADEF 100%)' }}
          />

          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#1B4E9B] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </button>

          {/* Icon */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#1B4E9B' }}
          >
            <Shield className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-center mb-2" style={{ color: '#1B4E9B' }}>
            Two-Factor Authentication
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter the 6-digit OTP sent to your registered mobile number
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center rounded-xl border-2 border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B] transition-all"
                disabled={isVerified}
              />
            ))}
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
            <Smartphone className="w-5 h-5 text-[#00ADEF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 mb-1">
                OTP sent successfully
              </p>
              <p className="text-blue-700">
                Check your registered mobile number ending with ****7890
              </p>
            </div>
          </div>

          {/* Verify Button */}
          {!isVerified ? (
            <Button
              onClick={handleVerify}
              disabled={otp.some(d => !d) || isVerifying}
              className="w-full h-12 rounded-xl text-white transition-all hover:shadow-lg disabled:opacity-50"
              style={{ 
                background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)'
              }}
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Verify OTP
                </>
              )}
            </Button>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                <CheckCircle2 className="w-6 h-6" />
                <span>Verification Successful!</span>
              </div>
              <div className="w-8 h-8 border-4 border-[#1B4E9B] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {/* Resend OTP */}
          {!isVerified && (
            <div className="text-center mt-6">
              <span className="text-gray-600">Didn't receive the code? </span>
              <button
                onClick={handleResendOtp}
                className="text-[#00ADEF] hover:text-[#1B4E9B] transition-colors"
              >
                Resend OTP
              </button>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-[#1B4E9B] flex-shrink-0 mt-0.5" />
              <p className="text-gray-600">
                For your security, this OTP will expire in 10 minutes
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6">
          © 2025 Bank of Maharashtra. All rights reserved.
        </p>
      </div>
    </div>
  );
}
