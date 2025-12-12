// ============================================
// REPORTS API SERVICE
// ============================================

import { apiClient } from './client';

export interface MonthlyReport {
  period: string;
  totalRevenues: number;
  totalExpenses: number;
  netIncome: number;
  revenuesByCategory: CategorySummary[];
  expensesByCategory: CategorySummary[];
}

export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  total: number;
  percentage: number;
}

export interface CashFlowData {
  date: string;
  revenues: number;
  expenses: number;
  balance: number;
  cumulativeBalance: number;
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

export interface IncomeStatement {
  period: string;
  revenues: {
    operating: number;
    financial: number;
    other: number;
    total: number;
  };
  expenses: {
    operational: number;
    financial: number;
    other: number;
    total: number;
  };
  netIncome: number;
}

export const reportsApi = {
  /**
   * GET /reports/monthly/{year}/{month}
   * Relatório mensal consolidado
   */
  async getMonthlyReport(year: number, month: number): Promise<MonthlyReport> {
    return apiClient.get<MonthlyReport>(`/reports/monthly/${year}/${month}`);
  },

  /**
   * GET /reports/cashflow
   * Fluxo de caixa
   */
  async getCashFlow(params: {
    startDate: string;
    endDate: string;
    groupBy?: 'day' | 'week' | 'month';
  }): Promise<CashFlowData[]> {
    const query = new URLSearchParams();
    query.append('startDate', params.startDate);
    query.append('endDate', params.endDate);
    if (params.groupBy) query.append('groupBy', params.groupBy);

    return apiClient.get<CashFlowData[]>(`/reports/cashflow?${query}`);
  },

  /**
   * GET /reports/balance-sheet
   * Balanço patrimonial
   */
  async getBalanceSheet(date: string): Promise<BalanceSheet> {
    return apiClient.get<BalanceSheet>(`/reports/balance-sheet?date=${date}`);
  },

  /**
   * GET /reports/income-statement
   * DRE (Demonstração do Resultado do Exercício)
   */
  async getIncomeStatement(params: {
    startDate: string;
    endDate: string;
  }): Promise<IncomeStatement> {
    const query = new URLSearchParams();
    query.append('startDate', params.startDate);
    query.append('endDate', params.endDate);

    return apiClient.get<IncomeStatement>(`/reports/income-statement?${query}`);
  },

  /**
   * GET /reports/export/pdf
   * Exporta relatório em PDF
   */
  async exportPdf(reportType: string, params: Record<string, string>): Promise<Blob> {
    const query = new URLSearchParams(params);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reports/export/pdf/${reportType}?${query}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao exportar PDF');
    }

    return response.blob();
  },
};
