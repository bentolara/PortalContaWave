// ============================================
// REPORTS MODULE - PAGE
// ============================================

import { ReportSelector } from '@/modules/reports/components/ReportSelector';
import { IncomeStatementReport } from '@/modules/reports/components/IncomeStatementReport';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Análises detalhadas das suas finanças</p>
      </div>

      <ReportSelector />
      <IncomeStatementReport />
    </div>
  );
}
