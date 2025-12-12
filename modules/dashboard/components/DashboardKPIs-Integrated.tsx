// ============================================
// DASHBOARD MODULE - KPIs COMPONENT (INTEGRATED)
// ============================================

'use client';

import { KPICard } from '@/components/molecules/KPICard';
import { Spinner } from '@/components/atoms/Spinner';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useMonthlyReport } from '@/modules/reports/hooks/useReports';

export const DashboardKPIs = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

  const { report, loading, error } = useMonthlyReport(year, month);

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
        <p className="text-red-600">Erro ao carregar indicadores: {error.message}</p>
      </div>
    );
  }

  if (!report) {
    return null;
  }

  const kpis = [
    {
      title: 'Receitas do Mês',
      value: report.totalRevenues,
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
    },
    {
      title: 'Despesas do Mês',
      value: report.totalExpenses,
      icon: <TrendingDown className="h-6 w-6 text-red-600" />,
    },
    {
      title: 'Saldo do Mês',
      value: report.netIncome,
      icon: report.netIncome >= 0 
        ? <TrendingUp className="h-6 w-6 text-green-600" /> 
        : <TrendingDown className="h-6 w-6 text-red-600" />,
    },
    {
      title: 'Período',
      value: 0, // Placeholder for period display
      icon: <Wallet className="h-6 w-6 text-blue-600" />,
      customValue: report.period,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          icon={kpi.icon}
        />
      ))}
    </div>
  );
};
