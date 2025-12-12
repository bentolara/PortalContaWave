// ============================================
// DASHBOARD MODULE - KPIs COMPONENT
// ============================================

'use client';

import { KPICard } from '@/components/molecules/KPICard';
import { DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

export const DashboardKPIs = () => {
  // Mock data - será substituído por dados reais da API
  const kpis = {
    totalExpenses: 15420.50,
    totalRevenues: 25800.00,
    balance: 10379.50,
    netWorth: 85650.00,
    expensesChange: -5.2,
    revenuesChange: 8.5,
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total Despesas"
        value={kpis.totalExpenses}
        change={kpis.expensesChange}
        icon={<TrendingDown className="h-6 w-6 text-red-600" />}
      />
      <KPICard
        title="Total Receitas"
        value={kpis.totalRevenues}
        change={kpis.revenuesChange}
        icon={<TrendingUp className="h-6 w-6 text-green-600" />}
      />
      <KPICard
        title="Saldo do Mês"
        value={kpis.balance}
        icon={<DollarSign className="h-6 w-6 text-blue-600" />}
      />
      <KPICard
        title="Patrimônio Líquido"
        value={kpis.netWorth}
        icon={<Wallet className="h-6 w-6 text-purple-600" />}
      />
    </div>
  );
};
