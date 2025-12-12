// ============================================
// ACCOUNT SERVICE
// ============================================

import { apiClient } from './api-client';
import type { Account, AccountFormData, ApiResponse } from '@/types';

export const accountService = {
  async getAll(type?: 'asset' | 'liability'): Promise<Account[]> {
    const params = type ? { type } : {};
    const response = await apiClient.get<ApiResponse<Account[]>>('/accounts', { params });
    return response.data.data;
  },

  async getById(id: string): Promise<Account> {
    const response = await apiClient.get<ApiResponse<Account>>(`/accounts/${id}`);
    return response.data.data;
  },

  async create(data: AccountFormData): Promise<Account> {
    const response = await apiClient.post<ApiResponse<Account>>('/accounts', data);
    return response.data.data;
  },

  async update(id: string, data: Partial<AccountFormData>): Promise<Account> {
    const response = await apiClient.put<ApiResponse<Account>>(`/accounts/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/accounts/${id}`);
  },

  async getBalance(id: string): Promise<number> {
    const response = await apiClient.get<ApiResponse<{ balance: number }>>(`/accounts/${id}/balance`);
    return response.data.data.balance;
  },
};
