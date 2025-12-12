# 📐 Arquitetura Frontend - ContaWave

## 🎯 Visão Geral

Sistema desenvolvido seguindo **Clean Architecture** e **Atomic Design**, garantindo:
- ✅ Separação de responsabilidades
- ✅ Testabilidade 
- ✅ Manutenibilidade
- ✅ Escalabilidade

## 🏗️ Camadas da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│                  (Components + Pages)                        │
├─────────────────────────────────────────────────────────────┤
│                     APPLICATION LAYER                        │
│                    (Modules + Store)                         │
├─────────────────────────────────────────────────────────────┤
│                       DOMAIN LAYER                           │
│                    (Types + Interfaces)                      │
├─────────────────────────────────────────────────────────────┤
│                   INFRASTRUCTURE LAYER                       │
│                    (Services + API)                          │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Estrutura de Diretórios

### `/app` - Rotas (Next.js App Router)
```
app/
├── (dashboard)/          # Route group com layout compartilhado
│   ├── layout.tsx       # Layout com Sidebar + Header
│   ├── dashboard/       # Página principal
│   ├── expenses/        # Gestão de despesas
│   ├── revenues/        # Gestão de receitas
│   ├── accounts/        # Plano de contas
│   └── reports/         # Relatórios financeiros
├── globals.css          # Estilos globais + Tailwind
└── layout.tsx           # Root layout
```

### `/components` - Atomic Design

#### **Atoms** (Componentes Básicos)
- `Button` - Botões com variantes
- `Input` - Campos de entrada
- `Card` - Container para conteúdo
- `Label` - Rótulos de formulários
- `Badge` - Indicadores visuais
- `Spinner` - Loading states

#### **Molecules** (Componentes Compostos)
- `FormField` - Label + Input + Error
- `KPICard` - Card com métricas
- `TransactionItem` - Item de lista

#### **Organisms** (Componentes Complexos)
- `Sidebar` - Navegação lateral
- `Header` - Cabeçalho com tema/user
- `TransactionList` - Lista completa

### `/modules` - Features Isoladas

Cada módulo contém seus próprios componentes:

```
modules/
├── dashboard/
│   └── components/
│       ├── DashboardKPIs.tsx
│       ├── ExpensesChart.tsx
│       ├── CashFlowChart.tsx
│       └── RecentTransactions.tsx
├── expenses/
│   └── components/
│       ├── ExpensesList.tsx
│       └── ExpensesFilter.tsx
├── revenues/
├── accounts/
└── reports/
```

### `/services` - Camada de API

```typescript
services/
├── api-client.ts           # Axios config + interceptors
├── transaction.service.ts  # CRUD transações
├── category.service.ts     # CRUD categorias
├── account.service.ts      # CRUD contas
├── dashboard.service.ts    # KPIs e gráficos
└── report.service.ts       # Relatórios
```

**Pattern usado:**
```typescript
export const transactionService = {
  getAll: (params) => apiClient.get('/transactions', { params }),
  getById: (id) => apiClient.get(`/transactions/${id}`),
  create: (data) => apiClient.post('/transactions', data),
  update: (id, data) => apiClient.put(`/transactions/${id}`, data),
  delete: (id) => apiClient.delete(`/transactions/${id}`),
};
```

### `/store` - Estado Global (Zustand)

```typescript
store/
└── index.ts
    ├── useThemeStore      # Dark/Light mode
    ├── useSidebarStore    # Collapsed/Expanded
    └── useFilterStore     # Filtros de busca
```

### `/types` - Tipagens TypeScript

```typescript
types/
└── index.ts
    ├── Transaction        # Entidade principal
    ├── Category          # Categorias
    ├── Account           # Contas (ativos/passivos)
    ├── Budget            # Orçamentos
    ├── ApiResponse<T>    # Wrapper de responses
    └── FormData types    # DTOs de formulários
```

### `/utils` - Funções Auxiliares

```typescript
utils/
├── cn.ts               # Class name merge (Tailwind)
├── formatters.ts       # Currency, date, percentage
├── dates.ts            # Date manipulation
└── validations.ts      # Form validations
```

## 🎨 Design System

### Variáveis CSS (Modo Claro/Escuro)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

### Componentes com Variants (CVA)
```typescript
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: { default, destructive, outline, ... },
      size: { default, sm, lg, icon },
    },
  }
);
```

## 🔄 Fluxo de Dados

### 1. Leitura (Server → Client)
```
API Backend
    ↓
Service Layer (axios)
    ↓
Component/Module
    ↓
Presentation (UI)
```

### 2. Escrita (Client → Server)
```
User Action
    ↓
Component Handler
    ↓
Service Layer
    ↓
API Backend
    ↓
Update UI State
```

### 3. Estado Global
```
User Action
    ↓
Zustand Store Action
    ↓
Store State Update
    ↓
Components Re-render
```

## 🧪 Estratégia de Testes

### Unit Tests (Vitest)
- **Atoms/Molecules**: Rendering, props, events
- **Utils**: Formatters, validators
- **Coverage**: 70%+

### E2E Tests (Playwright)
- **Critical Flows**: 
  - Login/Logout
  - Criar despesa
  - Gerar relatório
  - Navegação entre páginas

## 🚀 Performance

### Otimizações Implementadas
1. **Code Splitting**: Route-based
2. **React Server Components**: Renderização no servidor
3. **Image Optimization**: Next.js Image component
4. **Font Optimization**: next/font
5. **Bundle Analysis**: next-bundle-analyzer

### Métricas Alvo
- **FCP**: < 1.8s
- **LCP**: < 2.5s
- **TTI**: < 3.8s
- **Lighthouse**: 90+

## 📋 Checklist de Qualidade

### Antes de Deploy
- [ ] Todos os testes passando
- [ ] ESLint sem warnings
- [ ] TypeScript sem erros
- [ ] Build sem erros
- [ ] Lighthouse score 90+
- [ ] Responsividade testada
- [ ] Dark mode funcionando
- [ ] Acessibilidade verificada

### Code Review
- [ ] Clean Architecture respeitada
- [ ] Componentes < 50 linhas
- [ ] Tipagem completa
- [ ] Sem code smells
- [ ] Padrões seguidos
- [ ] Documentação atualizada

## 🔐 Segurança

### Implementado
- ✅ Tokens JWT em localStorage
- ✅ Interceptors para autorização
- ✅ Redirect em 401
- ✅ Validação client-side
- ✅ HTTPS only (produção)

### A Implementar
- [ ] Rate limiting client-side
- [ ] CSRF tokens
- [ ] Input sanitization
- [ ] Content Security Policy

## 📚 Documentação Adicional

- [DEVELOPMENT.md](./DEVELOPMENT.md) - Guia de desenvolvimento
- [README.md](./README.md) - Setup e instalação
- [Tailwind Config](./tailwind.config.ts) - Design tokens
- [TypeScript Config](./tsconfig.json) - Configurações TS

## 🎓 Referências

- [Next.js App Router](https://nextjs.org/docs/app)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Zustand](https://docs.pmnd.rs/zustand)
- [TailwindCSS](https://tailwindcss.com/docs)

---

**Última atualização**: Dezembro 2025  
**Versão**: 1.0.0
