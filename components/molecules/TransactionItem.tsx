// ============================================
// TRANSACTION ITEM COMPONENT (MOLECULE)
// ============================================

import React from 'react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { formatCurrency, formatDate } from '@/utils/formatters';
import type { Transaction } from '@/types';
import { MoreVertical, CheckCircle, Circle } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTogglePaid?: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete,
  onTogglePaid,
}) => {
  return (
    <div className="flex items-center justify-between border-b py-4 last:border-0">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onTogglePaid?.(transaction.id)}
          className="transition-colors hover:text-primary"
        >
          {transaction.isPaid ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        <div>
          <p className="font-medium">{transaction.description}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p
            className={`font-semibold ${
              transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {transaction.type === 'revenue' ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </p>
          <Badge variant={transaction.isPaid ? 'success' : 'warning'} className="mt-1">
            {transaction.isPaid ? 'Pago' : 'Pendente'}
          </Badge>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
