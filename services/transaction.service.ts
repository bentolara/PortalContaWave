// ============================================
// TRANSACTION SERVICE
// ============================================

import { apiClient } from './api-client';
import type { 
  Transaction, 
  TransactionFormData, 
  ApiResponse, 
  PaginatedResponse 
} from '@/types';

export const transactionService = {
  // Listar transações com filtros
  async getAll(params?: {
    type?: 'expense' | 'revenue';
    startDate?: string;
    endDate?: string;
    categoryId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Transaction>> {
    const response = await apiClient.get<PaginatedResponse<Transaction>>('/transactions', { params });
    return response.data;
  },

  // Buscar por ID
  async getById(id: string): Promise<Transaction> {
    const response = await apiClient.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    return response.data.data;
  },

  // Criar
  async create(data: TransactionFormData): Promise<Transaction> {
    const response = await apiClient.post<ApiResponse<Transaction>>('/transactions', data);
    return response.data.data;
  },

  // Atualizar
  async update(id: string, data: Partial<TransactionFormData>): Promise<Transaction> {
    const response = await apiClient.put<ApiResponse<Transaction>>(`/transactions/${id}`, data);
    return response.data.data;
  },

  // Deletar
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/transactions/${id}`);
  },

  // Marcar como pago/não pago
  async togglePaid(id: string): Promise<Transaction> {
    const response = await apiClient.patch<ApiResponse<Transaction>>(`/transactions/${id}/toggle-paid`);
    return response.data.data;
  },
};
