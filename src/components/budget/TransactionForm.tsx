import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TransactionFormProps {
  onSubmit: (type: 'deposit' | 'withdrawal', amount: string, description: string) => Promise<void>;
  submitting: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, submitting }) => {
  const { t } = useTranslation();
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    await onSubmit(transactionType, amount, description);
    setAmount('');
    setDescription('');
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">{t('budget.addTransaction')}</h2>
      
      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button
          type="button"
          onClick={() => setTransactionType('deposit')}
          className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors flex items-center justify-center gap-2 touch-manipulation ${
            transactionType === 'deposit'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {t('budget.deposit')}
        </button>
        <button
          type="button"
          onClick={() => setTransactionType('withdrawal')}
          className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors flex items-center justify-center gap-2 touch-manipulation ${
            transactionType === 'withdrawal'
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {t('budget.withdrawal')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
            {t('budget.amount')}
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t('budget.amountPlaceholder')}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
            {t('budget.transactionTitle')}
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('budget.transactionTitlePlaceholder')}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !amount || parseFloat(amount) <= 0}
          className="w-full py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-semibold text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          {transactionType === 'deposit' ? t('budget.addDeposit') : t('budget.addWithdrawal')}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
