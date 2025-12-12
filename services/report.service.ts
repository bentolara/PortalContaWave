// ============================================
// REPORT SERVICE
// ============================================

import { apiClient } from './api-client';
import type { IncomeStatement, BalanceSheet, ApiResponse } from '@/types';

export const reportService = {
  async getIncomeStatement(startDate: string, endDate: string): Promise<IncomeStatement> {
    const response = await apiClient.get<ApiResponse<IncomeStatement>>('/reports/income-statement', {
      params: { startDate, endDate },
    });
    return response.data.data;
  },

  async getBalanceSheet(date: string): Promise<BalanceSheet> {
    const response = await apiClient.get<ApiResponse<BalanceSheet>>('/reports/balance-sheet', {
      params: { date },
    });
    return response.data.data;
  },

  async exportToPDF(reportType: string, params: Record<string, string>): Promise<Blob> {
    const response = await apiClient.get(`/reports/export/${reportType}`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
