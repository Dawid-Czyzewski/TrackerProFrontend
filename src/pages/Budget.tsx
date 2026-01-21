import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { budgetService } from '../services/budgetService';
import { Budget, Goal } from '../types';
import { BudgetSkeleton } from '../components/SkeletonLoader';
import BudgetStats from '../components/budget/BudgetStats';
import TransactionForm from '../components/budget/TransactionForm';
import GoalsList from '../components/budget/GoalsList';
import AddGoalModal from '../components/budget/AddGoalModal';
import TransactionsList from '../components/budget/TransactionsList';

const BudgetPage: React.FC = () => {
  const { t } = useTranslation();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [addingGoal, setAddingGoal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetData, goalsData] = await Promise.all([
          budgetService.getBudget(),
          budgetService.getGoals()
        ]);
        setBudget(budgetData);
        setGoals(goalsData);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTransaction = async (
    type: 'deposit' | 'withdrawal',
    amount: string,
    description: string
  ) => {
    setSubmitting(true);
    try {
      await budgetService.addTransaction({
        type,
        amount,
        description: description || undefined
      });
      
      const updatedBudget = await budgetService.getBudget();
      setBudget(updatedBudget);
      window.dispatchEvent(new CustomEvent('transactionAdded'));
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddGoal = async (name: string, targetAmount: string) => {
    setAddingGoal(true);
    try {
      await budgetService.addGoal({
        name,
        targetAmount
      });
      
      const [updatedBudget, updatedGoals] = await Promise.all([
        budgetService.getBudget(),
        budgetService.getGoals()
      ]);
      setBudget(updatedBudget);
      setGoals(updatedGoals);
    } catch (error) {
      console.error('Error adding goal:', error);
    } finally {
      setAddingGoal(false);
    }
  };

  const totalGoalsAmount = goals.reduce((sum, goal) => {
    return sum + parseFloat(goal.targetAmount || '0');
  }, 0);

  const goalCoverage = totalGoalsAmount > 0
    ? Math.min(100, (parseFloat(budget?.balance || '0') / totalGoalsAmount) * 100)
    : 0;

  if (loading) {
    return <BudgetSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{t('budget.title')}</h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">{t('budget.subtitle')}</p>
      </div>

      <BudgetStats budget={budget} goals={goals} goalCoverage={goalCoverage} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <TransactionForm onSubmit={handleAddTransaction} submitting={submitting} />
        <GoalsList
          goals={goals}
          budget={budget}
          onAddGoalClick={() => setIsGoalModalOpen(true)}
        />
      </div>

      <TransactionsList />

      <AddGoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onAdd={handleAddGoal}
        loading={addingGoal}
      />
    </div>
  );
};

export default BudgetPage;
