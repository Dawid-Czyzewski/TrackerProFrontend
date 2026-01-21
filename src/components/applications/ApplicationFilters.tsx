import React from 'react';
import { useTranslation } from 'react-i18next';

interface ApplicationFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
}

const ApplicationFilters: React.FC<ApplicationFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="flex-1 relative">
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={t('application.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
        />
      </div>
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none pr-8 sm:pr-10 text-sm sm:text-base"
        >
          <option value="all">{t('application.allStatuses')}</option>
          <option value="applied">{t('application.applied')}</option>
          <option value="recruitment_task">{t('application.recruitmentTask')}</option>
          <option value="interview">{t('application.interview')}</option>
          <option value="got_job">{t('application.gotJob')}</option>
          <option value="rejected">{t('application.rejected')}</option>
          <option value="no_response">{t('application.noResponse')}</option>
        </select>
      </div>
    </div>
  );
};

export default ApplicationFilters;
