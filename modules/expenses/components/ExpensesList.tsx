// ============================================
// EXPENSES MODULE - LIST COMPONENT
// ============================================

'use client';

import { TransactionList } from '@/components/organisms/TransactionList';
import { Spinner } from '@/components/atoms/Spinner';
import { useExpenses } from '../hooks/useExpenses';
import { useFilterStore } from '@/store';
import type { Transaction } from '@/types';

export const ExpensesList = () => {
  const { dateRange, selectedCategories } = useFilterStore();
  
  const { expenses, loading, error } = useExpenses({
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
        <p className="text-red-600">Erro ao carregar despesas: {error.message}</p>
      </div>
    );
  }

  // Converter formato da API para formato do TransactionList
  const transactions: Transaction[] = expenses.map((expense) => ({
    id: expense.id,
    type: 'expense' as const,
    description: expense.description,
    amount: expense.value,
    categoryId: expense.categoryId,
    accountId: expense.accountId,
    date: expense.date,
    isPaid: expense.isPaid,
    isRecurring: expense.isRecurring,
    recurrenceType: expense.recurrenceType,
    notes: expense.notes,
    createdAt: expense.createdAt,
    updatedAt: expense.updatedAt,
  }));

  return <TransactionList transactions={transactions} />;
};
