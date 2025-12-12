// ============================================
// DASHBOARD MODULE - EXPENSES CHART
// ============================================

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const ExpensesChart = () => {
  // Mock data
  const data = [
    { name: 'Alimentação', value: 3500 },
    { name: 'Moradia', value: 2800 },
    { name: 'Transporte', value: 1200 },
    { name: 'Saúde', value: 850 },
    { name: 'Outros', value: 1650 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Despesas por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
