import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import TwoFactorAuth from './TwoFactorAuth';
import ForgotCredentials from './ForgotCredentials';

type Screen = 'loading' | 'login' | '2fa' | 'forgot';

export default function AuthScreens() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('loading');
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captcha, setCaptcha] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('login');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSubmit = () => setCurrentScreen('2fa');
  const handleBackToLogin = () => setCurrentScreen('login');
  const handleForgotCredentials = () => setCurrentScreen('forgot');

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
          captcha={captcha}
          setCaptcha={setCaptcha}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
      )}
      {currentScreen === '2fa' && <TwoFactorAuth onBack={handleBackToLogin} userId={userId} />}
      {currentScreen === 'forgot' && <ForgotCredentials onBack={handleBackToLogin} />}
    </div>
  );
}