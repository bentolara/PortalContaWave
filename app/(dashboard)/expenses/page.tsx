// ============================================
// EXPENSES MODULE - PAGE
// ============================================

import { ExpensesList } from '@/modules/expenses/components/ExpensesList';
import { ExpensesFilter } from '@/modules/expenses/components/ExpensesFilter';
import { Button } from '@/components/atoms/Button';
import { Plus } from 'lucide-react';

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Despesas</h1>
          <p className="text-muted-foreground">Gerencie suas despesas mensais</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Despesa
        </Button>
      </div>

      <ExpensesFilter />
      <ExpensesList />
    </div>
  );
}
