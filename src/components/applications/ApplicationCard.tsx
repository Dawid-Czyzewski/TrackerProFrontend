import React from 'react';
import { useTranslation } from 'react-i18next';
import { Application } from '../../types';
import { getStatusTranslation, getStatusClasses } from '../../utils/statusHelpers';

interface ApplicationCardProps {
  application: Application;
  onViewHistory: (app: Application) => void;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application: app,
  onViewHistory,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-5 hover:border-green-500/50 transition-colors">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1 truncate">{app.companyName}</h3>
          {app.position && <p className="text-gray-400 mb-1 text-sm sm:text-base truncate">{app.position}</p>}
          {app.platform && <p className="text-gray-400 mb-2 text-xs sm:text-sm truncate">{t('application.platform')}: {app.platform}</p>}
          <p className="text-xs sm:text-sm text-gray-500">
            {new Date(app.appliedAt).toLocaleDateString('pl-PL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium w-fit ${getStatusClasses(app.status)}`}>
            {getStatusTranslation(app.status, t)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onViewHistory(app)}
              className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation flex items-center justify-center gap-1.5"
              title={t('application.viewStatusHistory')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">{t('application.statusHistory')}</span>
            </button>
            <button
              onClick={() => onEdit(app)}
              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation flex items-center justify-center"
              title={t('common.edit')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(app)}
              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors touch-manipulation flex items-center justify-center"
              title={t('common.delete')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
