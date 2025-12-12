// ============================================
// DASHBOARD MODULE - RECENT TRANSACTIONS
// ============================================

'use client';

import { TransactionList } from '@/components/organisms/TransactionList';
import type { Transaction } from '@/types';

export const RecentTransactions = () => {
  // Mock data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'expense',
      description: 'Supermercado',
      amount: 350.50,
      categoryId: '1',
      accountId: '1',
      date: '2025-12-10',
      isPaid: true,
      isRecurring: false,
      createdAt: '2025-12-10T10:00:00Z',
      updatedAt: '2025-12-10T10:00:00Z',
    },
    {
      id: '2',
      type: 'revenue',
      description: 'Salário',
      amount: 8500.00,
      categoryId: '2',
      accountId: '1',
      date: '2025-12-05',
      isPaid: true,
      isRecurring: true,
      recurrenceType: 'monthly',
      createdAt: '2025-12-05T10:00:00Z',
      updatedAt: '2025-12-05T10:00:00Z',
    },
    {
      id: '3',
      type: 'expense',
      description: 'Conta de Luz',
      amount: 185.30,
      categoryId: '3',
      accountId: '1',
      date: '2025-12-08',
      isPaid: false,
      isRecurring: true,
      recurrenceType: 'monthly',
      createdAt: '2025-12-08T10:00:00Z',
      updatedAt: '2025-12-08T10:00:00Z',
    },
  ];

  return <TransactionList transactions={transactions} />;
};
