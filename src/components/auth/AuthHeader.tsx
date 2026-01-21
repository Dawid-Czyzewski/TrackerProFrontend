import React from 'react';
import { useTranslation } from 'react-i18next';

const AuthHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8">
      <div className="flex justify-center gap-4 mb-4">
        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">Tracker Pro</h1>
      <p className="text-gray-400">{t('auth.tagline')}</p>
    </div>
  );
};

export default AuthHeader;
