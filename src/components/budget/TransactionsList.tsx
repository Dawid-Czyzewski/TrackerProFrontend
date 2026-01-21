import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { budgetService } from '../../services/budgetService';
import { Transaction } from '../../types';

const TransactionsList: React.FC = () => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const data = await budgetService.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTransactions();
  }, []);

  useEffect(() => {
    const handleTransactionAdded = () => {
      fetchTransactions();
    };

    window.addEventListener('transactionAdded', handleTransactionAdded);
    return () => {
      window.removeEventListener('transactionAdded', handleTransactionAdded);
    };
  }, []);

  const formatAmount = (amount: string) => {
    return parseFloat(amount).toFixed(2).replace('.', ',');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">{t('budget.transactionsHistory')}</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">{t('budget.transactionsHistory')}</h2>
        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-300 text-sm sm:text-base font-medium mb-2 text-center">{t('budget.noTransactions')}</p>
          <p className="text-gray-500 text-xs sm:text-sm text-center">{t('budget.addFirstTransaction')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">{t('budget.transactionsHistory')}</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-900 border border-gray-700 rounded-lg p-3 sm:p-4 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    transaction.type === 'deposit' 
                      ? 'bg-green-500/20' 
                      : 'bg-red-500/20'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                      {transaction.description || (transaction.type === 'deposit' ? t('budget.deposit') : t('budget.withdrawal'))}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-base sm:text-lg font-bold ${
                  transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}{formatAmount(transaction.amount)} zł
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {transaction.type === 'deposit' ? t('budget.deposit') : t('budget.withdrawal')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
