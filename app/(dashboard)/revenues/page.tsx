// ============================================
// REVENUES MODULE - PAGE
// ============================================

import { RevenuesList } from '@/modules/revenues/components/RevenuesList';
import { RevenuesFilter } from '@/modules/revenues/components/RevenuesFilter';
import { Button } from '@/components/atoms/Button';
import { Plus } from 'lucide-react';

export default function RevenuesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Receitas</h1>
          <p className="text-muted-foreground">Gerencie suas receitas mensais</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Receita
        </Button>
      </div>

      <RevenuesFilter />
      <RevenuesList />
    </div>
  );
}
