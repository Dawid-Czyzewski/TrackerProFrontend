import React from 'react';
import { useTranslation } from 'react-i18next';
import { Application } from '../../types';
import { getStatusTranslation, getStatusClasses } from '../../utils/statusHelpers';

interface ApplicationTableProps {
  applications: Application[];
  onViewHistory: (app: Application) => void;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  onViewHistory,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t('application.companyName')}</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t('application.position')}</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t('application.platform')}</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t('application.appliedAt')}</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{t('application.status')}</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-4 text-white font-medium">{app.companyName}</td>
              <td className="py-3 px-4 text-gray-400">{app.position || '-'}</td>
              <td className="py-3 px-4 text-gray-400">{app.platform || '-'}</td>
              <td className="py-3 px-4 text-gray-400 text-sm">
                {new Date(app.appliedAt).toLocaleDateString('pl-PL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(app.status)}`}>
                  {getStatusTranslation(app.status, t)}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onViewHistory(app)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors touch-manipulation"
                    title={t('application.viewStatusHistory')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onEdit(app)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors touch-manipulation"
                    title={t('common.edit')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(app)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors touch-manipulation"
                    title={t('common.delete')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
