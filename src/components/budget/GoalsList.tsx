import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Budget, Goal } from '../../types';

interface GoalsListProps {
  goals: Goal[];
  budget: Budget | null;
  onAddGoalClick: () => void;
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (id: number) => Promise<void>;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals, budget, onAddGoalClick, onEditGoal, onDeleteGoal }) => {
  const { t } = useTranslation();
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = (goal: Goal) => {
    setDeletingGoal(goal);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingGoal) return;
    
    setDeleting(true);
    try {
      await onDeleteGoal(deletingGoal.id);
      setIsDeleteModalOpen(false);
      setDeletingGoal(null);
    } catch (error) {
      console.error('Error deleting goal:', error);
    } finally {
      setDeleting(false);
    }
  };

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
        <div className="space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {(() => {
            const sortedGoals = [...goals].sort((a, b) => a.id - b.id);
            let remaining = parseFloat(budget?.balance || '0');
            const goalsWithAllocation = sortedGoals.map((g) => {
              const target = parseFloat(g.targetAmount || '1');
              const allocated = Math.min(remaining, target);
              remaining = Math.max(0, remaining - allocated);
              const progress = target > 0 ? Math.min(100, (allocated / target) * 100) : 0;
              const isFilled = allocated >= target;
              return { goal: g, allocated, target, progress, isFilled };
            });
            return goalsWithAllocation.map(({ goal, allocated, progress, isFilled }) => (
              <div key={goal.id} className="border border-gray-700 rounded-lg p-3 sm:p-4">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="font-semibold text-white text-sm sm:text-base">{goal.name}</h3>
                  <div className="flex items-center gap-2">
                    {isFilled && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                        {t('application.accepted')}
                      </span>
                    )}
                    <button
                      onClick={() => onEditGoal(goal)}
                      className="p-1.5 sm:p-2 bg-blue-500/20 hover:bg-blue-500/30 active:bg-blue-500/40 text-blue-400 rounded-lg transition-colors touch-manipulation"
                      title={t('common.edit')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(goal)}
                      className="p-1.5 sm:p-2 bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 text-red-400 rounded-lg transition-colors touch-manipulation"
                      title={t('common.delete')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mb-2 sm:mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-gray-300 text-xs sm:text-sm">
                      {formatAmount(allocated.toFixed(2))} / {formatAmount(goal.targetAmount)} zł
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm font-medium">
                      {progress.toFixed(0)}%
                    </p>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3 sm:h-4 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFilled 
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
            ));
          })()}
        </div>
      )}

      {deletingGoal && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 z-40 ${isDeleteModalOpen ? '' : 'hidden'}`}
            onClick={() => !deleting && setIsDeleteModalOpen(false)}
          />

          <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 ${isDeleteModalOpen ? '' : 'hidden'}`}>
            <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">{t('budget.deleteGoal')}</h2>
                <button
                  onClick={() => !deleting && setIsDeleteModalOpen(false)}
                  disabled={deleting}
                  className="text-gray-400 hover:text-white transition-colors touch-manipulation p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm sm:text-base text-center mb-2">
                  {t('budget.confirmDeleteGoalMessage')}
                </p>
                <p className="text-white font-semibold text-base sm:text-lg text-center">
                  {deletingGoal.name}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm text-center mt-2">
                  {t('budget.deleteGoalWarning')}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={deleting}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-lg font-medium text-sm sm:text-base transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t('common.deleting')}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>{t('common.delete')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalsList;
