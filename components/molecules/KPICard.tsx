// ============================================
// KPI CARD COMPONENT (MOLECULE)
// ============================================

import React from 'react';
import { Card, CardContent } from '../atoms/Card';
import { cn } from '@/utils/cn';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  change?: number;
  isCurrency?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  isCurrency = true,
  icon,
  className,
}) => {
  const isPositive = change !== undefined && change >= 0;
  const displayValue = isCurrency ? formatCurrency(value) : value.toLocaleString();

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-3xl font-bold">{displayValue}</h3>
            {change !== undefined && (
              <div className={cn(
                'mt-2 flex items-center text-sm font-medium',
                isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {isPositive ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                <span>{formatPercentage(Math.abs(change))}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="ml-4 rounded-full bg-primary/10 p-3">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
