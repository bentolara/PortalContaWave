// ============================================
// REVENUES HOOKS - UNIT TESTS
// ============================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useRevenues, useCreateRevenue, useToggleRevenueReceived } from '@/modules/revenues/hooks/useRevenues';
import { revenuesApi } from '@/services/api';

vi.mock('@/services/api', () => ({
  revenuesApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    toggleReceived: vi.fn(),
  },
}));

describe('useRevenues', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch revenues successfully', async () => {
    const mockRevenues = [
      { id: '1', description: 'Salário', value: 5000, isReceived: true },
      { id: '2', description: 'Freelance', value: 1000, isReceived: false },
    ];

    (revenuesApi.getAll as any).mockResolvedValueOnce(mockRevenues);

    const { result } = renderHook(() => useRevenues());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.revenues).toEqual(mockRevenues);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors when fetching revenues', async () => {
    const mockError = { message: 'Network error', statusCode: 500 };

    (revenuesApi.getAll as any).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useRevenues());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.revenues).toEqual([]);
    expect(result.current.error).toEqual(mockError);
  });

  it('should apply filters when fetching revenues', async () => {
    const filters = {
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isReceived: true,
    };

    (revenuesApi.getAll as any).mockResolvedValueOnce([]);

    renderHook(() => useRevenues(filters));

    await waitFor(() => {
      expect(revenuesApi.getAll).toHaveBeenCalledWith(filters);
    });
  });

  it('should not cause infinite loop with stable filter values', async () => {
    const filters = {
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      categoryId: 'cat1',
    };

    (revenuesApi.getAll as any).mockResolvedValue([]);

    const { rerender } = renderHook(() => useRevenues(filters));

    await waitFor(() => {
      expect(revenuesApi.getAll).toHaveBeenCalledTimes(1);
    });

    // Simulate re-renders with same filter values
    rerender();
    rerender();
    rerender();

    // Should still only have been called once
    expect(revenuesApi.getAll).toHaveBeenCalledTimes(1);
  });
});

describe('useCreateRevenue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create revenue successfully', async () => {
    const newRevenue = {
      description: 'Nova receita',
      value: 2000,
      categoryId: '1',
      accountId: '1',
      date: '2025-12-11',
    };

    const mockResponse = { id: '3', ...newRevenue };

    (revenuesApi.create as any).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCreateRevenue());

    let createdRevenue;
    await waitFor(async () => {
      createdRevenue = await result.current.createRevenue(newRevenue);
    });

    expect(createdRevenue).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors when creating revenue', async () => {
    const mockError = { message: 'Validation error', statusCode: 400 };

    (revenuesApi.create as any).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCreateRevenue());

    let createdRevenue;
    await waitFor(async () => {
      createdRevenue = await result.current.createRevenue({} as any);
    });

    expect(createdRevenue).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });
});

describe('useToggleRevenueReceived', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should toggle revenue received status', async () => {
    const mockResponse = { id: '1', description: 'Salário', isReceived: true };

    (revenuesApi.toggleReceived as any).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useToggleRevenueReceived());

    let toggledRevenue;
    await waitFor(async () => {
      toggledRevenue = await result.current.toggleReceived('1');
    });

    expect(revenuesApi.toggleReceived).toHaveBeenCalledWith('1');
    expect(toggledRevenue).toEqual(mockResponse);
  });
});
