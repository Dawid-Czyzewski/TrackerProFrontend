import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';
import LanguageSwitcher from '../components/LanguageSwitcher';
import AuthHeader from '../components/auth/AuthHeader';
import AuthTabs from '../components/auth/AuthTabs';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { validateAuthForm } from '../utils/validation';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === '/register';
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(isRegister ? 'register' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    setActiveTab(isRegister ? 'register' : 'login');
  }, [isRegister]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    
    const { isValid, errors } = validateAuthForm(email, password, t);
    if (!isValid) {
      setFieldErrors(errors);
      return;
    }
    
    setLoading(true);

    try {
      await authService.login({ email, password });
      window.dispatchEvent(new Event('userLogin'));
      window.location.href = '/dashboard';
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error;
      if (errorMessage === 'account_not_verified') {
        setError(t('auth.accountNotVerified'));
      } else {
        setError(t('auth.loginError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    
    const { isValid, errors } = validateAuthForm(email, password, t);
    if (!isValid) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      await authService.register({ email, password, firstName: firstName || undefined, lastName: undefined });
      navigate('/thank-you', { state: { email, type: 'registration' } });
    } catch (err: any) {
      setError(err.response?.data?.error || t('auth.registerError'));
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setError('');
    setFieldErrors({});
    navigate(tab === 'register' ? '/register' : '/login');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-8 px-4 relative">
      <div className="absolute top-8 right-8">
        <LanguageSwitcher />
      </div>
      <AuthHeader />

      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-white mb-1">{t('auth.welcome')}</h2>
        <p className="text-gray-400 mb-6">{t('auth.welcomeSubtitle')}</p>

        <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>
        )}

        {activeTab === 'login' && (
          <LoginForm
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleLogin}
            loading={loading}
            fieldErrors={fieldErrors}
          />
        )}

        {activeTab === 'register' && (
          <RegisterForm
            email={email}
            password={password}
            firstName={firstName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onFirstNameChange={setFirstName}
            onSubmit={handleRegister}
            loading={loading}
            fieldErrors={fieldErrors}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
