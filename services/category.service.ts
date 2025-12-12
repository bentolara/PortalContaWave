// ============================================
// CATEGORY SERVICE
// ============================================

import { apiClient } from './api-client';
import type { Category, CategoryFormData, ApiResponse } from '@/types';

export const categoryService = {
  async getAll(type?: 'expense' | 'revenue'): Promise<Category[]> {
    const params = type ? { type } : {};
    const response = await apiClient.get<ApiResponse<Category[]>>('/categories', { params });
    return response.data.data;
  },

  async getById(id: string): Promise<Category> {
    const response = await apiClient.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  },

  async create(data: CategoryFormData): Promise<Category> {
    const response = await apiClient.post<ApiResponse<Category>>('/categories', data);
    return response.data.data;
  },

  async update(id: string, data: Partial<CategoryFormData>): Promise<Category> {
    const response = await apiClient.put<ApiResponse<Category>>(`/categories/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};
