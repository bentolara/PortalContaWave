// ============================================
// ACCOUNTS MODULE - LIST COMPONENT
// ============================================

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Spinner } from '@/components/atoms/Spinner';
import { formatCurrency } from '@/utils/formatters';
import { useAccounts } from '../hooks/useAccounts';

export const AccountsList = () => {
  const { accounts, loading, error } = useAccounts();

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
        <p className="text-red-600">Erro ao carregar contas: {error.message}</p>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhuma conta cadastrada.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <Card key={account.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{account.name}</CardTitle>
              <Badge variant={account.type === 1 || account.type === 3 ? 'success' : 'destructive'}>
                {account.type === 1 ? 'Ativo' : account.type === 2 ? 'Passivo' : account.type === 3 ? 'Receita' : 'Despesa'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{account.code}</p>
            <p className={`text-2xl font-bold ${
              (account.balance || 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatCurrency(Math.abs(account.balance || 0))}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
