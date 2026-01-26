import React from 'react';
import { useTranslation } from 'react-i18next';
import { SavingsStats } from '../../services/savingsService';

interface SavingsStatsCardsProps {
  stats: SavingsStats;
}

const SavingsStatsCards: React.FC<SavingsStatsCardsProps> = ({ stats }) => {
  const { t } = useTranslation();

  const formatAmount = (value: string) => {
    return parseFloat(value || '0').toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4 sm:p-5 md:p-6">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <h3 className="text-gray-300 font-medium text-sm sm:text-base">{t('savings.currentBalance')}</h3>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {formatAmount(stats.balance)} zł
        </p>
        <p className="text-xs sm:text-sm text-gray-400">{t('savings.totalSaved')}</p>
      </div>

      <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4 sm:p-5 md:p-6">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <h3 className="text-gray-300 font-medium text-sm sm:text-base">{t('savings.weeklySavings')}</h3>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {formatAmount(stats.weekly)} zł
        </p>
        <p className="text-xs sm:text-sm text-gray-400">{t('savings.thisWeek')}</p>
      </div>

      <div className="bg-gray-800 border border-green-500/30 rounded-lg p-4 sm:p-5 md:p-6">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <h3 className="text-gray-300 font-medium text-sm sm:text-base">{t('savings.monthlySavings')}</h3>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {formatAmount(stats.monthly)} zł
        </p>
        <p className="text-xs sm:text-sm text-gray-400">{t('savings.thisMonth')}</p>
      </div>
    </div>
  );
};

export default SavingsStatsCards;
