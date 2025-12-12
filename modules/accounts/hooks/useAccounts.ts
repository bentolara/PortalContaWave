// ============================================
// ACCOUNTS HOOKS
// ============================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { accountsApi, Account, CreateAccountDto, UpdateAccountDto } from '@/services/api';
import type { ApiError } from '@/services/api';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await accountsApi.getAll();
      setAccounts(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, loading, error, refetch: fetchAccounts };
}

export function useAccount(id: string) {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchAccount() {
      try {
        setLoading(true);
        setError(null);
        const data = await accountsApi.getById(id);
        setAccount(data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchAccount();
    }
  }, [id]);

  return { account, loading, error };
}

export function useCreateAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createAccount = useCallback(async (data: CreateAccountDto): Promise<Account | null> => {
    try {
      setLoading(true);
      setError(null);
      const account = await accountsApi.create(data);
      return account;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createAccount, loading, error };
}

export function useUpdateAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const updateAccount = useCallback(async (
    id: string,
    data: UpdateAccountDto
  ): Promise<Account | null> => {
    try {
      setLoading(true);
      setError(null);
      const account = await accountsApi.update(id, data);
      return account;
    } catch (err) {
      setError(err as ApiError);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateAccount, loading, error };
}

export function useDeleteAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const deleteAccount = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await accountsApi.delete(id);
      return true;
    } catch (err) {
      setError(err as ApiError);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteAccount, loading, error };
}

export function useAccountBalance(id: string) {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        setLoading(true);
        setError(null);
        const data = await accountsApi.getBalance(id);
        setBalance(data.balance);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBalance();
    }
  }, [id]);

  return { balance, loading, error };
}
