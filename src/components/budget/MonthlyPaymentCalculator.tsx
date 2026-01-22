import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Budget, Goal } from '../../types';
import { budgetService } from '../../services/budgetService';

interface MonthlyPaymentCalculatorProps {
  budget: Budget | null;
  goals: Goal[];
}

const MonthlyPaymentCalculator: React.FC<MonthlyPaymentCalculatorProps> = ({ budget, goals }) => {
  const { t } = useTranslation();
  const [vacationMonths, setVacationMonths] = useState(budget?.vacationMonths || 12);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (budget?.vacationMonths) {
      setVacationMonths(budget.vacationMonths);
    }
  }, [budget]);

  const handleSave = async () => {
    if (!budget) return;
    
    setSaving(true);
    try {
      const updatedBudget = await budgetService.updateVacationMonths(vacationMonths);
      setIsEditing(false);
      window.dispatchEvent(new CustomEvent('budgetUpdated', { detail: updatedBudget }));
    } catch (error) {
      console.error('Error updating vacation months:', error);
    } finally {
      setSaving(false);
    }
  };

  const calculateMonthlyPayment = () => {
    if (goals.length === 0 || vacationMonths <= 0) {
      return { monthlyPayment: 0, shortage: 0 };
    }

    const totalTargetAmount = goals.reduce((sum, goal) => {
      return sum + parseFloat(goal.targetAmount || '0');
    }, 0);

    const totalDeposits = parseFloat(budget?.totalDeposits || '0');

    const remainingAmount = Math.max(0, totalTargetAmount - totalDeposits);

    const monthlyPayment = Math.floor(remainingAmount / vacationMonths);

    const totalCollected = monthlyPayment * vacationMonths;

    const shortage = remainingAmount - totalCollected;

    return { monthlyPayment, shortage };
  };

  const { monthlyPayment, shortage } = calculateMonthlyPayment();

  const formatAmount = (value: number) => {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-400 mb-0.5">{t('budget.proposedMonthlyPayment')}</p>
            {goals.length > 0 ? (
              <div className="flex items-baseline gap-2">
                <p className="text-lg sm:text-xl font-bold text-white">
                  {formatAmount(monthlyPayment)} zł
                </p>
                {shortage !== undefined && shortage > 0 && (
                  <p className="text-xs font-medium text-yellow-400">
                    ({t('budget.shortage')}: {formatAmount(shortage)} zł)
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-500">{t('budget.addGoalsToCalculate')}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {isEditing ? (
            <>
              <input
                type="number"
                min="1"
                max="120"
                value={vacationMonths}
                onChange={(e) => setVacationMonths(parseInt(e.target.value) || 12)}
                className="w-16 sm:w-20 px-2 py-1.5 bg-gray-700 border border-gray-600 text-white rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSave}
                disabled={saving || vacationMonths < 1}
                className="px-2 py-1.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {saving ? t('common.loading') : t('common.save')}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setVacationMonths(budget?.vacationMonths || 12);
                }}
                disabled={saving}
                className="px-2 py-1.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {t('common.cancel')}
              </button>
            </>
          ) : (
            <>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-0.5">{t('budget.vacationTime')}</p>
                <p className="text-sm font-medium text-white">{vacationMonths} {t('budget.months')}</p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 active:bg-blue-500/40 text-blue-400 rounded-lg transition-colors touch-manipulation"
                title={t('common.edit')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyPaymentCalculator;
