import React from 'react';
import { useTranslation } from 'react-i18next';

interface AuthTabsProps {
  activeTab: 'login' | 'register';
  onTabChange: (tab: 'login' | 'register') => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex border-b border-gray-800 mb-6">
      <button
        type="button"
        onClick={() => onTabChange('login')}
        className={`flex-1 text-center py-3 font-semibold transition-colors ${
          activeTab === 'login'
            ? 'text-white border-b-2 border-green-500'
            : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        {t('auth.loginTab')}
      </button>
      <button
        type="button"
        onClick={() => onTabChange('register')}
        className={`flex-1 text-center py-3 font-semibold transition-colors ${
          activeTab === 'register'
            ? 'text-white border-b-2 border-green-500'
            : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        {t('auth.registerTab')}
      </button>
    </div>
  );
};

export default AuthTabs;
