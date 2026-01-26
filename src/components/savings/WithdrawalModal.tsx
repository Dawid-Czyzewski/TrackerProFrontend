import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (amount: string, description?: string) => Promise<void>;
  balance: string;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ 
  isOpen, 
  onClose, 
  onWithdraw, 
  balance 
}) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError(t('savings.invalidAmount'));
      return;
    }

    if (numAmount > parseFloat(balance)) {
      setError(t('savings.insufficientBalance'));
      return;
    }

    setWithdrawing(true);
    try {
      await onWithdraw(amount, description || undefined);
      setAmount('');
      setDescription('');
    } catch (err: any) {
      setError(err.response?.data?.error || t('savings.withdrawalError'));
    } finally {
      setWithdrawing(false);
    }
  };

  const formatAmount = (value: string) => {
    return parseFloat(value || '0').toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">{t('savings.withdraw')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors touch-manipulation p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                {t('savings.amount')}
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                max={balance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {t('savings.availableBalance')}: {formatAmount(balance)} zł
              </p>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                {t('savings.description')} ({t('common.optional')})
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('savings.descriptionPlaceholder')}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-lg font-medium transition-colors touch-manipulation"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={withdrawing || !amount}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {withdrawing ? t('common.loading') : t('savings.withdraw')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WithdrawalModal;
