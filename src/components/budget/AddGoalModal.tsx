import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, targetAmount: string) => Promise<void>;
  loading: boolean;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAdd, loading }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount || parseFloat(targetAmount) <= 0) return;
    
    await onAdd(name, targetAmount);
    setName('');
    setTargetAmount('');
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
            <h2 className="text-lg sm:text-xl font-bold text-white">{t('budget.addGoal')}</h2>
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
                {t('budget.goalName')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('budget.goalNamePlaceholder')}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                {t('budget.targetAmount')}
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder={t('budget.amountPlaceholder')}
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
                disabled={loading || !name || !targetAmount || parseFloat(targetAmount) <= 0}
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {loading ? t('common.loading') : t('budget.addGoal')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddGoalModal;
