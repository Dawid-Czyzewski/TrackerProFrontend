import React from 'react';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  companyName: string;
  loading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  companyName,
  loading = false
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">{t('application.deleteApplication')}</h2>
            <button
              onClick={onClose}
              disabled={loading}
              className="text-gray-400 hover:text-white transition-colors touch-manipulation p-1 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-gray-300 text-sm sm:text-base text-center mb-2">
              {t('application.confirmDeleteMessage')}
            </p>
            <p className="text-white font-semibold text-base sm:text-lg text-center">
              {companyName}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm text-center mt-2">
              {t('application.deleteWarning')}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-lg font-medium text-sm sm:text-base transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('common.cancel')}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t('common.deleting')}</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>{t('common.delete')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
