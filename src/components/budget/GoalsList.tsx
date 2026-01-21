import React from 'react';
import { useTranslation } from 'react-i18next';
import { Budget, Goal } from '../../types';

interface GoalsListProps {
  goals: Goal[];
  budget: Budget | null;
  onAddGoalClick: () => void;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals, budget, onAddGoalClick }) => {
  const { t } = useTranslation();

  const formatAmount = (value: string) => {
    return parseFloat(value || '0').toFixed(2).replace('.', ',');
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white">{t('budget.budgetGoals')}</h2>
      </div>

      <button
        onClick={onAddGoalClick}
        className="w-full mb-4 sm:mb-6 px-3 sm:px-4 py-2 sm:py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors touch-manipulation"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">{t('budget.addGoal')}</span>
        <span className="sm:hidden text-lg font-bold">+</span>
      </button>

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-700 rounded-lg flex items-center justify-center mb-3 sm:mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm sm:text-base text-gray-300 font-medium mb-2 text-center">{t('budget.noGoals')}</p>
          <p className="text-xs sm:text-sm text-gray-500 text-center">{t('budget.addGoalsToTrack')}</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {goals.map((goal) => {
            const totalDeposits = parseFloat(budget?.totalDeposits || '0');
            const targetAmount = parseFloat(goal.targetAmount || '1');
            const progress = Math.min(100, (totalDeposits / targetAmount) * 100);
            
            return (
              <div key={goal.id} className="border border-gray-700 rounded-lg p-3 sm:p-4">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="font-semibold text-white text-sm sm:text-base">{goal.name}</h3>
                  {goal.isCompleted && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                      {t('application.accepted')}
                    </span>
                  )}
                </div>
                
                <div className="mb-2 sm:mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-gray-300 text-xs sm:text-sm">
                      {formatAmount(totalDeposits.toString())} / {formatAmount(goal.targetAmount)} zł
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium">
                      {progress.toFixed(0)}%
                    </p>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3 sm:h-4 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        goal.isCompleted 
                          ? 'bg-green-500' 
                          : progress >= 75 
                            ? 'bg-green-400' 
                            : progress >= 50 
                              ? 'bg-yellow-500' 
                              : 'bg-blue-500'
                      }`}
                      style={{ 
                        width: `${progress}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GoalsList;
