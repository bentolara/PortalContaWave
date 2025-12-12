// ============================================
// REPORTS MODULE - INCOME STATEMENT
// ============================================

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { formatCurrency } from '@/utils/formatters';

export const IncomeStatementReport = () => {
  const data = {
    period: 'Dezembro 2025',
    revenues: [
      { category: 'Salário', amount: 8500.00 },
      { category: 'Freelance', amount: 2500.00 },
    ],
    expenses: [
      { category: 'Moradia', amount: 2800.00 },
      { category: 'Alimentação', amount: 1500.00 },
      { category: 'Transporte', amount: 800.00 },
    ],
  };

  const totalRevenues = data.revenues.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = data.expenses.reduce((sum, item) => sum + item.amount, 0);
  const netIncome = totalRevenues - totalExpenses;

  return (
    <Card>
      <CardHeader>
        <CardTitle>DRE Pessoal - {data.period}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Receitas */}
        <div>
          <h3 className="font-semibold mb-3 text-green-600">Receitas</h3>
          {data.revenues.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span className="text-muted-foreground">{item.category}</span>
              <span className="font-medium">{formatCurrency(item.amount)}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-t font-semibold">
            <span>Total Receitas</span>
            <span className="text-green-600">{formatCurrency(totalRevenues)}</span>
          </div>
        </div>

        {/* Despesas */}
        <div>
          <h3 className="font-semibold mb-3 text-red-600">Despesas</h3>
          {data.expenses.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span className="text-muted-foreground">{item.category}</span>
              <span className="font-medium">{formatCurrency(item.amount)}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-t font-semibold">
            <span>Total Despesas</span>
            <span className="text-red-600">{formatCurrency(totalExpenses)}</span>
          </div>
        </div>

        {/* Resultado */}
        <div className="border-t-2 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Resultado Líquido</span>
            <span className={netIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
              {formatCurrency(netIncome)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
