import api from './api';
import { Budget, Transaction, Goal } from '../types';

export const budgetService = {
  getBudget: async (): Promise<Budget> => {
    const response = await api.get('/budget');
    return response.data;
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get('/budget/transactions');
    return response.data;
  },

  addTransaction: async (data: Partial<Transaction>): Promise<Transaction> => {
    const response = await api.post('/budget/transactions', data);
    return response.data;
  },

  getGoals: async (): Promise<Goal[]> => {
    const response = await api.get('/budget/goals');
    return response.data;
  },

  addGoal: async (data: Partial<Goal>): Promise<Goal> => {
    const response = await api.post('/budget/goals', data);
    return response.data;
  },
};
