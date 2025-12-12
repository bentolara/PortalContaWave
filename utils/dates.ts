// ============================================
// DATE HELPERS
// ============================================

import { 
  startOfMonth, 
  endOfMonth, 
  subMonths, 
  format,
  parseISO 
} from 'date-fns';

export const getCurrentMonthRange = () => {
  const now = new Date();
  return {
    start: format(startOfMonth(now), 'yyyy-MM-dd'),
    end: format(endOfMonth(now), 'yyyy-MM-dd'),
  };
};

export const getLastMonthRange = () => {
  const lastMonth = subMonths(new Date(), 1);
  return {
    start: format(startOfMonth(lastMonth), 'yyyy-MM-dd'),
    end: format(endOfMonth(lastMonth), 'yyyy-MM-dd'),
  };
};

export const getMonthRange = (monthsAgo: number = 0) => {
  const targetMonth = subMonths(new Date(), monthsAgo);
  return {
    start: format(startOfMonth(targetMonth), 'yyyy-MM-dd'),
    end: format(endOfMonth(targetMonth), 'yyyy-MM-dd'),
  };
};

export const formatISODate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const parseDate = (dateString: string): Date => {
  return parseISO(dateString);
};
