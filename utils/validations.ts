// ============================================
// VALIDATIONS
// ============================================

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string | number | null | undefined): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

export const validatePositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

export const validateDateRange = (start: string, end: string): boolean => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return startDate <= endDate;
};

export const validateCurrency = (value: string): boolean => {
  const currencyRegex = /^\d+(\.\d{1,2})?$/;
  return currencyRegex.test(value);
};
