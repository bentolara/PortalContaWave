// ============================================
// ACCOUNTS TABLE - LIST WITH ACTIONS
// ============================================

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { useAccounts, useDeleteAccount } from '../hooks/useAccounts';
import type { Account } from '@/types';

interface AccountsTableProps {
  onEdit: (account: Account) => void;
}

export function AccountsTable({ onEdit }: AccountsTableProps) {
  const { accounts, loading, error, refetch } = useAccounts();
  const { deleteAccount, loading: deleting } = useDeleteAccount();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    const confirmed = confirm(`Tem certeza que deseja excluir a conta "${name}"?`);
    if (!confirmed) return;

    setDeletingId(id);
    const success = await deleteAccount(id);
    setDeletingId(null);

    if (success) {
      refetch();
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <Spinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar contas: {error.message}</p>
            <Button onClick={() => refetch()}>Tentar Novamente</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (accounts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-gray-500">
          <p className="text-lg mb-2">Nenhuma conta cadastrada</p>
          <p className="text-sm">Clique em "Nova Conta" para começar</p>
        </CardContent>
      </Card>
    );
  }

  // Separar por tipo: 1=Ativo, 2=Passivo, 3=Receita, 4=Despesa
  const assets = accounts.filter((acc) => acc.type === 1 || acc.type === 3);
  const liabilities = accounts.filter((acc) => acc.type === 2 || acc.type === 4);

  return (
    <div className="space-y-6">
      {/* ATIVOS */}
      {assets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-green-600">💰</span>
              Ativos ({assets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Código</th>
                    <th className="text-left py-3 px-4 font-semibold">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                    <th className="text-right py-3 px-4 font-semibold">Saldo</th>
                    <th className="text-center py-3 px-4 font-semibold">Status</th>
                    <th className="text-right py-3 px-4 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((account) => (
                    <tr
                      key={account.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{account.code}</td>
                      <td className="py-3 px-4 font-medium">{account.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{account.type === 1 ? 'Ativo' : 'Receita'}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-green-600">
                        {formatCurrency(account.balance || 0)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={(account.isActive ?? true) ? 'success' : 'secondary'}>
                          {(account.isActive ?? true) ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEdit(account)}
                            title="Editar"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(account.id, account.name)}
                            disabled={deletingId === account.id}
                            title="Excluir"
                          >
                            {deletingId === account.id ? (
                              <Spinner size="sm" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PASSIVOS */}
      {liabilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-red-600">💳</span>
              Passivos ({liabilities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Código</th>
                    <th className="text-left py-3 px-4 font-semibold">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold">Tipo</th>
                    <th className="text-right py-3 px-4 font-semibold">Saldo</th>
                    <th className="text-center py-3 px-4 font-semibold">Status</th>
                    <th className="text-right py-3 px-4 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {liabilities.map((account) => (
                    <tr
                      key={account.id}
                      className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{account.code}</td>
                      <td className="py-3 px-4 font-medium">{account.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{account.type === 2 ? 'Passivo' : 'Despesa'}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-red-600">
                        {formatCurrency(Math.abs(account.balance || 0))}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={(account.isActive ?? true) ? 'success' : 'secondary'}>
                          {(account.isActive ?? true) ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onEdit(account)}
                            title="Editar"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(account.id, account.name)}
                            disabled={deletingId === account.id}
                            title="Excluir"
                          >
                            {deletingId === account.id ? (
                              <Spinner size="sm" />
                            ) : (
                              <Trash2 className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
