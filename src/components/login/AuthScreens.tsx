import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import TwoFactorAuth from './TwoFactorAuth';
import ForgotCredentials from './ForgotCredentials';
import ResetPassword from './ResetPassword';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Screen = 'loading' | 'login' | '2fa' | 'forgot' | 'reset';

export default function AuthScreens() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/overview");
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = () => setCurrentScreen('2fa');
  const handleBackToLogin = () => setCurrentScreen('login');
  const handleForgotCredentials = () => setCurrentScreen('reset');
  const handleResetSuccess = () => setCurrentScreen('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {currentScreen === 'loading' && <LoadingScreen />}
      {currentScreen === 'login' && (
        <LoginScreen
          onLoginSubmit={handleLoginSubmit}
          onForgotCredentials={handleForgotCredentials}
          userId={userId}
          setUserId={setUserId}
          password={password}
          setPassword={setPassword}
          // captcha={captcha}
          // setCaptcha={setCaptcha}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      )}
      {currentScreen === '2fa' && <TwoFactorAuth onBack={handleBackToLogin} userId={userId} />}
      {currentScreen === 'forgot' && <ForgotCredentials onBack={handleBackToLogin} />}
      {currentScreen === 'reset' && <ResetPassword onBack={handleBackToLogin} onSuccess={handleResetSuccess} />}
    </div>
  );
}