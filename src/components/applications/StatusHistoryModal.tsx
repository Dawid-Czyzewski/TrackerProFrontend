import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusHistory } from '../../types';

interface StatusHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  statusHistory: StatusHistory[];
  currentStatus: string;
}

const StatusHistoryModal: React.FC<StatusHistoryModalProps> = ({
  isOpen,
  onClose,
  companyName,
  statusHistory,
  currentStatus
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'applied': return t('application.applied');
      case 'recruitment_task': return t('application.recruitmentTask');
      case 'interview': return t('application.interview');
      case 'got_job': return t('application.gotJob');
      case 'rejected': return t('application.rejected');
      case 'no_response': return t('application.noResponse');
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'got_job': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      case 'no_response': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  const sortedHistory = [...statusHistory].sort((a, b) => 
    new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime()
  );

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{t('application.statusHistory')}</h2>
              <p className="text-sm text-gray-400 mt-1">{companyName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors touch-manipulation p-1"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {sortedHistory.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm sm:text-base">{t('application.noStatusHistory')}</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-gray-400">{t('application.currentStatus')}</span>
                </div>
                <span className={`inline-block px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(currentStatus)}`}>
                  {getStatusLabel(currentStatus)}
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-300 mb-3">{t('application.statusChanges')}</h3>
                <div className="space-y-3">
                  {sortedHistory.map((history, index) => (
                    <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(history.oldStatus)}`}>
                              {getStatusLabel(history.oldStatus)}
                            </span>
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(history.newStatus)}`}>
                              {getStatusLabel(history.newStatus)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(history.changedAt).toLocaleString('pl-PL', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-700">
            <button
              onClick={onClose}
              className="w-full px-4 py-2.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-lg font-medium text-sm sm:text-base transition-colors touch-manipulation"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusHistoryModal;
