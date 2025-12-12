// ============================================
// ACCOUNTS API SERVICE - UNIT TESTS
// ============================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { accountsApi } from '@/services/api/accounts.service';
import { apiClient } from '@/services/api/client';

vi.mock('@/services/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AccountsApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all accounts', async () => {
      const mockAccounts = [
        { id: '1', name: 'Conta Corrente', type: 'asset', balance: 1000 },
        { id: '2', name: 'Poupança', type: 'asset', balance: 5000 },
      ];

      (apiClient.get as any).mockResolvedValueOnce(mockAccounts);

      const result = await accountsApi.getAll();

      expect(apiClient.get).toHaveBeenCalledWith('/accounts');
      expect(result).toEqual(mockAccounts);
    });
  });

  describe('getById', () => {
    it('should fetch account by id', async () => {
      const mockAccount = { id: '1', name: 'Conta Corrente', type: 'asset', balance: 1000 };

      (apiClient.get as any).mockResolvedValueOnce(mockAccount);

      const result = await accountsApi.getById('1');

      expect(apiClient.get).toHaveBeenCalledWith('/accounts/1');
      expect(result).toEqual(mockAccount);
    });
  });

  describe('create', () => {
    it('should create a new account', async () => {
      const newAccount = {
        name: 'Nova Conta',
        type: 'asset' as const,
        subtype: 'Corrente',
        balance: 1000,
        currency: 'BRL',
      };

      const mockResponse = { id: '3', ...newAccount };

      (apiClient.post as any).mockResolvedValueOnce(mockResponse);

      const result = await accountsApi.create(newAccount);

      expect(apiClient.post).toHaveBeenCalledWith('/accounts', newAccount);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should update an existing account', async () => {
      const updateData = { name: 'Conta Atualizada', balance: 2000 };
      const mockResponse = { id: '1', ...updateData };

      (apiClient.put as any).mockResolvedValueOnce(mockResponse);

      const result = await accountsApi.update('1', updateData);

      expect(apiClient.put).toHaveBeenCalledWith('/accounts/1', updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('delete', () => {
    it('should delete an account', async () => {
      (apiClient.delete as any).mockResolvedValueOnce(undefined);

      await accountsApi.delete('1');

      expect(apiClient.delete).toHaveBeenCalledWith('/accounts/1');
    });
  });

  describe('getBalance', () => {
    it('should fetch account balance', async () => {
      const mockBalance = { balance: 1500 };

      (apiClient.get as any).mockResolvedValueOnce(mockBalance);

      const result = await accountsApi.getBalance('1');

      expect(apiClient.get).toHaveBeenCalledWith('/accounts/balance/1');
      expect(result).toEqual(mockBalance);
    });
  });
});
