// ============================================
// DASHBOARD MODULE - CASH FLOW CHART
// ============================================

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const CashFlowChart = () => {
  // Mock data
  const data = [
    { month: 'Jan', receitas: 25000, despesas: 18000 },
    { month: 'Fev', receitas: 26500, despesas: 19500 },
    { month: 'Mar', receitas: 24800, despesas: 17800 },
    { month: 'Abr', receitas: 27200, despesas: 20100 },
    { month: 'Mai', receitas: 28000, despesas: 19200 },
    { month: 'Jun', receitas: 25800, despesas: 15400 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fluxo de Caixa</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="receitas"
              stroke="#10b981"
              strokeWidth={2}
              name="Receitas"
            />
            <Line
              type="monotone"
              dataKey="despesas"
              stroke="#ef4444"
              strokeWidth={2}
              name="Despesas"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
