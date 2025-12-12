// ============================================
// DASHBOARD SERVICE
// ============================================

import { apiClient } from './api-client';
import type { 
  DashboardKPIs, 
  ExpensesByCategory, 
  CashFlowData,
  ApiResponse 
} from '@/types';

export const dashboardService = {
  async getKPIs(period: string): Promise<DashboardKPIs> {
    const response = await apiClient.get<ApiResponse<DashboardKPIs>>('/dashboard/kpis', {
      params: { period },
    });
    return response.data.data;
  },

  async getExpensesByCategory(period: string): Promise<ExpensesByCategory[]> {
    const response = await apiClient.get<ApiResponse<ExpensesByCategory[]>>('/dashboard/expenses-by-category', {
      params: { period },
    });
    return response.data.data;
  },

  async getCashFlow(startDate: string, endDate: string): Promise<CashFlowData[]> {
    const response = await apiClient.get<ApiResponse<CashFlowData[]>>('/dashboard/cash-flow', {
      params: { startDate, endDate },
    });
    return response.data.data;
  },
};
