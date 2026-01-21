import React from 'react';
import { useTranslation } from 'react-i18next';
import { Application } from '../../types';
import ApplicationCard from './ApplicationCard';
import ApplicationTable from './ApplicationTable';

interface ApplicationListProps {
  applications: Application[];
  onViewHistory: (app: Application) => void;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  onViewHistory,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-800 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-300 text-base sm:text-lg font-medium mb-2 text-center">{t('application.noApplications')}</p>
        <p className="text-gray-500 text-xs sm:text-sm text-center">{t('application.addFirstApplication')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-3 sm:gap-4">
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onViewHistory={onViewHistory}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <ApplicationTable
        applications={applications}
        onViewHistory={onViewHistory}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default ApplicationList;
