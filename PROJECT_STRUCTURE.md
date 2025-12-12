# 📁 Estrutura Completa do Projeto ContaWave Frontend

```
ContaWave-Frontend/
│
├── 📄 Arquivos de Configuração
│   ├── package.json                 # Dependências e scripts
│   ├── package-lock.json           # Lock de dependências
│   ├── tsconfig.json               # Configuração TypeScript
│   ├── next.config.ts              # Configuração Next.js
│   ├── tailwind.config.ts          # Configuração TailwindCSS
│   ├── postcss.config.mjs          # Configuração PostCSS
│   ├── vitest.config.ts            # Configuração Vitest
│   ├── vitest.setup.ts             # Setup de testes
│   ├── playwright.config.ts        # Configuração Playwright
│   ├── .eslintrc.json              # Configuração ESLint
│   ├── .gitignore                  # Git ignore
│   ├── .npmignore                  # NPM ignore
│   ├── .editorconfig               # Editor config
│   ├── .env.example                # Exemplo de variáveis de ambiente
│   └── Dockerfile                  # Docker configuration
│
├── 📚 Documentação
│   ├── README.md                   # Setup e instalação
│   ├── ARCHITECTURE.md             # Arquitetura detalhada
│   ├── DEVELOPMENT.md              # Guia de desenvolvimento
│   ├── USAGE.md                    # Exemplos de uso
│   └── SUMMARY.md                  # Resumo do projeto
│
├── ⚙️ .vscode/                      # Configurações VS Code
│   ├── extensions.json             # Extensões recomendadas
│   └── settings.json               # Settings do workspace
│
├── 🎨 app/                          # Next.js App Router
│   ├── globals.css                 # Estilos globais + Tailwind
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   │
│   └── (dashboard)/                # Route group
│       ├── layout.tsx              # Layout com Sidebar + Header
│       │
│       ├── dashboard/              # Dashboard principal
│       │   └── page.tsx
│       │
│       ├── expenses/               # Gestão de despesas
│       │   └── page.tsx
│       │
│       ├── revenues/               # Gestão de receitas
│       │   └── page.tsx
│       │
│       ├── accounts/               # Plano de contas
│       │   └── page.tsx
│       │
│       └── reports/                # Relatórios
│           └── page.tsx
│
├── 🧱 components/                   # Componentes reutilizáveis
│   │
│   ├── atoms/                      # Componentes básicos
│   │   ├── Badge.tsx               # Badges/tags
│   │   ├── Button.tsx              # Botões
│   │   ├── Card.tsx                # Cards
│   │   ├── Input.tsx               # Inputs
│   │   ├── Label.tsx               # Labels
│   │   ├── Spinner.tsx             # Loaders
│   │   └── index.ts                # Exports
│   │
│   ├── molecules/                  # Componentes compostos
│   │   ├── FormField.tsx           # Label + Input + Error
│   │   ├── KPICard.tsx             # Card de métricas
│   │   ├── TransactionItem.tsx     # Item de transação
│   │   └── index.ts                # Exports
│   │
│   └── organisms/                  # Componentes complexos
│       ├── Header.tsx              # Cabeçalho
│       ├── Sidebar.tsx             # Navegação lateral
│       ├── TransactionList.tsx     # Lista de transações
│       └── index.ts                # Exports
│
├── 📦 modules/                      # Features por domínio
│   │
│   ├── dashboard/                  # Módulo Dashboard
│   │   └── components/
│   │       ├── DashboardKPIs.tsx          # KPIs principais
│   │       ├── ExpensesChart.tsx          # Gráfico despesas
│   │       ├── CashFlowChart.tsx          # Gráfico fluxo
│   │       └── RecentTransactions.tsx     # Transações recentes
│   │
│   ├── expenses/                   # Módulo Despesas
│   │   └── components/
│   │       ├── ExpensesList.tsx           # Lista
│   │       └── ExpensesFilter.tsx         # Filtros
│   │
│   ├── revenues/                   # Módulo Receitas
│   │   └── components/
│   │       ├── RevenuesList.tsx           # Lista
│   │       └── RevenuesFilter.tsx         # Filtros
│   │
│   ├── accounts/                   # Módulo Contas
│   │   └── components/
│   │       ├── AccountsList.tsx           # Lista de contas
│   │       └── AccountsSummary.tsx        # Resumo
│   │
│   └── reports/                    # Módulo Relatórios
│       └── components/
│           ├── ReportSelector.tsx         # Seletor
│           └── IncomeStatementReport.tsx  # DRE
│
├── 🌐 services/                     # Camada de API
│   ├── api-client.ts               # Axios config + interceptors
│   ├── transaction.service.ts      # CRUD transações
│   ├── category.service.ts         # CRUD categorias
│   ├── account.service.ts          # CRUD contas
│   ├── dashboard.service.ts        # APIs dashboard
│   ├── report.service.ts           # APIs relatórios
│   └── index.ts                    # Exports
│
├── 💾 store/                        # Estado global (Zustand)
│   └── index.ts
│       ├── useThemeStore           # Tema dark/light
│       ├── useSidebarStore         # Sidebar collapsed
│       └── useFilterStore          # Filtros
│
├── 🛠️ utils/                        # Funções auxiliares
│   ├── cn.ts                       # ClassName merge
│   ├── formatters.ts               # Formatação (currency, date, %)
│   ├── dates.ts                    # Manipulação de datas
│   ├── validations.ts              # Validadores
│   └── index.ts                    # Exports
│
├── 📝 types/                        # Tipagens TypeScript
│   └── index.ts
│       ├── Transaction             # Transações
│       ├── Category                # Categorias
│       ├── Account                 # Contas
│       ├── Budget                  # Orçamentos
│       ├── ApiResponse<T>          # Response wrapper
│       ├── DashboardKPIs           # KPIs
│       ├── ExpensesByCategory      # Despesas por categoria
│       ├── CashFlowData            # Fluxo de caixa
│       ├── IncomeStatement         # DRE
│       ├── BalanceSheet            # Balanço
│       └── Form types              # DTOs de formulários
│
├── 🧪 __tests__/                    # Testes unitários
│   └── components/
│       └── Button.test.tsx         # Exemplo de teste
│
└── 🎭 e2e/                          # Testes end-to-end
    └── dashboard.spec.ts           # Exemplo E2E

```

