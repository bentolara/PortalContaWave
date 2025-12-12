# ============================================
# API INTEGRATION - README
# ============================================

# 🔗 Integração Backend-Frontend - ContaWave

## ✅ O Que Foi Implementado

### 1. **Serviços API** (`services/api/`)
- ✅ **client.ts**: Cliente HTTP base com tratamento de erros
- ✅ **accounts.service.ts**: CRUD completo de contas
- ✅ **expenses.service.ts**: CRUD de despesas + histórico
- ✅ **revenues.service.ts**: CRUD de receitas
- ✅ **categories.service.ts**: CRUD de categorias
- ✅ **reports.service.ts**: Relatórios + exportação PDF

### 2. **Hooks Customizados** (`modules/*/hooks/`)
- ✅ **useAccounts**: getAll, getById, create, update, delete, getBalance
- ✅ **useExpenses**: getAll, create, updateValue, delete, togglePaid, getHistory
- ✅ **useRevenues**: getAll, create, update, delete, toggleReceived
- ✅ **useCategories**: getAll, create, update, delete (por tipo)
- ✅ **useReports**: getMonthlyReport, getCashFlow, getBalanceSheet, getIncomeStatement, exportPdf

### 3. **Componentes Integrados**
- ✅ **AccountsList**: Consome `useAccounts()` - exibe contas reais da API
- ✅ **AccountsSummary**: Calcula totais de ativos/passivos dinamicamente
- ✅ **ExpensesList**: Consome `useExpenses()` com filtros
- ✅ **RevenuesList**: Consome `useRevenues()` com filtros
- ✅ **DashboardKPIs** (novo): Consome `useMonthlyReport()` para KPIs reais

### 4. **Testes Criados**
- ✅ **api-client.test.ts**: Testes do cliente HTTP (GET, POST, PUT, DELETE, PATCH, erros)
- ✅ **accounts.service.test.ts**: Testes do serviço de contas
- ✅ **useExpenses.test.ts**: Testes dos hooks de despesas
- ✅ **api-integration.spec.ts**: Testes E2E com Playwright (mock de API)

### 5. **Documentação**
- ✅ **API_INTEGRATION_GUIDE.md**: Guia completo de uso com exemplos
- ✅ **.env.example**: Atualizado com `NEXT_PUBLIC_API_URL`

---

## 🚀 Como Usar

### **1. Configurar Variável de Ambiente**

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local` e configure a URL do backend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### **2. Exemplo Prático: Listar Contas**

```tsx
'use client';

import { useAccounts } from '@/modules/accounts/hooks/useAccounts';

