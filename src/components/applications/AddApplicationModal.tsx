import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Application } from '../../types';

interface AddApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (companyName: string, position: string, platform: string, status: string, appliedAt: string) => Promise<void>;
  onUpdate?: (id: number, companyName: string, position: string, platform: string, status: string, appliedAt: string) => Promise<void>;
  loading: boolean;
  application?: Application | null;
}

const AddApplicationModal: React.FC<AddApplicationModalProps> = ({ isOpen, onClose, onAdd, onUpdate, loading, application }) => {
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [platform, setPlatform] = useState('');
  const [status, setStatus] = useState('applied');
  const [appliedAt, setAppliedAt] = useState(new Date().toISOString().split('T')[0]);

  const isEditMode = !!application;

  useEffect(() => {
    if (application) {
      setCompanyName(application.companyName);
      setPosition(application.position || '');
      setPlatform(application.platform || '');
      setStatus(application.status);
      setAppliedAt(application.appliedAt.split(' ')[0] || application.appliedAt.split('T')[0]);
    } else {
      setCompanyName('');
      setPosition('');
      setPlatform('');
      setStatus('applied');
      setAppliedAt(new Date().toISOString().split('T')[0]);
    }
  }, [application, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) return;
    
    if (isEditMode && application && onUpdate) {
      await onUpdate(application.id, companyName, position, platform, status, appliedAt);
    } else {
      await onAdd(companyName, position, platform, status, appliedAt);
      setCompanyName('');
      setPosition('');
      setPlatform('');
      setStatus('applied');
      setAppliedAt(new Date().toISOString().split('T')[0]);
    }
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">{isEditMode ? t('application.editApplication') : t('application.addApplication')}</h2>
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

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                {t('application.companyName')} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={t('application.companyName')}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                {t('application.position')}
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder={t('application.position')}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                {t('application.platform')}
              </label>
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder={t('application.platformPlaceholder')}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                {t('application.status')}
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="applied">{t('application.applied')}</option>
                <option value="recruitment_task">{t('application.recruitmentTask')}</option>
                <option value="interview">{t('application.interview')}</option>
                <option value="got_job">{t('application.gotJob')}</option>
                <option value="rejected">{t('application.rejected')}</option>
                <option value="no_response">{t('application.noResponse')}</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                Data aplikacji
              </label>
              <input
                type="date"
                value={appliedAt}
                onChange={(e) => setAppliedAt(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-lg font-medium text-sm sm:text-base transition-colors touch-manipulation"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading || !companyName}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {loading ? t('common.loading') : (isEditMode ? t('common.save') : t('application.addApplication'))}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddApplicationModal;
