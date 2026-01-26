import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TransferToVacationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (amount: string) => Promise<void>;
  balance: string;
}

const TransferToVacationModal: React.FC<TransferToVacationModalProps> = ({ 
  isOpen, 
  onClose, 
  onTransfer, 
  balance 
}) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [transferring, setTransferring] = useState(false);
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

    setTransferring(true);
    try {
      await onTransfer(amount);
      setAmount('');
    } catch (err: any) {
      setError(err.response?.data?.error || t('savings.transferError'));
    } finally {
      setTransferring(false);
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
            <h2 className="text-lg sm:text-xl font-bold text-white">{t('savings.transferToVacation')}</h2>
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
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                {t('savings.availableBalance')}: {formatAmount(balance)} zł
              </p>
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
                disabled={transferring || !amount}
                className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {transferring ? t('common.loading') : t('savings.transfer')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TransferToVacationModal;