export default function AccountsPage() {
  const { accounts, loading, error } = useAccounts();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h1>Minhas Contas</h1>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.name}: R$ {account.balance.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **3. Exemplo: Criar Despesa**

```tsx
'use client';

import { useCreateExpense } from '@/modules/expenses/hooks/useExpenses';
import { useState } from 'react';

export default function CreateExpenseForm() {
  const { createExpense, loading, error } = useCreateExpense();
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expense = await createExpense({
      description,
      value: parseFloat(value),
      categoryId: '1', // ID de categoria existente
      accountId: '1', // ID de conta existente
      date: new Date().toISOString().split('T')[0],
    });

    if (expense) {
      alert('Despesa criada com sucesso!');
      setDescription('');
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
        required
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Valor"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Criar Despesa'}
      </button>
      {error && <p>Erro: {error.message}</p>}
    </form>
  );
}
```

---

### **4. Exemplo: Relatório Mensal**

```tsx
'use client';

import { useMonthlyReport } from '@/modules/reports/hooks/useReports';

export default function MonthlyReportPage() {
  const { report, loading, error } = useMonthlyReport(2025, 12);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  if (!report) return null;

  return (
    <div>
      <h1>Relatório de {report.period}</h1>
      <p>Receitas: R$ {report.totalRevenues.toFixed(2)}</p>
      <p>Despesas: R$ {report.totalExpenses.toFixed(2)}</p>
      <p>Saldo: R$ {report.netIncome.toFixed(2)}</p>

      <h2>Despesas por Categoria</h2>
      <ul>
        {report.expensesByCategory.map((cat) => (
          <li key={cat.categoryId}>
            {cat.categoryName}: R$ {cat.total.toFixed(2)} ({cat.percentage}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🧪 Rodar Testes

```bash
# Testes unitários (Vitest)
npm test

# Testes E2E (Playwright)
npm run test:e2e

# Com interface gráfica
npm run test:e2e:ui
```

---

## 📡 Endpoints Backend Suportados

### **Accounts** `/accounts`
- `GET /accounts` - Listar todas
- `GET /accounts/{id}` - Buscar por ID
- `POST /accounts` - Criar
- `PUT /accounts/{id}` - Atualizar
- `DELETE /accounts/{id}` - Deletar
- `GET /accounts/balance/{id}` - Obter saldo

### **Expenses** `/expenses`
- `GET /expenses` - Listar (com filtros: startDate, endDate, categoryId, isPaid)
- `GET /expenses/{id}` - Buscar por ID
- `POST /expenses` - Criar
- `PUT /expenses/{id}/value` - Atualizar valor
- `DELETE /expenses/{id}` - Deletar
- `PATCH /expenses/{id}/paid` - Marcar como pago
- `GET /expenses/history/{year}` - Histórico anual

### **Revenues** `/revenues`
- `GET /revenues` - Listar (com filtros)
- `GET /revenues/{id}` - Buscar por ID
- `POST /revenues` - Criar
- `PUT /revenues/{id}` - Atualizar
- `DELETE /revenues/{id}` - Deletar
- `PATCH /revenues/{id}/received` - Marcar como recebida

### **Categories** `/categories`
- `GET /categories` - Listar (filtro opcional: ?type=expense|revenue)
- `GET /categories/{id}` - Buscar por ID
- `POST /categories` - Criar
- `PUT /categories/{id}` - Atualizar
- `DELETE /categories/{id}` - Deletar

### **Reports** `/reports`
- `GET /reports/monthly/{year}/{month}` - Relatório mensal
- `GET /reports/cashflow?startDate&endDate&groupBy` - Fluxo de caixa
- `GET /reports/balance-sheet?date` - Balanço patrimonial
- `GET /reports/income-statement?startDate&endDate` - DRE
- `GET /reports/export/pdf/{type}?params` - Exportar PDF

---

## 🔐 Autenticação (Próximo Passo)

Para adicionar autenticação JWT, edite `services/api/client.ts`:

```ts
// Adicionar token no header
async get<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('authToken'); // ou usar hook useAuth()

  const response = await fetch(`${this.baseURL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    cache: 'no-store',
  });

  return this.handleResponse<T>(response);
}
```

---

## 📊 Status da Integração

| Feature | Serviço API | Hooks | Componente | Testes |
|---------|-------------|-------|------------|--------|
| Contas | ✅ | ✅ | ✅ | ✅ |
| Despesas | ✅ | ✅ | ✅ | ✅ |
| Receitas | ✅ | ✅ | ✅ | ⏳ |
| Categorias | ✅ | ✅ | ⏳ | ⏳ |
| Relatórios | ✅ | ✅ | ⚠️ | ✅ |
| Dashboard | - | - | ⚠️ | ⏳ |

**Legenda:**
- ✅ Completo
- ⚠️ Parcial (mock + API)
- ⏳ Pendente

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
- Verifique se o backend está rodando (`http://localhost:5000`)
- Confirme que `NEXT_PUBLIC_API_URL` está configurado corretamente
- Verifique CORS no backend (.NET): `AllowAnyOrigin()` ou configurar domínio específico

### Erro: 404 Not Found
- Confirme que os endpoints no backend correspondem aos da documentação
- Use ferramentas como Postman/Insomnia para testar endpoints diretamente

### Erro: 401 Unauthorized
- Implementar autenticação JWT (ver seção acima)
- Adicionar token no `localStorage` ou `cookies`

---

## 📚 Próximas Etapas

1. ✅ **Serviços e hooks implementados**
2. ✅ **Componentes integrados com API**
3. ✅ **Testes unitários e E2E criados**
4. ⏳ **Adicionar autenticação JWT**
5. ⏳ **Implementar cache com React Query/SWR**
6. ⏳ **Adicionar optimistic updates**
7. ⏳ **Implementar retry logic para requisições falhadas**
8. ⏳ **Substituir todos os mocks por dados reais**

---

## 📞 Contato

Desenvolvido seguindo as guidelines do **Cloud Sonet** e boas práticas de Clean Architecture.

**Arquitetura:**
- ✅ Serviços desacoplados em `/services/api/`
- ✅ Hooks isolados por feature em `/modules/*/hooks/`
- ✅ Componentes pequenos e reutilizáveis
- ✅ Tipagem forte com TypeScript
- ✅ Tratamento de erros centralizado
- ✅ Testes automatizados (unit + E2E)
