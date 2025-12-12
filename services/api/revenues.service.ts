// ============================================
// REVENUES API SERVICE
// ============================================

import { apiClient } from './client';

export interface Revenue {
  id: string;
  description: string;
  value: number;
  categoryId: string;
  accountId: string;
  date: string;
  isReceived: boolean;
  isRecurring: boolean;
  recurrenceType?: 'monthly' | 'yearly';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRevenueDto {
  description: string;
  value: number;
  categoryId: string;
  accountId: string;
  date: string;
  isReceived?: boolean;
  isRecurring?: boolean;
  recurrenceType?: 'monthly' | 'yearly';
  notes?: string;
}

export interface UpdateRevenueDto {
  description?: string;
  value?: number;
  categoryId?: string;
  date?: string;
  isReceived?: boolean;
  notes?: string;
}

export const revenuesApi = {
  /**
   * GET /revenues
   * Lista todas as receitas
   */
  async getAll(params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: string;
    isReceived?: boolean;
  }): Promise<Revenue[]> {
    const query = new URLSearchParams();
    if (params?.startDate) query.append('startDate', params.startDate);
    if (params?.endDate) query.append('endDate', params.endDate);
    if (params?.categoryId) query.append('categoryId', params.categoryId);
    if (params?.isReceived !== undefined) query.append('isReceived', params.isReceived.toString());

    const endpoint = query.toString() ? `/revenues?${query}` : '/revenues';
    return apiClient.get<Revenue[]>(endpoint);
  },

  /**
   * GET /revenues/{id}
   * Busca uma receita por ID
   */
  async getById(id: string): Promise<Revenue> {
    return apiClient.get<Revenue>(`/revenues/${id}`);
  },

  /**
   * POST /revenues
   * Cria uma nova receita
   */
  async create(data: CreateRevenueDto): Promise<Revenue> {
    return apiClient.post<Revenue, CreateRevenueDto>('/revenues', data);
  },

  /**
   * PUT /revenues/{id}
   * Atualiza uma receita existente
   */
  async update(id: string, data: UpdateRevenueDto): Promise<Revenue> {
    return apiClient.put<Revenue, UpdateRevenueDto>(`/revenues/${id}`, data);
  },

  /**
   * DELETE /revenues/{id}
   * Remove uma receita
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/revenues/${id}`);
  },

  /**
   * PATCH /revenues/{id}/received
   * Marca receita como recebida/não recebida
   */
  async toggleReceived(id: string): Promise<Revenue> {
    return apiClient.patch<Revenue>(`/revenues/${id}/received`);
  },
};
