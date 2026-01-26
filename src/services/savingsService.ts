import api from './api';

export interface SavingsBudget {
  id: number;
  balance: string;
  totalDeposits: string;
  totalWithdrawals: string;
}

export interface SavingsTransaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: string;
  description?: string;
  createdAt: string;
}

export interface SavingsStats {
  balance: string;
  totalDeposits: string;
  totalWithdrawals: string;
  weekly: string;
  monthly: string;
  yearly: string;
}

export const savingsService = {
  getSavings: async (): Promise<SavingsBudget> => {
    const response = await api.get('/savings');
    return response.data;
  },

  getStats: async (): Promise<SavingsStats> => {
    const response = await api.get('/savings/stats');
    return response.data;
  },

  getTransactions: async (): Promise<SavingsTransaction[]> => {
    const response = await api.get('/savings/transactions');
    return response.data;
  },

  addEnergyDrinkSavings: async (): Promise<SavingsBudget> => {
    const response = await api.post('/savings/energy-drink');
    return response.data;
  },

  addWithdrawal: async (amount: string, description?: string): Promise<SavingsBudget> => {
    const response = await api.post('/savings/withdrawal', { amount, description });
    return response.data;
  },

  transferToVacation: async (amount: string): Promise<{ savingsBudget: SavingsBudget; vacationBudget: any }> => {
    const response = await api.post('/savings/transfer-to-vacation', { amount });
    return response.data;
  },

  deleteTransaction: async (id: number): Promise<void> => {
    await api.delete(`/savings/transactions/${id}`);
  },
};
