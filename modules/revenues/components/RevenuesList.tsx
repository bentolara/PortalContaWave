// ============================================
// REVENUES MODULE - LIST COMPONENT
// ============================================

'use client';

import { TransactionList } from '@/components/organisms/TransactionList';
import { Spinner } from '@/components/atoms/Spinner';
import { useRevenues } from '../hooks/useRevenues';
import { useFilterStore } from '@/store';
import type { Transaction } from '@/types';

export const RevenuesList = () => {
  const { dateRange, selectedCategories } = useFilterStore();
  
  const { revenues, loading, error } = useRevenues({
    startDate: dateRange.start,
    endDate: dateRange.end,
    categoryId: selectedCategories[0],
  });

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
        <p className="text-red-600">Erro ao carregar receitas: {error.message}</p>
      </div>
    );
  }

  // Converter formato da API para formato do TransactionList
  const transactions: Transaction[] = revenues.map((revenue) => ({
    id: revenue.id,
    type: 'revenue' as const,
    description: revenue.description,
    amount: revenue.value,
    categoryId: revenue.categoryId,
    accountId: revenue.accountId,
    date: revenue.date,
    isPaid: revenue.isReceived,
    isRecurring: revenue.isRecurring,
    recurrenceType: revenue.recurrenceType,
    notes: revenue.notes,
    createdAt: revenue.createdAt,
    updatedAt: revenue.updatedAt,
  }));

  return <TransactionList transactions={transactions} />;
};
