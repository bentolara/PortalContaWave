// ============================================
// EXPENSES HOOKS
// ============================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { expensesApi, Expense, CreateExpenseDto } from '@/services/api';
import type { ApiError } from '@/services/api';

interface ExpensesFilters {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  isPaid?: boolean;
}

export function useExpenses(filters?: ExpensesFilters) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expensesApi.getAll(filters);
      setExpenses(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return { expenses, loading, error, refetch: fetchExpenses };
}

export function useExpense(id: string) {
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchExpense() {
      try {
        setLoading(true);
        setError(null);
        const data = await expensesApi.getById(id);
        setExpense(data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchExpense();
    }
  }, [id]);

  return { expense, loading, error };
}

export function useCreateExpense() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createExpense = useCallback(async (data: CreateExpenseDto): Promise<Expense | null> => {
    try {
      setLoading(true);
      setError(null);
      const expense = await expensesApi.create(data);
      return expense;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createExpense, loading, error };
}

export function useUpdateExpenseValue() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const updateValue = useCallback(async (
    id: string,
    value: number
  ): Promise<Expense | null> => {
    try {
      setLoading(true);
      setError(null);
      const expense = await expensesApi.updateValue(id, value);
      return expense;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateValue, loading, error };
}

export function useDeleteExpense() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const deleteExpense = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await expensesApi.delete(id);
      return true;
    } catch (err) {
      setError(err as ApiError);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteExpense, loading, error };
}

export function useToggleExpensePaid() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const togglePaid = useCallback(async (id: string): Promise<Expense | null> => {
    try {
      setLoading(true);
      setError(null);
      const expense = await expensesApi.togglePaid(id);
      return expense;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { togglePaid, loading, error };
}

export function useExpensesHistory(year: number) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        setError(null);
        const data = await expensesApi.getHistory(year);
        setHistory(data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [year]);

  return { history, loading, error };
}
