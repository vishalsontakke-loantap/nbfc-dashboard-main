import { useState } from 'react';
import { ArrowLeft, User, Lock, CreditCard, Mail, Smartphone, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { RadioGroup } from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { assetPath } from '@/lib/utils';
// import { RadioGroupItem } from '../ui/radio-group';

interface ForgotCredentialsProps {
  onBack: () => void;
}

type Step = 'selection' | 'details' | 'otp' | 'reset' | 'success';
type RecoveryType = 'userid' | 'password';

export default function ForgotCredentials({ onBack }: ForgotCredentialsProps) {
  const [currentStep, setCurrentStep] = useState<Step>('selection');
  const [recoveryType, setRecoveryType] = useState<RecoveryType>('password');
  const [accountNumber, setAccountNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [retrievedUserId, setRetrievedUserId] = useState('');

  const handleSelectionNext = () => {
    setCurrentStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending OTP
    setTimeout(() => {
      setCurrentStep('otp');
    }, 500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`forgot-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`forgot-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpVerify = () => {
    // Simulate OTP verification
    if (recoveryType === 'userid') {
      // For User ID recovery, show the retrieved User ID
      setRetrievedUserId('BOM' + Math.floor(100000 + Math.random() * 900000));
      setCurrentStep('success');
    } else {
      // For password recovery, go to reset screen
      setCurrentStep('reset');
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      setCurrentStep('success');
    }
  };

  const renderSelectionStep = () => (
    <div>
      <h2 className="text-center mb-2" style={{ color: '#1B4E9B' }}>
        Account Recovery
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Select what you need help with
      </p>

      <RadioGroup
        value={recoveryType}
        onValueChange={(value) => setRecoveryType(value as RecoveryType)}
        className="space-y-4 mb-8"
      >
        <div
          className={`flex items-center space-x-3 p-5 rounded-xl border-2 transition-all cursor-pointer ${
            recoveryType === 'userid'
              ? 'border-[#1B4E9B] bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setRecoveryType('userid')}
        >
          {/* <RadioGroupItem value="userid" id="userid" /> */}
          <Label htmlFor="userid" className="flex items-center gap-3 cursor-pointer flex-1">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: recoveryType === 'userid' ? '#1B4E9B' : '#e5e7eb' }}
            >
              <User className={`w-6 h-6 ${recoveryType === 'userid' ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <div className="text-gray-900">Forgot User ID</div>
              <div className="text-gray-600">Retrieve your User ID</div>
            </div>
          </Label>
        </div>

        <div
          className={`flex items-center space-x-3 p-5 rounded-xl border-2 transition-all cursor-pointer ${
            recoveryType === 'password'
              ? 'border-[#1B4E9B] bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setRecoveryType('password')}
        >
          {/* <RadioGroupItem value="password" id="password" /> */}
          <Label htmlFor="password" className="flex items-center gap-3 cursor-pointer flex-1">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: recoveryType === 'password' ? '#1B4E9B' : '#e5e7eb' }}
            >
              <Lock className={`w-6 h-6 ${recoveryType === 'password' ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <div className="text-gray-900">Forgot Password</div>
              <div className="text-gray-600">Reset your password</div>
            </div>
          </Label>
        </div>
      </RadioGroup>

      <Button
        onClick={handleSelectionNext}
        className="w-full h-12 rounded-xl text-white transition-all hover:shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)',
        }}
      >
        Continue
      </Button>
    </div>
  );

  const renderDetailsStep = () => (
    <div>
      <h2 className="text-center mb-2" style={{ color: '#1B4E9B' }}>
        Verify Your Identity
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Enter your registered details to proceed
      </p>

      <form onSubmit={handleDetailsSubmit} className="space-y-5">
        <div>
          <Label htmlFor="accountNumber" className="block text-gray-700 mb-2">
            Account Number
          </Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
              placeholder="Enter your account number"
              maxLength={16}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="mobile" className="block text-gray-700 mb-2">
            Registered Mobile Number
          </Label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="mobile"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
              placeholder="Enter your mobile number"
              maxLength={10}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="block text-gray-700 mb-2">
            Registered Email ID
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="dob" className="block text-gray-700 mb-2">
            Date of Birth
          </Label>
          <Input
            id="dob"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
            required
          />
        </div>

        <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-900">
            Please ensure all details match your registered bank records
          </p>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl text-white transition-all hover:shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)',
          }}
        >
          Send OTP
        </Button>
      </form>
    </div>
  );

  const renderOtpStep = () => (
    <div>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: '#1B4E9B' }}
      >
        <Shield className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-center mb-2" style={{ color: '#1B4E9B' }}>
        Verify OTP
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Enter the 6-digit OTP sent to your registered mobile and email
      </p>

      <div className="flex justify-center gap-2 mb-6">
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`forgot-otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center rounded-xl border-2 border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B] transition-all"
          />
        ))}
      </div>

      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
        <Smartphone className="w-5 h-5 text-[#00ADEF] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-900 mb-1">OTP sent successfully</p>
          <p className="text-blue-700">
            Mobile: ****{mobileNumber.slice(-4)} | Email: {email.slice(0, 3)}***
          </p>
        </div>
      </div>

      <Button
        onClick={handleOtpVerify}
        disabled={otp.some((d) => !d)}
        className="w-full h-12 rounded-xl text-white transition-all hover:shadow-lg disabled:opacity-50"
        style={{
          background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)',
        }}
      >
        Verify OTP
      </Button>

      <div className="text-center mt-6">
        <span className="text-gray-600">Didn't receive the code? </span>
        <button
          onClick={() => setOtp(['', '', '', '', '', ''])}
          className="text-[#00ADEF] hover:text-[#1B4E9B] transition-colors"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );

  const renderResetStep = () => (
    <div>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: '#1B4E9B' }}
      >
        <Lock className="w-8 h-8 text-white" />
      </div>

      <h2 className="text-center mb-2" style={{ color: '#1B4E9B' }}>
        Reset Password
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Create a new secure password for your account
      </p>

      <form onSubmit={handlePasswordReset} className="space-y-5">
        <div>
          <Label htmlFor="newPassword" className="block text-gray-700 mb-2">
            New Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
              placeholder="Enter new password"
              minLength={8}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
            Confirm New Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 h-12 rounded-xl border-gray-300 focus:border-[#1B4E9B] focus:ring-[#1B4E9B]"
              placeholder="Re-enter new password"
              minLength={8}
              required
            />
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-red-600 mt-2">Passwords do not match</p>
          )}
        </div>

        <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <Shield className="w-5 h-5 text-[#1B4E9B] flex-shrink-0 mt-0.5" />
          <div className="text-blue-900">
            <p className="mb-2">Password must contain:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
              <li>One special character</li>
            </ul>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
          className="w-full h-12 rounded-xl text-white transition-all hover:shadow-lg disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)',
          }}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="mb-2" style={{ color: '#1B4E9B' }}>
        {recoveryType === 'userid' ? 'User ID Retrieved' : 'Password Reset Successful'}
      </h2>
      <p className="text-gray-600 mb-8">
        {recoveryType === 'userid'
          ? 'Your User ID has been successfully retrieved'
          : 'Your password has been updated successfully'}
      </p>

      {recoveryType === 'userid' && (
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 mb-8">
          <p className="text-gray-700 mb-3">Your User ID is:</p>
          <div
            className="text-2xl tracking-wider p-4 rounded-lg"
            style={{ backgroundColor: '#1B4E9B', color: 'white' }}
          >
            {retrievedUserId}
          </div>
          <p className="text-gray-600 mt-3">
            Please save this User ID for future logins
          </p>
        </div>
      )}

      {recoveryType === 'password' && (
        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200 mb-8">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-green-900">
            You can now log in using your new password
          </p>
        </div>
      )}

      <Button
        onClick={onBack}
        className="w-full h-12 rounded-xl text-white transition-all hover:shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)',
        }}
      >
        Back to Login
      </Button>

      <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-xl border border-amber-200 mt-6">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-amber-900">
          For security reasons, this information will not be shown again. Please save it securely.
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={assetPath("/loaders/bom.png")} alt="Bank of Maharashtra" className="h-14 mx-auto mb-4" />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ background: 'linear-gradient(90deg, #1B4E9B 0%, #00ADEF 100%)' }}
          />

          <button
            onClick={currentStep === 'selection' ? onBack : () => {
              if (currentStep === 'details') setCurrentStep('selection');
              else if (currentStep === 'otp') setCurrentStep('details');
              else if (currentStep === 'reset') setCurrentStep('otp');
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-[#1B4E9B] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentStep === 'selection' && renderSelectionStep()}
          {currentStep === 'details' && renderDetailsStep()}
          {currentStep === 'otp' && renderOtpStep()}
          {currentStep === 'reset' && renderResetStep()}
          {currentStep === 'success' && renderSuccessStep()}
        </div>

        <p className="text-center text-gray-500 mt-6">
          © 2025 Bank of Maharashtra. All rights reserved.
        </p>
      </div>
    </div>
  );
}
