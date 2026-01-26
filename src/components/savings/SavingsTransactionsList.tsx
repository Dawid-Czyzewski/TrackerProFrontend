import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SavingsTransaction } from '../../services/savingsService';

interface SavingsTransactionsListProps {
  transactions: SavingsTransaction[];
  onDelete: (id: number) => Promise<void>;
}

const SavingsTransactionsList: React.FC<SavingsTransactionsListProps> = ({ transactions, onDelete }) => {
  const { t } = useTranslation();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await onDelete(id);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const formatAmount = (value: string) => {
    return parseFloat(value || '0').toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">{t('savings.transactions')}</h2>
      
      {transactions.length === 0 ? (
        <p className="text-gray-400 text-sm">{t('savings.noTransactions')}</p>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.type === 'deposit' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'deposit' ? t('savings.deposit') : t('savings.withdrawal')}
                  </span>
                </div>
                {transaction.description && (
                  <p className="text-xs text-gray-400 mb-1">{transaction.description}</p>
                )}
                <p className="text-xs text-gray-500">{formatDate(transaction.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}{formatAmount(transaction.amount)} zł
                  </p>
                </div>
                {deleteConfirmId === transaction.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleConfirmDelete(transaction.id)}
                      disabled={deletingId === transaction.id}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      {deletingId === transaction.id ? t('common.deleting') : t('common.delete')}
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      disabled={deletingId === transaction.id}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      {t('common.cancel')}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteClick(transaction.id)}
                    disabled={deletingId === transaction.id}
                    className="p-1.5 text-gray-400 hover:text-red-400 transition-colors touch-manipulation"
                    title={t('common.delete')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavingsTransactionsList;
