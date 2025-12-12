// ============================================
// ACCOUNTS API SERVICE
// ============================================

import { apiClient } from './client';

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

export interface CreateAccountDto {
  code: string;
  name: string;
  type: number; // 1=Ativo, 2=Passivo, 3=Receita, 4=Despesa
  parentAccountId?: string;
}

export interface UpdateAccountDto {
  code?: string;
  name?: string;
  type?: number;
  parentAccountId?: string;
}

export const accountsApi = {
  /**
   * GET /accounts
   * Lista todas as contas
   */
  async getAll(): Promise<Account[]> {
    return apiClient.get<Account[]>('/accounts');
  },

  /**
   * GET /accounts/{id}
   * Busca uma conta por ID
   */
  async getById(id: string): Promise<Account> {
    return apiClient.get<Account>(`/accounts/${id}`);
  },

  /**
   * POST /accounts
   * Cria uma nova conta
   */
  async create(data: CreateAccountDto): Promise<Account> {
    return apiClient.post<Account, CreateAccountDto>('/accounts', data);
  },

  /**
   * PUT /accounts/{id}
   * Atualiza uma conta existente
   */
  async update(id: string, data: UpdateAccountDto): Promise<Account> {
    return apiClient.put<Account, UpdateAccountDto>(`/accounts/${id}`, data);
  },

  /**
   * DELETE /accounts/{id}
   * Remove uma conta
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/accounts/${id}`);
  },

  /**
   * GET /accounts/balance/{id}
   * Obtém o saldo atual de uma conta
   */
  async getBalance(id: string): Promise<{ balance: number }> {
    return apiClient.get<{ balance: number }>(`/accounts/balance/${id}`);
  },
};
