import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const ThankYou: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { email?: string; type?: string } | null;
  const isRegistration = state?.type === 'registration';
  const email = state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <div className="absolute top-8 right-8">
        <LanguageSwitcher />
      </div>
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="w-20 h-20 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
          {isRegistration ? (
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-white">
          {isRegistration 
            ? (t('auth.thankYouForRegistration') || 'Dziękujemy za rejestrację!')
            : (t('auth.thankYou') || 'Dziękujemy!')
          }
        </h1>
        
        {isRegistration ? (
          <>
            <p className="text-gray-400 mb-4">
              {t('auth.registrationSuccess') || 'Twoje konto zostało pomyślnie utworzone.'}
            </p>
            <p className="text-gray-400 mb-6">
              {t('auth.activationEmailSent', { email: email || 'twój adres email' }) || 
                `Na adres ${email || 'twój adres email'} został wysłany link aktywacyjny. Sprawdź swoją skrzynkę pocztową i kliknij link, aby aktywować konto.`}
            </p>
          </>
        ) : (
          <p className="text-gray-400 mb-6">
            {t('auth.accountActivated') || 'Twoje konto zostało pomyślnie aktywowane. Możesz teraz zalogować się do Tracker Pro.'}
          </p>
        )}
        
        <button
          onClick={() => navigate('/login')}
          className="w-full px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors font-semibold"
        >
          {t('auth.goToLogin') || 'Przejdź do logowania'}
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
