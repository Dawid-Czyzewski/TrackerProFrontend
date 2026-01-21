import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/authService';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register({ email, password, firstName, lastName: '' });
      navigate('/thank-you', { state: { email, type: 'registration' } });
    } catch (err: any) {
      setError(err.response?.data?.error || t('auth.registerError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-4 sm:py-8 px-4">
      <div className="text-center mb-4 sm:mb-8">
        <div className="flex justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-400 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-400 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Tracker Pro</h1>
        <p className="text-sm sm:text-base text-gray-600 px-2">{t('auth.tagline')}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{t('auth.welcome')}</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{t('auth.welcomeSubtitle')}</p>

        <div className="flex border-b mb-4 sm:mb-6">
          <Link
            to="/login"
            className="flex-1 text-center py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-400 hover:text-gray-600"
          >
            {t('auth.loginTab')}
          </Link>
          <Link
            to="/register"
            className="flex-1 text-center py-2 sm:py-3 text-sm sm:text-base font-semibold text-gray-800 border-b-2 border-teal-500"
          >
            {t('auth.registerTab')}
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">{t('auth.firstNameOptional')}</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jan Kowalski"
              className="w-full px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">{t('auth.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.com"
              className="w-full px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">{t('auth.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white py-3 sm:py-3 rounded-lg font-semibold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center touch-manipulation"
          >
            {loading ? t('auth.registering') : t('auth.createAccount')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
