import React from 'react';
import { useTranslation } from 'react-i18next';
import { Application } from '../../types';
import { getLastThreeMonths, formatMonthYear, getApplicationsCountForMonth } from '../../utils/dateHelpers';

interface MonthlyStatisticsProps {
  applications: Application[];
}

const MonthlyStatistics: React.FC<MonthlyStatisticsProps> = ({ applications }) => {
  const { t } = useTranslation();
  const lastThreeMonths = getLastThreeMonths();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-300">{t('application.monthlyStatistics')}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {lastThreeMonths.map((month, index) => (
          <div key={index} className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-400 mb-2">{formatMonthYear(month)}</p>
            <p className="text-xl sm:text-2xl font-bold text-white">{getApplicationsCountForMonth(applications, month)}</p>
            <p className="text-xs text-gray-500 mt-1">aplikacji</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyStatistics;
