// ============================================
// TIPAGENS GLOBAIS - ENTITIES
// ============================================

export interface Transaction {
  id: string;
  type: 'expense' | 'revenue';
  description: string;
  amount: number;
  categoryId: string;
  accountId: string;
  date: string;
  isPaid: boolean;
  isRecurring: boolean;
  recurrenceType?: 'monthly' | 'yearly';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'expense' | 'revenue';
  icon?: string;
  color?: string;
  parentId?: string;
  createdAt: string;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  type: number; // 1=Ativo, 2=Passivo, 3=Receita, 4=Despesa
  parentAccountId?: string;
  balance?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  month: string; // YYYY-MM
  plannedAmount: number;
  actualAmount: number;
  createdAt: string;
}

// ============================================
// RESPONSE TYPES - API
// ============================================

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ============================================
// DASHBOARD TYPES
// ============================================

export interface DashboardKPIs {
  totalExpenses: number;
  totalRevenues: number;
  balance: number;
  netWorth: number;
  expensesChange: number; // percentual vs mês anterior
  revenuesChange: number;
}

export interface ExpensesByCategory {
  categoryId: string;
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface CashFlowData {
  month: string;
  revenues: number;
  expenses: number;
  balance: number;
}

// ============================================
// REPORT TYPES
// ============================================

export interface IncomeStatement {
  period: string;
  totalRevenues: number;
  totalExpenses: number;
  netIncome: number;
  revenuesByCategory: Array<{ category: string; amount: number }>;
  expensesByCategory: Array<{ category: string; amount: number }>;
}

export interface BalanceSheet {
  date: string;
  assets: {
    current: number;
    fixed: number;
    total: number;
  };
  liabilities: {
    current: number;
    longTerm: number;
    total: number;
  };
  equity: number;
}

// ============================================
// FORM TYPES
// ============================================

export interface TransactionFormData {
  type: 'expense' | 'revenue';
  description: string;
  amount: number;
  categoryId: string;
  accountId: string;
  date: string;
  isPaid: boolean;
  isRecurring: boolean;
  recurrenceType?: 'monthly' | 'yearly';
  notes?: string;
}

export interface CategoryFormData {
  name: string;
  type: 'expense' | 'revenue';
  icon?: string;
  color?: string;
  parentId?: string;
}

export interface AccountFormData {
  name: string;
  type: 'asset' | 'liability';
  subtype: string;
  balance: number;
  currency: string;
}
