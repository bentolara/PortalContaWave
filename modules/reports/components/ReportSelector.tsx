// ============================================
// REPORTS MODULE - SELECTOR COMPONENT
// ============================================

'use client';

import { Card, CardContent } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { FileText, TrendingUp, PieChart } from 'lucide-react';

export const ReportSelector = () => {
  const reports = [
    { id: 'income', name: 'DRE Pessoal', icon: FileText },
    { id: 'cashflow', name: 'Fluxo de Caixa', icon: TrendingUp },
    { id: 'balance', name: 'Balanço Patrimonial', icon: PieChart },
  ];

  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Button key={report.id} variant="outline" className="flex-1">
              <Icon className="mr-2 h-4 w-4" />
              {report.name}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};
