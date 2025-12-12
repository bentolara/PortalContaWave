// ============================================
// DASHBOARD MODULE - PAGE
// ============================================

import { DashboardKPIs } from '@/modules/dashboard/components/DashboardKPIs';
import { ExpensesChart } from '@/modules/dashboard/components/ExpensesChart';
import { CashFlowChart } from '@/modules/dashboard/components/CashFlowChart';
import { RecentTransactions } from '@/modules/dashboard/components/RecentTransactions';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas finanças</p>
      </div>

      {/* KPIs */}
      <DashboardKPIs />

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ExpensesChart />
        <CashFlowChart />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}
