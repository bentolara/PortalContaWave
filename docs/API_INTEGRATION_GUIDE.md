// ============================================
// API INTEGRATION - GUIA DE USO
// ============================================

# Guia de Integração Backend (.NET 8) ↔ Frontend (Next.js)

## 📁 Estrutura de Arquivos Criados

```
services/api/
├── client.ts                  # Cliente HTTP base (fetch + error handling)
├── accounts.service.ts        # CRUD de contas
├── expenses.service.ts        # CRUD de despesas
├── revenues.service.ts        # CRUD de receitas
├── categories.service.ts      # CRUD de categorias
├── reports.service.ts         # Relatórios e dashboards
└── index.ts                   # Export centralizado

modules/
├── accounts/hooks/
│   └── useAccounts.ts        # Hooks para contas
├── expenses/hooks/
│   └── useExpenses.ts        # Hooks para despesas
├── revenues/hooks/
│   └── useRevenues.ts        # Hooks para receitas
├── reports/hooks/
│   └── useReports.ts         # Hooks para relatórios
└── categories/hooks/
    └── useCategories.ts      # Hooks para categorias
```

---

## 🔧 Configuração

### 1. Variável de Ambiente

Crie/atualize o arquivo `.env.local` na raiz do projeto:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Importante:** Sem trailing slash no final da URL.

---

## 📚 Exemplos de Uso

### **1. Accounts (Contas)**

#### Listar todas as contas

```tsx
'use client';

import { useAccounts } from '@/modules/accounts/hooks/useAccounts';

export function MyComponent() {
  const { accounts, loading, error } = useAccounts();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <ul>
      {accounts.map(account => (
        <li key={account.id}>{account.name}: {account.balance}</li>
      ))}
    </ul>
  );
}
```

#### Criar uma nova conta

```tsx
'use client';

import { useCreateAccount } from '@/modules/accounts/hooks/useAccounts';

export function CreateAccountForm() {
  const { createAccount, loading, error } = useCreateAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await createAccount({
      name: 'Conta Corrente',
      type: 'asset',
      subtype: 'Corrente',
      balance: 1000,
      currency: 'BRL',
    });

    if (result) {
      alert('Conta criada com sucesso!');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

### **2. Expenses (Despesas)**

#### Listar despesas com filtros

```tsx
'use client';

import { useExpenses } from '@/modules/expenses/hooks/useExpenses';

export function ExpensesList() {
  const { expenses, loading, error } = useExpenses({
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    isPaid: false,
  });

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <ul>
      {expenses.map(expense => (
        <li key={expense.id}>{expense.description}: R$ {expense.value}</li>
      ))}
    </ul>
  );
}
```

#### Marcar despesa como paga

```tsx
'use client';

import { useToggleExpensePaid } from '@/modules/expenses/hooks/useExpenses';

export function ExpenseItem({ id }: { id: string }) {
  const { togglePaid, loading } = useToggleExpensePaid();

  const handleToggle = async () => {
    await togglePaid(id);
  };

  return <button onClick={handleToggle} disabled={loading}>Marcar como paga</button>;
}
```

---

### **3. Revenues (Receitas)**

#### Criar receita

```tsx
'use client';

import { useCreateRevenue } from '@/modules/revenues/hooks/useRevenues';

export function CreateRevenueForm() {
  const { createRevenue, loading, error } = useCreateRevenue();

  const handleSubmit = async (data: any) => {
    const result = await createRevenue({
      description: 'Salário',
      value: 5000,
      categoryId: '1',
      accountId: '1',
      date: '2025-12-05',
      isReceived: true,
    });

    if (result) {
      console.log('Receita criada:', result);
    }
  };

  return <form>...</form>;
}
```

---

### **4. Reports (Relatórios)**

#### Relatório mensal

```tsx
'use client';

import { useMonthlyReport } from '@/modules/reports/hooks/useReports';

export function MonthlyDashboard() {
  const { report, loading, error } = useMonthlyReport(2025, 12);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h2>Relatório de {report.period}</h2>
      <p>Receitas: R$ {report.totalRevenues}</p>
      <p>Despesas: R$ {report.totalExpenses}</p>
      <p>Saldo: R$ {report.netIncome}</p>
    </div>
  );
}
```

#### Fluxo de caixa

```tsx
'use client';

import { useCashFlow } from '@/modules/reports/hooks/useReports';

export function CashFlowChart() {
  const { cashFlow, loading, error } = useCashFlow({
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    groupBy: 'month',
  });

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {cashFlow.map(item => (
        <div key={item.date}>
          {item.date}: R$ {item.balance}
        </div>
      ))}
    </div>
  );
}
```

#### Exportar relatório em PDF

```tsx
'use client';

import { useExportPdf } from '@/modules/reports/hooks/useReports';

export function ExportButton() {
  const { exportPdf, loading } = useExportPdf();

  const handleExport = async () => {
    await exportPdf('monthly', {
      year: '2025',
      month: '12',
    });
  };

  return (
    <button onClick={handleExport} disabled={loading}>
      {loading ? 'Exportando...' : 'Exportar PDF'}
    </button>
  );
}
```

---

### **5. Categories (Categorias)**

#### Listar categorias por tipo

```tsx
'use client';

import { useCategories } from '@/modules/categories/hooks/useCategories';

export function CategorySelect() {
  const { categories, loading, error } = useCategories('expense');

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <select>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
    </select>
  );
}
```

---

## 🔐 Autenticação (Futuro)

Para adicionar autenticação JWT, edite `services/api/client.ts`:

```ts
async get<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('token'); // ou useAuth hook

  const response = await fetch(`${this.baseURL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    cache: 'no-store',
  });

  return this.handleResponse<T>(response);
}
```

---

## ⚠️ Tratamento de Erros

Todos os hooks retornam um objeto `error` do tipo `ApiError`:

```ts
interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}
```

Exemplo de uso:

```tsx
const { expenses, error } = useExpenses();

if (error) {
  console.error('Status:', error.statusCode);
  console.error('Mensagem:', error.message);
  console.error('Validações:', error.errors);
}
```

---

## 🚀 Próximos Passos

1. **Configurar variável de ambiente** (`NEXT_PUBLIC_API_URL`)
2. **Testar endpoints** com o backend rodando
3. **Adicionar autenticação** (JWT tokens)
4. **Implementar cache** (React Query ou SWR)
5. **Adicionar optimistic updates** para melhor UX
6. **Implementar retry logic** para requisições falhadas

---

## 📝 Notas Importantes

- Todos os serviços usam `fetch` nativo do Next.js
- `cache: 'no-store'` desabilita cache do Next.js
- Para cache inteligente, considere React Query ou SWR
- Os hooks são client-side only (`'use client'`)
- Para Server Components, use os serviços diretamente

---

## 🔄 Substituindo Componentes com Mock Data

Já foram atualizados:
- ✅ `AccountsList` → integrado com `useAccounts()`
- ✅ `AccountsSummary` → integrado com `useAccounts()`
- ✅ `ExpensesList` → integrado com `useExpenses()`
- ✅ `RevenuesList` → integrado com `useRevenues()`

Pendentes:
- ⏳ `DashboardKPIs` → usar `useMonthlyReport()`
- ⏳ `ExpensesChart` → usar `report.expensesByCategory`
- ⏳ `CashFlowChart` → usar `useCashFlow()`
- ⏳ `RecentTransactions` → usar `useExpenses()` ou `useRevenues()`

---

## 📖 Referências

- [Next.js Fetch API](https://nextjs.org/docs/app/api-reference/functions/fetch)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
