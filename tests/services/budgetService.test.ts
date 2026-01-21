import { describe, it, expect, vi, beforeEach } from 'vitest';
import { budgetService } from '../../src/services/budgetService';
import api from '../../src/services/api';
import { Transaction } from '../../src/types';

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('budgetService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getBudget', () => {
    it('should fetch budget', async () => {
      const mockBudget = {
        id: 1,
        balance: '1000.00',
        totalDeposits: '1500.00',
        totalWithdrawals: '500.00',
      };

      (api.get as any).mockResolvedValue({ data: mockBudget });

      const result = await budgetService.getBudget();

      expect(api.get).toHaveBeenCalledWith('/budget');
      expect(result).toEqual(mockBudget);
    });
  });

  describe('getTransactions', () => {
    it('should fetch transactions', async () => {
      const mockTransactions = [
        {
          id: 1,
          type: 'deposit',
          amount: '100.00',
          description: 'Test deposit',
          createdAt: '2024-01-01 12:00:00',
        },
      ];

      (api.get as any).mockResolvedValue({ data: mockTransactions });

      const result = await budgetService.getTransactions();

      expect(api.get).toHaveBeenCalledWith('/budget/transactions');
      expect(result).toEqual(mockTransactions);
    });
  });

  describe('addTransaction', () => {
    it('should add transaction', async () => {
      const transactionData: Partial<Transaction> = {
        type: 'deposit' as const,
        amount: '100.00',
        description: 'Test deposit',
      };

      const mockTransaction = {
        id: 1,
        ...transactionData,
        createdAt: '2024-01-01 12:00:00',
      };

      (api.post as any).mockResolvedValue({ data: mockTransaction });

      const result = await budgetService.addTransaction(transactionData);

      expect(api.post).toHaveBeenCalledWith('/budget/transactions', transactionData);
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('getGoals', () => {
    it('should fetch goals', async () => {
      const mockGoals = [
        {
          id: 1,
          name: 'New Car',
          targetAmount: '5000.00',
          isCompleted: false,
        },
      ];

      (api.get as any).mockResolvedValue({ data: mockGoals });

      const result = await budgetService.getGoals();

      expect(api.get).toHaveBeenCalledWith('/budget/goals');
      expect(result).toEqual(mockGoals);
    });
  });

  describe('addGoal', () => {
    it('should add goal', async () => {
      const goalData = {
        name: 'New Car',
        targetAmount: '5000.00',
      };

      const mockGoal = {
        id: 1,
        ...goalData,
        isCompleted: false,
      };

      (api.post as any).mockResolvedValue({ data: mockGoal });

      const result = await budgetService.addGoal(goalData);

      expect(api.post).toHaveBeenCalledWith('/budget/goals', goalData);
      expect(result).toEqual(mockGoal);
    });
  });
});
