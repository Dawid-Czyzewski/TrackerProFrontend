import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { savingsService, SavingsBudget, SavingsStats, SavingsTransaction } from '../services/savingsService';
import { SavingsSkeleton } from '../components/SkeletonLoader';
import SavingsStatsCards from '../components/savings/SavingsStatsCards';
import EnergyDrinkButton from '../components/savings/EnergyDrinkButton';
import TransferToVacationModal from '../components/savings/TransferToVacationModal';
import WithdrawalModal from '../components/savings/WithdrawalModal';
import SavingsTransactionsList from '../components/savings/SavingsTransactionsList';

const Savings: React.FC = () => {
  const { t } = useTranslation();
  const [savings, setSavings] = useState<SavingsBudget | null>(null);
  const [stats, setStats] = useState<SavingsStats | null>(null);
  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [savingsData, statsData, transactionsData] = await Promise.all([
        savingsService.getSavings(),
        savingsService.getStats(),
        savingsService.getTransactions()
      ]);
      setSavings(savingsData);
      setStats(statsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching savings data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEnergyDrinkSave = async () => {
    setSaving(true);
    try {
      const updated = await savingsService.addEnergyDrinkSavings();
      setSavings(updated);
      await fetchData();
    } catch (error) {
      console.error('Error saving energy drink:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTransfer = async (amount: string) => {
    try {
      await savingsService.transferToVacation(amount);
      await fetchData();
      setIsTransferModalOpen(false);
      // Dispatch event to update vacation budget
      window.dispatchEvent(new CustomEvent('budgetUpdated'));
    } catch (error) {
      console.error('Error transferring to vacation:', error);
      throw error;
    }
  };

  const handleWithdrawal = async (amount: string, description?: string) => {
    try {
      const updated = await savingsService.addWithdrawal(amount, description);
      setSavings(updated);
      await fetchData();
      setIsWithdrawalModalOpen(false);
    } catch (error) {
      console.error('Error adding withdrawal:', error);
      throw error;
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await savingsService.deleteTransaction(id);
      await fetchData();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  };

  if (loading) {
    return <SavingsSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{t('savings.title')}</h1>
        <p className="text-gray-400 text-sm sm:text-base">{t('savings.subtitle')}</p>
      </div>

      {stats && <SavingsStatsCards stats={stats} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <EnergyDrinkButton 
            onSave={handleEnergyDrinkSave} 
            saving={saving}
            onTransferClick={() => setIsTransferModalOpen(true)}
            onWithdrawalClick={() => setIsWithdrawalModalOpen(true)}
            balance={savings?.balance || '0.00'}
          />
        </div>

        <div className="space-y-4">
          <SavingsTransactionsList 
            transactions={transactions} 
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>

      <TransferToVacationModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onTransfer={handleTransfer}
        balance={savings?.balance || '0.00'}
      />

      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        onWithdraw={handleWithdrawal}
        balance={savings?.balance || '0.00'}
      />
    </div>
  );
};

export default Savings;
