import React from 'react';
import { useTranslation } from 'react-i18next';
import { ApplicationStats, Application, Budget } from '../../types';

interface DashboardStatsProps {
  stats: ApplicationStats;
  allApplications: Application[];
  budget: Budget | null;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, allApplications, budget }) => {
  const { t } = useTranslation();

  const totalApplications = allApplications.length;
  const pendingApplications = allApplications.filter(
    app => app.status === 'applied' || app.status === 'recruitment_task' || app.status === 'interview'
  ).length;
  const rejectedApplications = allApplications.filter(app => app.status === 'rejected').length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      <div className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-1">{t('dashboard.allApplications')}</p>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{totalApplications}</p>
      </div>

      <div className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-1">{t('dashboard.monthlyApplications')}</p>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{stats.monthly}</p>
      </div>

      <div className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-1">{t('dashboard.inProgress')}</p>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{pendingApplications}</p>
      </div>

      <div className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mb-1">{t('dashboard.rejected')}</p>
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{rejectedApplications}</p>
      </div>

      <div className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 md:p-6 rounded-lg">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
          <p className="text-xs sm:text-sm text-gray-400 mb-1">{t('dashboard.vacationBudget')}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{budget ? `${parseFloat(budget.balance).toFixed(2).replace('.', ',')} zł` : '0,00 zł'}</p>
        </div>

        <div className="bg-gray-900 border border-green-500/30 p-3 sm:p-4 md:p-6 rounded-lg">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mb-1">{t('dashboard.budgetGoals')}</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">{budget?.goalsCount || 0}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
