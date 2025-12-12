// ============================================
// REPORTS HOOKS
// ============================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { reportsApi, MonthlyReport, CashFlowData, BalanceSheet, IncomeStatement } from '@/services/api';
import type { ApiError } from '@/services/api';

export function useMonthlyReport(year: number, month: number) {
  const [report, setReport] = useState<MonthlyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        setLoading(true);
        setError(null);
        const data = await reportsApi.getMonthlyReport(year, month);
        setReport(data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [year, month]);

  return { report, loading, error };
}

export function useCashFlow(params: {
  startDate: string;
  endDate: string;
  groupBy?: 'day' | 'week' | 'month';
}) {
  const [cashFlow, setCashFlow] = useState<CashFlowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchCashFlow = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportsApi.getCashFlow(params);
      setCashFlow(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchCashFlow();
  }, [fetchCashFlow]);

  return { cashFlow, loading, error, refetch: fetchCashFlow };
}

export function useBalanceSheet(date: string) {
  const [balanceSheet, setBalanceSheet] = useState<BalanceSheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    async function fetchBalanceSheet() {
      try {
        setLoading(true);
        setError(null);
        const data = await reportsApi.getBalanceSheet(date);
        setBalanceSheet(data);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    }

    if (date) {
      fetchBalanceSheet();
    }
  }, [date]);

  return { balanceSheet, loading, error };
}

export function useIncomeStatement(params: {
  startDate: string;
  endDate: string;
}) {
  const [incomeStatement, setIncomeStatement] = useState<IncomeStatement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchIncomeStatement = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportsApi.getIncomeStatement(params);
      setIncomeStatement(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchIncomeStatement();
  }, [fetchIncomeStatement]);

  return { incomeStatement, loading, error, refetch: fetchIncomeStatement };
}

export function useExportPdf() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const exportPdf = useCallback(async (
    reportType: string,
    params: Record<string, string>
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const blob = await reportsApi.exportPdf(reportType, params);
      
      // Criar link de download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${reportType}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (err) {
      setError(err as ApiError);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { exportPdf, loading, error };
}
