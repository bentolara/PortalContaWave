// ============================================
// REVENUES HOOKS
// ============================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { revenuesApi, Revenue, CreateRevenueDto, UpdateRevenueDto } from '@/services/api';
import type { ApiError } from '@/services/api';

interface RevenuesFilters {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  isReceived?: boolean;
}

export function useRevenues(filters?: RevenuesFilters) {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchRevenues = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await revenuesApi.getAll(filters);
      setRevenues(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [filters?.startDate, filters?.endDate, filters?.categoryId, filters?.isReceived]);

  useEffect(() => {
    fetchRevenues();
  }, [fetchRevenues]);

  return { revenues, loading, error, refetch: fetchRevenues };
}

export function useRevenue(id: string) {
  const [revenue, setRevenue] = useState<Revenue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        setLoading(true);
        setError(null);
        const data = await revenuesApi.getById(id);
        setRevenue(data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRevenue();
    }
  }, [id]);

  return { revenue, loading, error };
}

export function useCreateRevenue() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createRevenue = useCallback(async (data: CreateRevenueDto): Promise<Revenue | null> => {
    try {
      setLoading(true);
      setError(null);
      const revenue = await revenuesApi.create(data);
      return revenue;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createRevenue, loading, error };
}

export function useUpdateRevenue() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const updateRevenue = useCallback(async (
    id: string,
    data: UpdateRevenueDto
  ): Promise<Revenue | null> => {
    try {
      setLoading(true);
      setError(null);
      const revenue = await revenuesApi.update(id, data);
      return revenue;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateRevenue, loading, error };
}

export function useDeleteRevenue() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const deleteRevenue = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await revenuesApi.delete(id);
      return true;
    } catch (err) {
      setError(err as ApiError);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteRevenue, loading, error };
}

export function useToggleRevenueReceived() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const toggleReceived = useCallback(async (id: string): Promise<Revenue | null> => {
    try {
      setLoading(true);
      setError(null);
      const revenue = await revenuesApi.toggleReceived(id);
      return revenue;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { toggleReceived, loading, error };
}
