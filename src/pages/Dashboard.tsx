import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { applicationService } from '../services/applicationService';
import { budgetService } from '../services/budgetService';
import { ApplicationStats, Budget, Application } from '../types';
import { DashboardSkeleton } from '../components/SkeletonLoader';
import DashboardStats from '../components/dashboard/DashboardStats';
import LatestApplications from '../components/dashboard/LatestApplications';
import BudgetOverview from '../components/dashboard/BudgetOverview';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, budgetData, applicationsData] = await Promise.all([
          applicationService.getStats(),
          budgetService.getBudget(),
          applicationService.getAll()
        ]);
        setStats(statsData);
        setBudget(budgetData);
        setAllApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!stats) {
    return <div className="text-red-400">{t('dashboard.errorLoading')}</div>;
  }

  const latestApplications = stats.latest || [];

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{t('dashboard.title')}</h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">{t('dashboard.subtitle')}</p>
      </div>

      <DashboardStats stats={stats} allApplications={allApplications} budget={budget} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <LatestApplications applications={latestApplications} />
        <BudgetOverview budget={budget} />
      </div>
    </div>
  );
};

export default Dashboard;
