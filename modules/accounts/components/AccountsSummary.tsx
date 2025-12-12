// ============================================
// ACCOUNTS MODULE - SUMMARY COMPONENT
// ============================================

'use client';

import { KPICard } from '@/components/molecules/KPICard';
import { Spinner } from '@/components/atoms/Spinner';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useAccounts } from '../hooks/useAccounts';
import { useMemo } from 'react';

export const AccountsSummary = () => {
  const { accounts, loading, error } = useAccounts();

  const summary = useMemo(() => {
    // 1=Ativo, 2=Passivo, 3=Receita, 4=Despesa
    const totalAssets = accounts
      .filter((acc) => acc.type === 1 || acc.type === 3)
      .reduce((sum, acc) => sum + (acc.balance || 0), 0);

    const totalLiabilities = accounts
      .filter((acc) => acc.type === 2 || acc.type === 4)
      .reduce((sum, acc) => sum + Math.abs(acc.balance || 0), 0);

    const netWorth = totalAssets - totalLiabilities;

    return { totalAssets, totalLiabilities, netWorth };
  }, [accounts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erro ao carregar resumo: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <KPICard
        title="Total Ativos"
        value={summary.totalAssets}
        icon={<TrendingUp className="h-6 w-6 text-green-600" />}
      />
      <KPICard
        title="Total Passivos"
        value={summary.totalLiabilities}
        icon={<TrendingDown className="h-6 w-6 text-red-600" />}
      />
      <KPICard
        title="Patrimônio Líquido"
        value={summary.netWorth}
        icon={<DollarSign className="h-6 w-6 text-blue-600" />}
      />
    </div>
  );
};
