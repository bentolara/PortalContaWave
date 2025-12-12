// ============================================
// TRANSACTION LIST COMPONENT (ORGANISM)
// ============================================

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../atoms/Card';
import { TransactionItem } from '../molecules/TransactionItem';
import { Spinner } from '../atoms/Spinner';
import type { Transaction } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTogglePaid?: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
  onEdit,
  onDelete,
  onTogglePaid,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-12">
          <Spinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Nenhuma transação encontrada</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y px-6">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePaid={onTogglePaid}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
