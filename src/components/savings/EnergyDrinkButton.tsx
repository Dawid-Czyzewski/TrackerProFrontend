import React from 'react';
import { useTranslation } from 'react-i18next';

interface EnergyDrinkButtonProps {
  onSave: () => void;
  saving: boolean;
  onTransferClick: () => void;
  onWithdrawalClick: () => void;
  balance: string;
}

const EnergyDrinkButton: React.FC<EnergyDrinkButtonProps> = ({ 
  onSave, 
  saving, 
  onTransferClick, 
  onWithdrawalClick,
  balance 
}) => {
  const { t } = useTranslation();

  const formatAmount = (value: string) => {
    return parseFloat(value || '0').toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">{t('savings.energyDrinkTitle')}</h2>
      
      <div className="space-y-4">
        <button
          onClick={onSave}
          disabled={saving}
          className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center gap-3"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{t('savings.saving')}</span>
            </>
          ) : (
            <span>{t('savings.saveEnergyDrink')}</span>
          )}
        </button>

        <div className="flex gap-3">
          <button
            onClick={onTransferClick}
            disabled={parseFloat(balance) <= 0}
            className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            {t('savings.transferToVacation')}
          </button>
          
          <button
            onClick={onWithdrawalClick}
            disabled={parseFloat(balance) <= 0}
            className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            {t('savings.withdraw')}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-1">{t('savings.currentBalance')}</p>
          <p className="text-2xl font-bold text-white">{formatAmount(balance)} zł</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyDrinkButton;
