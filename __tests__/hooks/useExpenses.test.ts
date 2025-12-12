// ============================================
// EXPENSES HOOKS - UNIT TESTS
// ============================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useExpenses, useCreateExpense, useToggleExpensePaid } from '@/modules/expenses/hooks/useExpenses';
import { expensesApi } from '@/services/api';

vi.mock('@/services/api', () => ({
  expensesApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    togglePaid: vi.fn(),
  },
}));

describe('useExpenses', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch expenses successfully', async () => {
    const mockExpenses = [
      { id: '1', description: 'Aluguel', value: 1500, isPaid: true },
      { id: '2', description: 'Luz', value: 200, isPaid: false },
    ];

    (expensesApi.getAll as any).mockResolvedValueOnce(mockExpenses);

    const { result } = renderHook(() => useExpenses());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.expenses).toEqual(mockExpenses);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors when fetching expenses', async () => {
    const mockError = { message: 'Network error', statusCode: 500 };

    (expensesApi.getAll as any).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useExpenses());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.expenses).toEqual([]);
    expect(result.current.error).toEqual(mockError);
  });

  it('should apply filters when fetching expenses', async () => {
    const filters = {
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isPaid: true,
    };

    (expensesApi.getAll as any).mockResolvedValueOnce([]);

    renderHook(() => useExpenses(filters));

    await waitFor(() => {
      expect(expensesApi.getAll).toHaveBeenCalledWith(filters);
    });
  });

  it('should not cause infinite loop with stable filter values', async () => {
    const filters = {
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      categoryId: 'cat1',
    };

    (expensesApi.getAll as any).mockResolvedValue([]);

    const { rerender } = renderHook(() => useExpenses(filters));

    await waitFor(() => {
      expect(expensesApi.getAll).toHaveBeenCalledTimes(1);
    });

    // Simulate re-renders with same filter values
    rerender();
    rerender();
    rerender();

    // Should still only have been called once
    expect(expensesApi.getAll).toHaveBeenCalledTimes(1);
  });
});

describe('useCreateExpense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create expense successfully', async () => {
    const newExpense = {
      description: 'Nova despesa',
      value: 100,
      categoryId: '1',
      accountId: '1',
      date: '2025-12-11',
    };

    const mockResponse = { id: '3', ...newExpense };

    (expensesApi.create as any).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCreateExpense());

    let createdExpense;
    await waitFor(async () => {
      createdExpense = await result.current.createExpense(newExpense);
    });

    expect(createdExpense).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors when creating expense', async () => {
    const mockError = { message: 'Validation error', statusCode: 400 };

    (expensesApi.create as any).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCreateExpense());

    let createdExpense;
    await waitFor(async () => {
      createdExpense = await result.current.createExpense({} as any);
    });

    expect(createdExpense).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });
});

describe('useToggleExpensePaid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should toggle expense paid status', async () => {
    const mockResponse = { id: '1', description: 'Aluguel', isPaid: true };

    (expensesApi.togglePaid as any).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useToggleExpensePaid());

    let toggledExpense;
    await waitFor(async () => {
      toggledExpense = await result.current.togglePaid('1');
    });

    expect(expensesApi.togglePaid).toHaveBeenCalledWith('1');
    expect(toggledExpense).toEqual(mockResponse);
  });
});
