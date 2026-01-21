export const getStatusTranslation = (status: string, t: (key: string) => string): string => {
  const statusMap: Record<string, string> = {
    'applied': t('application.applied'),
    'recruitment_task': t('application.recruitmentTask'),
    'interview': t('application.interview'),
    'got_job': t('application.gotJob'),
    'rejected': t('application.rejected'),
    'no_response': t('application.noResponse'),
  };
  return statusMap[status] || status;
};

export const getStatusClasses = (status: string): string => {
  if (status === 'got_job') return 'bg-green-500/20 text-green-400';
  if (status === 'rejected') return 'bg-red-500/20 text-red-400';
  if (status === 'no_response') return 'bg-gray-500/20 text-gray-400';
  return 'bg-yellow-500/20 text-yellow-400';
};
