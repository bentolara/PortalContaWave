// ============================================
// EXAMPLE COMPONENT - COMPLETE INTEGRATION
// ============================================

'use client';

import { useState } from 'react';
import { useExpenses, useCreateExpense, useToggleExpensePaid, useDeleteExpense } from '@/modules/expenses/hooks/useExpenses';
import { useCategories } from '@/modules/categories/hooks/useCategories';
import { useAccounts } from '@/modules/accounts/hooks/useAccounts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { Spinner } from '@/components/atoms/Spinner';
import { Badge } from '@/components/atoms/Badge';
import { formatCurrency } from '@/utils/formatters';
import { Trash2, Check, X } from 'lucide-react';

/**
 * Exemplo completo de integração com API
 * 
 * Este componente demonstra:
 * - Listagem de dados com filtros
 * - Criação de novos registros
 * - Atualização de status (toggle paid)
 * - Exclusão de registros
 * - Tratamento de erros
 * - Estados de loading
 * - Integração com múltiplos hooks
 */
export default function ExpensesManagementExample() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    value: '',
    categoryId: '',
    accountId: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Hooks de listagem
  const { expenses, loading: loadingExpenses, error: errorExpenses, refetch } = useExpenses();
  const { categories, loading: loadingCategories } = useCategories('expense');
  const { accounts, loading: loadingAccounts } = useAccounts();

  // Hooks de ações
  const { createExpense, loading: creating } = useCreateExpense();
  const { togglePaid, loading: toggling } = useToggleExpensePaid();
  const { deleteExpense, loading: deleting } = useDeleteExpense();

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createExpense({
      description: formData.description,
      value: parseFloat(formData.value),
      categoryId: formData.categoryId,
      accountId: formData.accountId,
      date: formData.date,
    });

    if (result) {
      setFormData({
        description: '',
        value: '',
        categoryId: '',
        accountId: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      refetch(); // Recarregar lista
    }
  };

  const handleTogglePaid = async (id: string) => {
    const result = await togglePaid(id);
    if (result) {
      refetch(); // Recarregar lista
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
      const result = await deleteExpense(id);
      if (result) {
        refetch(); // Recarregar lista
      }
    }
  };

  // Loading state
  if (loadingExpenses || loadingCategories || loadingAccounts) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Error state
  if (errorExpenses) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Erro ao Carregar Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{errorExpenses.message}</p>
            <Button onClick={() => refetch()} className="mt-4">
              Tentar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gerenciar Despesas</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nova Despesa'}
        </Button>
      </div>

      {/* Formulário de Criação */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Despesa</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="value">Valor</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="categoryId">Categoria</Label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Selecione...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="accountId">Conta</Label>
                <select
                  id="accountId"
                  value={formData.accountId}
                  onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Selecione...</option>
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" disabled={creating}>
                {creating ? 'Salvando...' : 'Salvar Despesa'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Despesas */}
      <div className="space-y-4">
        {expenses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              Nenhuma despesa cadastrada.
            </CardContent>
          </Card>
        ) : (
          expenses.map((expense) => (
            <Card key={expense.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{expense.description}</h3>
                    <Badge variant={expense.isPaid ? 'success' : 'warning'}>
                      {expense.isPaid ? 'Pago' : 'Pendente'}
                    </Badge>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(expense.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-red-600">
                    {formatCurrency(expense.value)}
                  </span>

                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant={expense.isPaid ? 'outline' : 'default'}
                      onClick={() => handleTogglePaid(expense.id)}
                      disabled={toggling}
                    >
                      {expense.isPaid ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(expense.id)}
                      disabled={deleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Estatísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total de Despesas</p>
            <p className="text-2xl font-bold">{expenses.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Pago</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(
                expenses.filter((e) => e.isPaid).reduce((sum, e) => sum + e.value, 0)
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Pendente</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(
                expenses.filter((e) => !e.isPaid).reduce((sum, e) => sum + e.value, 0)
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
