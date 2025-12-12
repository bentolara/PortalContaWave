// ============================================
// ACCOUNTS MODULE - PAGE (FULL CRUD)
// ============================================

'use client';

import { useState } from 'react';
import { AccountsTable } from '@/modules/accounts/components/AccountsTable';
import { AccountsSummary } from '@/modules/accounts/components/AccountsSummary';
import { AccountFormModal, AccountFormData } from '@/modules/accounts/components/AccountFormModal';
import { Button } from '@/components/atoms/Button';
import { Plus } from 'lucide-react';
import { useCreateAccount, useUpdateAccount, useAccounts } from '@/modules/accounts/hooks/useAccounts';
import type { Account } from '@/types';

export default function AccountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const { refetch } = useAccounts();
  const { createAccount, loading: creating } = useCreateAccount();
  const { updateAccount, loading: updating } = useUpdateAccount();

  const handleOpenModal = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSave = async (data: AccountFormData) => {
    try {
      if (editingAccount) {
        // Atualizar conta existente
        await updateAccount(editingAccount.id, data);
      } else {
        // Criar nova conta
        await createAccount(data);
      }
      
      // Recarregar lista
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar conta:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Plano de Contas</h1>
          <p className="text-muted-foreground">Ativos, Passivos e Patrimônio Líquido</p>
        </div>
        <Button onClick={handleOpenModal}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      {/* Summary KPIs */}
      <AccountsSummary />

      {/* Accounts Table */}
      <AccountsTable onEdit={handleEdit} />

      {/* Modal Create/Edit */}
      <AccountFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        account={editingAccount}
        loading={creating || updating}
      />
    </div>
  );
}
