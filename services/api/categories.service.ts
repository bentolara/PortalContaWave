// ============================================
// CATEGORIES API SERVICE
// ============================================

import { apiClient } from './client';

export interface Category {
  id: string;
  name: string;
  type: 'expense' | 'revenue';
  icon?: string;
  color?: string;
  parentId?: string;
  createdAt: string;
}

export interface CreateCategoryDto {
  name: string;
  type: 'expense' | 'revenue';
  icon?: string;
  color?: string;
  parentId?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  icon?: string;
  color?: string;
  parentId?: string;
}

export const categoriesApi = {
  /**
   * GET /categories
   * Lista todas as categorias
   */
  async getAll(type?: 'expense' | 'revenue'): Promise<Category[]> {
    const endpoint = type ? `/categories?type=${type}` : '/categories';
    return apiClient.get<Category[]>(endpoint);
  },

  /**
   * GET /categories/{id}
   * Busca uma categoria por ID
   */
  async getById(id: string): Promise<Category> {
    return apiClient.get<Category>(`/categories/${id}`);
  },

  /**
   * POST /categories
   * Cria uma nova categoria
   */
  async create(data: CreateCategoryDto): Promise<Category> {
    return apiClient.post<Category, CreateCategoryDto>('/categories', data);
  },

  /**
   * PUT /categories/{id}
   * Atualiza uma categoria existente
   */
  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    return apiClient.put<Category, UpdateCategoryDto>(`/categories/${id}`, data);
  },

  /**
   * DELETE /categories/{id}
   * Remove uma categoria
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/categories/${id}`);
  },
};
