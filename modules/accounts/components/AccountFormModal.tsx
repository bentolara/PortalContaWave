// ============================================
// ACCOUNT FORM MODAL - CREATE/EDIT
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import type { Account } from '@/types';

interface AccountFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AccountFormData) => Promise<void>;
  account?: Account | null;
  loading?: boolean;
}

export interface AccountFormData {
  code: string;
  name: string;
  type: number; // 1=Ativo, 2=Passivo, 3=Receita, 4=Despesa
  parentAccountId?: string;
}

const ACCOUNT_TYPES = [
  { value: 1, label: 'Ativo' },
  { value: 2, label: 'Passivo' },
  { value: 3, label: 'Receita' },
  { value: 4, label: 'Despesa' },
];

export function AccountFormModal({
  isOpen,
  onClose,
  onSave,
  account,
  loading = false,
}: AccountFormModalProps) {
  const [formData, setFormData] = useState<AccountFormData>({
    code: '',
    name: '',
    type: 1,
    parentAccountId: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AccountFormData, string>>>({});

  // Preencher formulário ao editar
  useEffect(() => {
    if (account) {
      setFormData({
        code: account.code,
        name: account.name,
        type: account.type,
        parentAccountId: account.parentAccountId,
      });
    } else {
      setFormData({
        code: '',
        name: '',
        type: 1,
        parentAccountId: undefined,
      });
    }
    setErrors({});
  }, [account, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AccountFormData, string>> = {};

    if (!formData.code.trim()) {
      newErrors.code = 'Código é obrigatório';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.type) {
      newErrors.type = 'Tipo de conta é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar conta:', error);
    }
  };

  const handleChange = (field: keyof AccountFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpar erro do campo ao editar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {account ? 'Editar Conta' : 'Nova Conta'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            disabled={loading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Código da Conta */}
          <div>
            <Label htmlFor="code" required>
              Código
            </Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => handleChange('code', e.target.value)}
              placeholder="Ex: 1.1.01"
              error={errors.code}
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Código contábil da conta
            </p>
          </div>

          {/* Nome da Conta */}
          <div>
            <Label htmlFor="name" required>
              Nome da Conta
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: conta - conta Nubank"
              error={errors.name}
              disabled={loading}
            />
          </div>

          {/* Tipo (1=Ativo, 2=Passivo, 3=Receita, 4=Despesa) */}
          <div>
            <Label htmlFor="type" required>
              Tipo de Conta
            </Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => handleChange('type', parseInt(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={loading}
            >
              {ACCOUNT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              1=Ativo, 2=Passivo, 3=Receita, 4=Despesa
            </p>
          </div>

          {/* Conta Pai (Opcional) */}
          <div>
            <Label htmlFor="parentAccountId">
              Conta Pai (Opcional)
            </Label>
            <Input
              id="parentAccountId"
              value={formData.parentAccountId || ''}
              onChange={(e) => handleChange('parentAccountId', e.target.value || undefined)}
              placeholder="Ex: 3fa85f64-5717-4562-b3fc-2c963f66afa6"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              GUID da conta pai (para contas hierárquicas)
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Salvando...' : account ? 'Atualizar' : 'Criar Conta'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
