// ============================================
// EXPENSES API SERVICE
// ============================================

import { apiClient } from './client';

export interface Expense {
  id: string;
  description: string;
  value: number;
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

export interface CreateExpenseDto {
  description: string;
  value: number;
  categoryId: string;
  accountId: string;
  date: string;
  isPaid?: boolean;
  isRecurring?: boolean;
  recurrenceType?: 'monthly' | 'yearly';
  notes?: string;
}

export interface UpdateExpenseValueDto {
  value: number;
}

export interface ExpenseHistory {
  month: string;
  total: number;
  count: number;
  expenses: Expense[];
}

export const expensesApi = {
  /**
   * GET /expenses
   * Lista todas as despesas
   */
  async getAll(params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: string;
    isPaid?: boolean;
  }): Promise<Expense[]> {
    const query = new URLSearchParams();
    if (params?.startDate) query.append('startDate', params.startDate);
    if (params?.endDate) query.append('endDate', params.endDate);
    if (params?.categoryId) query.append('categoryId', params.categoryId);
    if (params?.isPaid !== undefined) query.append('isPaid', params.isPaid.toString());

    const endpoint = query.toString() ? `/expenses?${query}` : '/expenses';
    return apiClient.get<Expense[]>(endpoint);
  },

  /**
   * GET /expenses/{id}
   * Busca uma despesa por ID
   */
  async getById(id: string): Promise<Expense> {
    return apiClient.get<Expense>(`/expenses/${id}`);
  },

  /**
   * POST /expenses
   * Cria uma nova despesa
   */
  async create(data: CreateExpenseDto): Promise<Expense> {
    return apiClient.post<Expense, CreateExpenseDto>('/expenses', data);
  },

  /**
   * PUT /expenses/{id}/value
   * Atualiza o valor de uma despesa
   */
  async updateValue(id: string, value: number): Promise<Expense> {
    return apiClient.put<Expense, UpdateExpenseValueDto>(`/expenses/${id}/value`, { value });
  },

  /**
   * DELETE /expenses/{id}
   * Remove uma despesa
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/expenses/${id}`);
  },

  /**
   * GET /expenses/history/{year}
   * Obtém histórico de despesas por ano
   */
  async getHistory(year: number): Promise<ExpenseHistory[]> {
    return apiClient.get<ExpenseHistory[]>(`/expenses/history/${year}`);
  },

  /**
   * PATCH /expenses/{id}/paid
   * Marca despesa como paga/não paga
   */
  async togglePaid(id: string): Promise<Expense> {
    return apiClient.patch<Expense>(`/expenses/${id}/paid`);
  },
};
