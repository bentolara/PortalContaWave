// ============================================
// API CLIENT - UNIT TESTS
// ============================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { apiClient } from '@/services/api/client';

// Mock fetch global
global.fetch = vi.fn();

describe('ApiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('GET requests', () => {
    it('should make a successful GET request', async () => {
      const mockData = { id: '1', name: 'Test Account' };
      
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await apiClient.get('/accounts/1');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/accounts/1'),
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(result).toEqual(mockData);
    });

    it('should handle 404 errors', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ message: 'Account not found' }),
      });

      await expect(apiClient.get('/accounts/999')).rejects.toMatchObject({
        statusCode: 404,
        message: 'Account not found',
      });
    });

    it('should handle 204 no content', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await apiClient.get('/accounts/empty');
      expect(result).toEqual({});
    });
  });

  describe('POST requests', () => {
    it('should make a successful POST request', async () => {
      const mockData = { id: '1', name: 'New Account', balance: 1000 };
      const postData = { name: 'New Account', balance: 1000 };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await apiClient.post('/accounts', postData);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/accounts'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        })
      );
      expect(result).toEqual(mockData);
    });

    it('should handle validation errors', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          message: 'Validation failed',
          errors: {
            name: ['Name is required'],
            balance: ['Balance must be positive'],
          },
        }),
      });

      await expect(
        apiClient.post('/accounts', { name: '', balance: -100 })
      ).rejects.toMatchObject({
        statusCode: 400,
        message: 'Validation failed',
        errors: {
          name: ['Name is required'],
          balance: ['Balance must be positive'],
        },
      });
    });
  });

  describe('PUT requests', () => {
    it('should make a successful PUT request', async () => {
      const mockData = { id: '1', name: 'Updated Account' };
      const updateData = { name: 'Updated Account' };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await apiClient.put('/accounts/1', updateData);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/accounts/1'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
        })
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('DELETE requests', () => {
    it('should make a successful DELETE request', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await apiClient.delete('/accounts/1');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/accounts/1'),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
      expect(result).toEqual({});
    });
  });

  describe('PATCH requests', () => {
    it('should make a successful PATCH request', async () => {
      const mockData = { id: '1', isPaid: true };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await apiClient.patch('/expenses/1/paid');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/expenses/1/paid'),
        expect.objectContaining({
          method: 'PATCH',
        })
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('Error handling', () => {
    it('should handle network errors', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      await expect(apiClient.get('/accounts')).rejects.toThrow('Network error');
    });

    it('should handle 500 server errors', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ message: 'Server error' }),
      });

      await expect(apiClient.get('/accounts')).rejects.toMatchObject({
        statusCode: 500,
        message: 'Server error',
      });
    });

    it('should handle non-JSON responses', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      await expect(apiClient.get('/accounts')).rejects.toMatchObject({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    });
  });
});
