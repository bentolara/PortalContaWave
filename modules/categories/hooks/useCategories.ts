// ============================================
// CATEGORIES HOOKS
// ============================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { categoriesApi, Category, CreateCategoryDto, UpdateCategoryDto } from '@/services/api';
import type { ApiError } from '@/services/api';

export function useCategories(type?: 'expense' | 'revenue') {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoriesApi.getAll(type);
      setCategories(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}

export function useCategory(id: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchCategory() {
      try {
        setLoading(true);
        setError(null);
        const data = await categoriesApi.getById(id);
        setCategory(data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCategory();
    }
  }, [id]);

  return { category, loading, error };
}

export function useCreateCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createCategory = useCallback(async (data: CreateCategoryDto): Promise<Category | null> => {
    try {
      setLoading(true);
      setError(null);
      const category = await categoriesApi.create(data);
      return category;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createCategory, loading, error };
}

export function useUpdateCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const updateCategory = useCallback(async (
    id: string,
    data: UpdateCategoryDto
  ): Promise<Category | null> => {
    try {
      setLoading(true);
      setError(null);
      const category = await categoriesApi.update(id, data);
      return category;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateCategory, loading, error };
}

export function useDeleteCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const deleteCategory = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await categoriesApi.delete(id);
      return true;
    } catch (err) {
      setError(err as ApiError);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteCategory, loading, error };
}
