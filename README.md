# ContaWave Frontend

Dashboard financeiro moderno construído com Next.js 14+, seguindo Clean Architecture e Atomic Design.

## 🚀 Tecnologias

- **Next.js 14+** - App Router, React Server Components
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização utility-first
- **Zustand** - Gerenciamento de estado global
- **Axios** - Cliente HTTP
- **Recharts** - Visualização de dados
- **Lucide React** - Ícones modernos
- **Vitest** - Testes unitários
- **Playwright** - Testes E2E

## 📁 Estrutura do Projeto

```
/
├── app/                    # Rotas Next.js (App Router)
│   ├── (dashboard)/       # Grupo de rotas com layout
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página inicial
├── modules/               # Features por domínio
│   ├── dashboard/
│   ├── expenses/
│   ├── revenues/
│   ├── accounts/
│   └── reports/
├── components/            # Componentes reutilizáveis
│   ├── atoms/            # Componentes básicos
│   ├── molecules/        # Componentes compostos
│   └── organisms/        # Componentes complexos
├── services/             # Camada de API
│   ├── api-client.ts
│   ├── transaction.service.ts
│   ├── category.service.ts
│   └── account.service.ts
├── store/                # Estado global (Zustand)
│   └── index.ts
├── utils/                # Utilitários
│   ├── cn.ts
│   ├── formatters.ts
│   ├── dates.ts
│   └── validations.ts
├── types/                # Tipagens TypeScript
│   └── index.ts
├── __tests__/            # Testes unitários
└── e2e/                  # Testes end-to-end
```

## 🎨 Arquitetura

### Clean Architecture

O projeto segue os princípios de Clean Architecture com separação clara de responsabilidades:

- **Presentation Layer**: Components (Atoms, Molecules, Organisms)
- **Application Layer**: Modules (Features isoladas)
- **Domain Layer**: Types (Entities e interfaces)
- **Infrastructure Layer**: Services (API clients)

### Atomic Design

Componentização baseada em Atomic Design:

- **Atoms**: Button, Input, Card, Label, Badge, Spinner
- **Molecules**: FormField, KPICard, TransactionItem
- **Organisms**: Sidebar, Header, TransactionList

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📦 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento (porta 3000)
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Executar ESLint
npm run test         # Testes unitários
npm run test:e2e     # Testes end-to-end
```

## 🧪 Testes

### Testes Unitários (Vitest)

```bash
npm run test
```

### Testes E2E (Playwright)

```bash
npm run test:e2e
```

## 🎯 Funcionalidades

### Dashboard
- KPIs principais (despesas, receitas, saldo, patrimônio)
- Gráfico de despesas por categoria (pizza)
- Gráfico de fluxo de caixa (linha)
- Lista de transações recentes

### Despesas
- Listagem de despesas
- Filtros e busca
- Cadastro/edição
- Status pago/pendente
- Despesas recorrentes

### Receitas
- Listagem de receitas
- Filtros e busca
- Cadastro/edição
- Receitas fixas/variáveis

### Plano de Contas
- Visualização de ativos e passivos
- Cálculo de patrimônio líquido
- Gestão de contas bancárias

### Relatórios
- DRE Pessoal
- Fluxo de Caixa
- Balanço Patrimonial
- Exportação para PDF

## 🎨 Design System

### Cores

O tema suporta modo claro e escuro com variáveis CSS:

- Primary, Secondary, Accent
- Muted, Destructive
- Background, Foreground, Border

### Componentes

Todos os componentes seguem as convenções do Radix UI e são totalmente acessíveis.

## 🔄 Estado Global

Utiliza Zustand para gerenciar:

- Tema (dark/light mode)
- Estado do sidebar (collapsed/expanded)
- Filtros de busca

## 📡 API Integration

Os services em `/services` comunicam-se com o backend via Axios:

```typescript
import { transactionService } from '@/services/transaction.service';

const transactions = await transactionService.getAll({
  type: 'expense',
  startDate: '2025-12-01',
  endDate: '2025-12-31',
});
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm run build
# Deploy via Vercel CLI ou conecte o repositório GitHub
```

### Docker

```dockerfile
# Dockerfile incluído no projeto
docker build -t contawave-frontend .
docker run -p 3000:3000 contawave-frontend
```

## 📈 Métricas de Qualidade

- **Performance**: Lighthouse score 90+
- **Cobertura de Testes**: 70%+
- **Type Safety**: 100% TypeScript
- **Acessibilidade**: WCAG 2.1 Level AA

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

ContaWave Team - Dashboard Financeiro Pessoal

---

**Versão**: 1.0.0  
**Status**: Em Desenvolvimento 🚧