## 📊 Estatísticas do Projeto

### Arquivos por Tipo
```
TypeScript/TSX:  ~50 arquivos
Config files:    ~15 arquivos
Documentation:   ~5 arquivos
Tests:          ~2 arquivos
Total:          ~72 arquivos
```

### Distribuição de Código
```
Components:     ~1.200 linhas
Modules:        ~800 linhas
Services:       ~400 linhas
Utils:          ~300 linhas
Types:          ~300 linhas
Stores:         ~150 linhas
Tests:          ~100 linhas
Config:         ~250 linhas
Total:          ~3.500 linhas
```

### Componentes
```
Atoms:          7 componentes
Molecules:      3 componentes
Organisms:      3 componentes
Module comps:   12 componentes
Total:          25 componentes
```

### Páginas/Rotas
```
Home:           1
Dashboard:      1
Expenses:       1
Revenues:       1
Accounts:       1
Reports:        1
Total:          6 páginas
```

## 🎯 Arquitetura Visual

```
┌─────────────────────────────────────────────────────────┐
│                     PRESENTATION                         │
│            (Pages, Components, UI Logic)                 │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Atoms      │  │  Molecules   │  │  Organisms   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                     APPLICATION                          │
│              (Business Logic, Modules)                   │
│                                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────────┐   │
│  │Dashboard│ │Expenses│  │Revenues│  │  Accounts  │   │
│  └────────┘  └────────┘  └────────┘  └────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                        DOMAIN                            │
│                (Entities, Interfaces)                    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Types: Transaction, Account, Category, etc.   │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE                         │
│                  (External Services)                     │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Services: API Client, HTTP Calls, etc.        │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          ▼
                    🌐 Backend API
```

## 🔄 Fluxo de Dados

```
User Interaction
       │
       ▼
    Component
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
   Local State         Global State (Zustand)
       │                     │
       │                     │
       ▼                     │
    Service                  │
       │                     │
       ▼                     │
   API Call                  │
       │                     │
       ▼                     │
   Backend                   │
       │                     │
       ▼                     │
   Response                  │
       │                     │
       └──────────┬──────────┘
                  │
                  ▼
             Update UI
```

## 🧩 Dependências Principais

### Core
```json
{
  "next": "^15.1.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5"
}
```

### Styling
```json
{
  "tailwindcss": "^3.4.1",
  "class-variance-authority": "^0.7.1",
  "tailwind-merge": "^2.6.0"
}
```

### State & Data
```json
{
  "zustand": "^5.0.2",
  "axios": "^1.7.9"
}
```

### UI Components
```json
{
  "@radix-ui/*": "^1.x.x",
  "lucide-react": "^0.468.0",
  "recharts": "^2.15.0"
}
```

### Testing
```json
{
  "vitest": "^2.1.8",
  "@playwright/test": "^1.49.1",
  "@testing-library/react": "^16.1.0"
}
```

---

**🎉 Projeto Completo e Pronto para Uso!**

Esta estrutura fornece uma base sólida, escalável e manutenível para o dashboard financeiro ContaWave.
