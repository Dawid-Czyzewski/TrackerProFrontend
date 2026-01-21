export const getLastThreeMonths = (): Date[] => {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 3; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(date);
  }
  return months.reverse();
};

export const formatMonthYear = (date: Date): string => {
  const monthNames = [
    'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze',
    'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

export const getApplicationsCountForMonth = (applications: any[], monthDate: Date): number => {
  return applications.filter(app => {
    const appDate = new Date(app.appliedAt);
    return appDate.getMonth() === monthDate.getMonth() && 
           appDate.getFullYear() === monthDate.getFullYear();
  }).length;
};
