import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Budget } from '../../types';

interface BudgetOverviewProps {
  budget: Budget | null;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ budget }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">{t('dashboard.vacationBudget')}</h2>
        </div>
        <Link to="/budget" className="text-green-400 hover:text-green-300 text-xs sm:text-sm font-medium">
          {t('dashboard.manage')}
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center py-6 sm:py-8">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
          {budget ? `${parseFloat(budget.balance).toFixed(2).replace('.', ',')} zł` : '0,00 zł'}
        </p>
        <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{t('dashboard.currentBudget')}</p>
        <Link to="/budget" className="text-green-400 hover:text-green-300 font-medium text-sm sm:text-base">
          {t('dashboard.addBudgetGoals')}
        </Link>
      </div>
    </div>
  );
};

export default BudgetOverview;
