import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="flex flex-nowrap gap-2 sm:gap-3 shrink-0">
      <button
        onClick={() => changeLanguage('pl')}
        className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors touch-manipulation whitespace-nowrap shrink-0 ${
          i18n.language === 'pl'
            ? 'bg-green-500 text-black font-semibold'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
        }`}
      >
        {t('language.polish')}
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors touch-manipulation whitespace-nowrap shrink-0 ${
          i18n.language === 'en'
            ? 'bg-green-500 text-black font-semibold'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
        }`}
      >
        {t('language.english')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
