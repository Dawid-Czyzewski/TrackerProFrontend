export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isVerified?: boolean;
}

export interface Application {
  id: number;
  companyName: string;
  position?: string;
  platform?: string;
  status: string;
  appliedAt: string;
  createdAt: string;
  statusHistory: StatusHistory[];
}

export interface StatusHistory {
  oldStatus: string;
  newStatus: string;
  changedAt: string;
}

export interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: string;
  description?: string;
  createdAt: string;
}

export interface Goal {
  id: number;
  name: string;
  targetAmount: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface Budget {
  id: number;
  balance: string;
  totalDeposits: string;
  totalWithdrawals: string;
  goalsCount: number;
}

export interface ApplicationStats {
  weekly: number;
  monthly: number;
  latest: Application[];
}
