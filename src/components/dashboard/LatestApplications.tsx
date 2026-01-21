import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Application } from '../../types';

interface LatestApplicationsProps {
  applications: Application[];
}

const LatestApplications: React.FC<LatestApplicationsProps> = ({ applications }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">{t('dashboard.latestApplications')}</h2>
        </div>
        <Link to="/applications" className="text-green-400 hover:text-green-300 text-xs sm:text-sm font-medium">
          {t('dashboard.seeAll')}
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-800 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 text-center">{t('dashboard.noApplications')}</p>
          <Link to="/applications" className="text-green-400 hover:text-green-300 font-medium text-sm sm:text-base">
            {t('dashboard.addFirstApplication')}
          </Link>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {applications.slice(0, 5).map((app) => (
            <div key={app.id} className="border-b border-gray-800 pb-2 sm:pb-3 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start sm:items-center gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm sm:text-base truncate">{app.companyName}</h3>
                  {app.position && <p className="text-xs sm:text-sm text-gray-400 truncate">{app.position}</p>}
                  {app.platform && <p className="text-xs text-gray-500 truncate">{app.platform}</p>}
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                  app.status === 'got_job' ? 'bg-green-500/20 text-green-400' :
                  app.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                  app.status === 'no_response' ? 'bg-gray-500/20 text-gray-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {app.status === 'applied' ? t('application.applied') :
                   app.status === 'recruitment_task' ? t('application.recruitmentTask') :
                   app.status === 'interview' ? t('application.interview') :
                   app.status === 'got_job' ? t('application.gotJob') :
                   app.status === 'rejected' ? t('application.rejected') :
                   app.status === 'no_response' ? t('application.noResponse') :
                   app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestApplications;
