import { useState } from 'react';
import { Lock, Shield, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { assetPath } from '@/lib/utils';
import { useVerifyOtpAndResetPasswordMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import { getKey } from '@/utils/localStorage';

interface ResetPasswordProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function ResetPassword({ onBack, onSuccess }: ResetPasswordProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const [verifyAndResetTrigger, verifyResult] = useVerifyOtpAndResetPasswordMutation();
  const otpReferenceId = getKey('otp_reference_id') || '';

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`reset-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`reset-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (!otpReferenceId) {
      toast.error('OTP reference ID not found. Please try again.');
      onBack();
      return;
    }

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    try {
      await verifyAndResetTrigger({
        otp_reference_id: otpReferenceId,
        otp: otpValue,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      }).unwrap();

      toast.success('Password reset successful!');
      setShowSuccess(true);
      
      // After 2 seconds, navigate back to login
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      const msg = err?.data?.message || 'Failed to reset password';
      toast.error(msg);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f8fafc' }}>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#10b981' }}
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-center mb-2" style={{ color: '#1B4E9B' }}>
            Password Reset Successful
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Your password has been successfully reset. You can now login with your new password.
          </p>

          <Button
            onClick={onSuccess}
            className="w-full h-12 rounded-xl text-white transition-all hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)',
            }}
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#f8fafc' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#1B4E9B] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Login</span>
          </button>

          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#1B4E9B' }}
          >
            <Lock className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-center mb-2" style={{ color: '#1B4E9B' }}>
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Verify OTP and create a new password
          </p>

          <form onSubmit={handlePasswordReset} className="space-y-5">
            {/* OTP Input */}
            <div>
              <Label className="block text-gray-700 mb-2">Enter 6-Digit OTP</Label>
              <div className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`reset-otp-${index}`}
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
            </div>

            {/* New Password */}
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

            {/* Confirm Password */}
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
                <p className="text-red-600 mt-2 text-sm">Passwords do not match</p>
              )}
            </div>

            {/* Password Requirements */}
            {/* <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <Shield className="w-5 h-5 text-[#1B4E9B] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="mb-2 font-medium">Password must contain:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>
            </div> */}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                otp.some((d) => !d) ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword ||
                verifyResult.isLoading
              }
              className="w-full h-12 rounded-xl text-white transition-all hover:shadow-lg disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #1B4E9B 0%, #00ADEF 100%)',
              }}
            >
              {verifyResult.isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>

          {/* Resend OTP */}
          {/* <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">Didn't receive the OTP? </span>
            <button
              onClick={() => {
                setOtp(['', '', '', '', '', '']);
                toast.info('OTP resent successfully');
              }}
              className="text-[#00ADEF] hover:text-[#1B4E9B] transition-colors text-sm"
            >
              Resend OTP
            </button>
          </div> */}

          {/* Footer */}
          {/* <p className="text-center text-gray-500 mt-8 text-sm">
            © 2025 Bank of Maharashtra. All rights reserved.
          </p> */}
          <img
          src={assetPath("/images/loantap.svg")}
          alt="LoanTap"
          className="w-full h-[1rem] mb-2 mt-2"
        />
        </div>
      </div>
  );
}
