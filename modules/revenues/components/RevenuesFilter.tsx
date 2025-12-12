// ============================================
// REVENUES MODULE - FILTER COMPONENT
// ============================================

'use client';

import { Card, CardContent } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Search, Filter } from 'lucide-react';

export const RevenuesFilter = () => {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar receitas..."
            className="w-full"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </CardContent>
    </Card>
  );
};
