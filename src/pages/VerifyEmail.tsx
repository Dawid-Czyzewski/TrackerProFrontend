import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';
import LanguageSwitcher from '../components/LanguageSwitcher';

const VerifyEmail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage(t('auth.verificationTokenMissing') || 'Verification token is missing');
      return;
    }

    authService.verifyEmail(token)
      .then(() => {
        authService.logout();
        setStatus('success');
        setMessage(t('auth.verificationSuccess') || 'Email został pomyślnie zweryfikowany!');
      })
      .catch((err: any) => {
        authService.logout();
        setStatus('error');
        const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message;
        setMessage(errorMessage || t('auth.verificationError') || 'Weryfikacja nie powiodła się');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-6 px-4 relative">
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
        <LanguageSwitcher />
      </div>
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-white">Tracker Pro</h1>
        
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">{t('auth.verifying') || 'Verifying your email...'}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-white">{t('auth.verificationSuccessTitle') || 'Weryfikacja zakończona pomyślnie!'}</h1>
            <p className="text-green-400 font-semibold mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              {t('auth.goToLogin') || 'Przejdź do logowania'}
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-500/20 border border-red-500/50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-white">{t('auth.verificationErrorTitle') || 'Weryfikacja nie powiodła się'}</h1>
            <p className="text-red-400 font-semibold mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              {t('auth.goToLogin') || 'Przejdź do logowania'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
