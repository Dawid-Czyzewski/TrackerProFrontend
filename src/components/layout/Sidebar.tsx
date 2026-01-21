import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '../../types';
import LanguageSwitcher from '../LanguageSwitcher';
import LogoutButton from './LogoutButton';

interface SidebarProps {
  user: User;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="p-4 sm:p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-lg sm:text-xl font-bold text-white">Tracker Pro</span>
        </div>
        <button
          onClick={onClose}
          className="xl:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors touch-manipulation"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2">
        <Link
          to="/dashboard"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors touch-manipulation ${
            isActive('/dashboard')
              ? 'bg-green-500 text-black font-semibold'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="font-medium text-sm sm:text-base">{t('navigation.dashboard')}</span>
        </Link>
        
        <Link
          to="/applications"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors touch-manipulation ${
            isActive('/applications')
              ? 'bg-green-500 text-black font-semibold'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-medium text-sm sm:text-base">{t('navigation.applications')}</span>
        </Link>
        
        <Link
          to="/budget"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors touch-manipulation ${
            isActive('/budget')
              ? 'bg-green-500 text-black font-semibold'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-sm sm:text-base">{t('navigation.budget')}</span>
        </Link>
      </nav>

      <div className="xl:hidden p-3 sm:p-4 border-t border-gray-800">
        <div className="px-3 sm:px-4 py-2">
          <p className="text-xs sm:text-sm text-gray-400 mb-2">{t('language.selectLanguage')}</p>
          <LanguageSwitcher />
        </div>
      </div>

      <div className="p-3 sm:p-4 border-t border-gray-800 space-y-1 sm:space-y-2">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 text-gray-300">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs sm:text-sm font-medium truncate">{user.email}</span>
        </div>
        <LogoutButton />
      </div>
    </>
  );
};

export default Sidebar;
