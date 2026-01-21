import React from 'react';
import { useTranslation } from 'react-i18next';
import { authService } from '../../services/authService';

const LogoutButton: React.FC = () => {
  const { t } = useTranslation();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors touch-manipulation"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span className="font-medium text-sm sm:text-base">{t('common.logout')}</span>
    </button>
  );
};

export default LogoutButton;
